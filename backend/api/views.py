from .serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view
from .models import PurchaseRequest


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPurchaseRequest(request):
    purchaseRequest = PurchaseRequest.objects.all()
    serializer = PurchaseRequestSerializer(purchaseRequest, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addPurchaseRequest(request):
    user=request.user
    serializer = PurchaseRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def addPurchaseRequestGuest(request):
    serializer = PurchaseRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def updatePurchaseRequest(request, pk):
    purchaseRequest = PurchaseRequest.objects.get(id=pk)
    serializer = PurchaseRequestSerializer(instance=purchaseRequest, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deletePurchaseRequest(request, pk):
    purchaseRequest = PurchaseRequest.objects.get(id=pk)
    purchaseRequest.delete()
    return Response('Item successfully deleted!')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)
