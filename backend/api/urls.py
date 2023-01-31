from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('notes/', views.getNotes),
    path('purchaserequest/get/', views.getPurchaseRequest),
    path('purchaserequest/add/', views.addPurchaseRequest),
    path('purchaserequest/addguest/', views.addPurchaseRequestGuest),
    path('purchaserequest/update/<str:pk>/', views.updatePurchaseRequest),
    path('purchaserequest/delete/<str:pk>/', views.deletePurchaseRequest),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes)
]
