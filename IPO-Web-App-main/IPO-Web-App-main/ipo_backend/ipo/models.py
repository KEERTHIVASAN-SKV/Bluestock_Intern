from django.db import models
from django.contrib.auth.models import User


class Company(models.Model):
    company_name = models.CharField(max_length=255)
    company_logo = models.URLField(max_length=500)  # or use ImageField with media settings

    def __str__(self):
        return self.company_name
    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"


class IPO(models.Model):
    STATUS_CHOICES = [
        ('Upcoming', 'Upcoming'),
        ('Open', 'Open'),
        ('Closed', 'Closed'),
        ('Listed', 'Listed'),
    ]

    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='ipos')
    price_band = models.CharField(max_length=50)
    open_date = models.DateField()
    close_date = models.DateField()
    issue_size = models.CharField(max_length=100)
    issue_type = models.CharField(max_length=50)
    listing_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    ipo_price = models.DecimalField(max_digits=10, decimal_places=2)
    listing_price = models.DecimalField(max_digits=10, decimal_places=2)
    listing_gain = models.DecimalField(max_digits=5, decimal_places=2)
    current_market_price = models.DecimalField(max_digits=10, decimal_places=2)
    current_return = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return f"{self.company.company_name} IPO"

    class Meta:
        db_table = 'ipos'  # map to existing PostgreSQL table
        verbose_name = "IPO"
        verbose_name_plural = "IPOS"

class Document(models.Model):
    ipo = models.ForeignKey(IPO, on_delete=models.CASCADE, related_name='documents')
    rhp_pdf = models.URLField(max_length=500)
    drhp_pdf = models.URLField(max_length=500)

    def __str__(self):
        return f"Docs for {self.ipo}"

    class Meta:
        db_table = 'documents'
        verbose_name = "Document"
        verbose_name_plural = "Documents"

# class User(models.Model):
#     email = models.EmailField(unique=True)
#     username = models.CharField(unique=True, max_length=100)
#     password = models.CharField(max_length=255)
#     name = models.CharField(max_length=100, blank=True, null=True)
#     role = models.CharField(max_length=50, blank=True, null=True)

#     def __str__(self):
#         return self.email

#     class Meta:
#         db_table = 'users'
#         verbose_name = "User"
#         verbose_name_plural = "Users"

class Application(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    ipo = models.ForeignKey(IPO, on_delete=models.CASCADE, related_name='applications')
    quantity = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.user.email} - {self.ipo}"

    class Meta:
        db_table = 'applications'
        verbose_name = "Application"
        verbose_name_plural = "Applications"
