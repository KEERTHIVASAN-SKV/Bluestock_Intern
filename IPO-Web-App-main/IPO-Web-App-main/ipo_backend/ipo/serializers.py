from rest_framework import serializers
from .models import Company, IPO, Document, User, Application
from django.contrib.auth.models import User

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class IPOSerializer(serializers.ModelSerializer):
    company = CompanySerializer()  

    class Meta:
        model = IPO
        fields = '__all__'

    def validate(self, attrs):
        open_date = attrs.get('open_date') or (self.instance.open_date if self.instance else None)
        close_date = attrs.get('close_date') or (self.instance.close_date if self.instance else None)
        listing_date = attrs.get('listing_date') or (self.instance.listing_date if self.instance else None)

        errors = {}
        if open_date and close_date and open_date > close_date:
            errors['close_date'] = 'Close date must be greater than or equal to Open date (open_date <= close_date).'
        if close_date and listing_date and close_date > listing_date:
            errors['listing_date'] = 'Listing date must be greater than or equal to Close date (close_date <= listing_date).'
        if open_date and listing_date and open_date > listing_date:
            errors['listing_date'] = 'Listing date must be greater than or equal to Open date (open_date <= listing_date).'

        if errors:
            raise serializers.ValidationError(errors)
        return attrs

    def create(self, validated_data):
        company_data = validated_data.pop('company', {})
        
        # Create or get company by name
        company_name = company_data.get('company_name', 'Unknown Company')
        company, created = Company.objects.get_or_create(
            company_name=company_name,
            defaults=company_data
        )
        
        # Create the IPO and associate it with the company
        ipo = IPO.objects.create(company=company, **validated_data)
        return ipo

    def update(self, instance, validated_data):
        company_data = validated_data.pop('company', None)

        if company_data:
            # Update existing company
            company = instance.company
            company.company_name = company_data.get('company_name', company.company_name)
            company.company_logo = company_data.get('company_logo', company.company_logo)
            company.save()

        # Update IPO instance with the rest of the validated data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance


class DocumentSerializer(serializers.ModelSerializer):
    ipo = serializers.PrimaryKeyRelatedField(queryset=IPO.objects.all())  # Accept IPO id for document creation

    class Meta:
        model = Document
        fields = '__all__'


from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True, required=False)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'name']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': True},
            'email': {'required': True}
        }

    def validate_username(self, value):
        """Validate that username is unique"""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def validate_email(self, value):
        """Validate that email is unique"""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered.")
        return value

    def create(self, validated_data):
        # Extract 'name' field if provided (not part of User model)
        name = validated_data.pop('name', None)
        
        # Create user with username, email, and password
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        
        # Set first_name to 'name' if provided
        if name:
            user.first_name = name
            user.save()
        
        return user


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
