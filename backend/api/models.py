from django.db import models
from django.contrib.auth.models import User
from djmoney.models.fields import MoneyField
# from users.models import User

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.title} - {self.user}'


class PurchaseRequest(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, null=True)
    cr = models.CharField(null=True, max_length=50)
    value = MoneyField(max_digits=19, decimal_places=2, default_currency='BRL',null=True)
    description = models.CharField(max_length=300, null=True)
    date = models.DateField(default=None, null=True)
    approval = models.BooleanField(default=False)

    def __str__(self):
      return f'{self.username}'





