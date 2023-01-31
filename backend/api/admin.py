from django.contrib import admin
from .models import Note
from .models import PurchaseRequest

admin.site.register(Note)
admin.site.register(PurchaseRequest)
