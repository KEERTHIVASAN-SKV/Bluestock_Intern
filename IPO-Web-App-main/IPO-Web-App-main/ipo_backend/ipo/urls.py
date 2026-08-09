from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = DefaultRouter()
router.register(r'companies', CompanyViewSet)
router.register(r'ipos', IPOViewSet)
router.register(r'documents', DocumentViewSet)
router.register(r'users', UserViewSet)
router.register(r'applications', ApplicationViewSet)


urlpatterns = [
    path('', home, name='home'),              # ✅ root URL
    path('api/v1/', include(router.urls)),       # APIs under /api/
    path('api/v1/stock/', MarketMoverData.as_view(), name='market-mover-data'),
    # path('api/v1/users/login/', LoginView.as_view(), name='login'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    path('api/v1/register/', RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

]