from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework import generics
from django.shortcuts import render
import pandas as pd
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
import requests
# from nsetools import Nse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache  # To cache and avoid hitting API rate limits
from datetime import datetime, timedelta
from nselib import capital_market



from .models import Company, IPO, Document, Application
from .serializers import (
    CompanySerializer,
    IPOSerializer,
    DocumentSerializer,
    UserSerializer,
    ApplicationSerializer,
)


#  Home Page View
def home(request):
    return render(request, 'ipo/home.html')


#  API ViewSets

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class IPOViewSet(viewsets.ModelViewSet):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['status', 'issue_type']
    search_fields = ['company__company_name']


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    filterset_fields = ['ipo']


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from datetime import datetime, timedelta


class MarketMoverData(APIView):
    def get(self, request):
        try:
            # Load bhavcopy data
            cur_date = datetime.now().date()
            day_name = cur_date.strftime("%A")
            cur_time = datetime.now().hour
            if(day_name=='Saturday'):
                trade_date = (cur_date - timedelta(days=1)).strftime("%d-%m-%Y")
            elif(day_name=='Sunday'):
                trade_date = (cur_date - timedelta(days=2)).strftime("%d-%m-%Y")
            elif(day_name=='Monday' and cur_time<15):
                trade_date = (cur_date - timedelta(days=3)).strftime("%d-%m-%Y")
            else:
                if(cur_time<15):
                    trade_date = (cur_date - timedelta(days=1)).strftime("%d-%m-%Y")
                else:
                    trade_date = cur_date.strftime("%d-%m-%Y")

            df = capital_market.bhav_copy_equities(trade_date=trade_date) #dd-mm-yyyy

            required_cols = ['TradDt', 'Sgmt', 'TckrSymb', 'FinInstrmNm', 'HghPric', 'LwPric', 'ClsPric']
            missing_cols = [col for col in required_cols if col not in df.columns]
            if missing_cols:
                return Response({"error": f"Missing columns in data: {missing_cols}"}, status=500)

            df['TradDt'] = pd.to_datetime(df['TradDt'])

            # Filter EQ segment (assuming all data is stock, adjust as needed)
            df_stocks = df
            if df_stocks.empty:
                return Response({"error": "No stocks found in 'EQ' segment."}, status=404)

            latest_date = df_stocks['TradDt'].max()
            start_date = latest_date - pd.Timedelta(weeks=52)

            # Last 52 weeks data
            df_52weeks = df_stocks[(df_stocks['TradDt'] >= start_date) & (df_stocks['TradDt'] <= latest_date)]

            # 52-week high and low
            summary = df_52weeks.groupby('TckrSymb').agg(
                fifty_two_week_high=('HghPric', 'max'),
                fifty_two_week_low=('LwPric', 'min')
            ).reset_index()

            # Get latest close, segment, and day high
            latest_closes = df_stocks[df_stocks['TradDt'] == latest_date][
                ['TckrSymb', 'FinInstrmNm', 'ClsPric', 'HghPric', 'Sgmt']
            ]

            # Merge with summary
            merged = summary.merge(latest_closes, on='TckrSymb')

            # Near 52-week high/low
            near_high = merged[merged['ClsPric'] >= merged['fifty_two_week_high'] * 0.98].copy()
            near_low = merged[merged['ClsPric'] <= merged['fifty_two_week_low'] * 1.02].copy()

            # Limit results
            near_high = near_high.sort_values(by='ClsPric', ascending=False).head(18)
            near_low = near_low.sort_values(by='ClsPric', ascending=True).head(18)

            # Format results
            def format_output(df):
                return df.rename(columns={
                    'TckrSymb': 'stock_code',
                    'FinInstrmNm': 'stock_name',
                    'ClsPric': 'last_price',
                    'HghPric': 'day_high',
                })[['stock_code', 'stock_name', 'last_price', 'day_high']].to_dict(orient='records')

            return Response({
                "highs": format_output(near_high),
                "lows": format_output(near_low)
            }, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



