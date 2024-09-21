from django.urls import path,include
from rest_framework_simplejwt.views import (TokenRefreshView)
from . import views
urlpatterns = [
    #Register and login path
    path('token/',views.MyTokenObtainPairView.as_view(),name='token-obtain'),
    path('token/refresh/',TokenRefreshView.as_view(),name='refresh-token'),
    path('register/',views.RegisterView.as_view(),name='register-user'),
    path('test/',views.protectedView,name='test'),
    path('',views.view_all_routes,name='all-routes'),
    
    #Document upload paths
    path('document/',views.DocumentView.as_view(),name='document-view'),
    path('document-list/',views.DocumentList.as_view(),name='document-list'),
    
    #customer trips path
    path('mytrips/',views.MyTripsView.as_view(),name='trips-view'),
    path('mytrips-list/',views.MyTripsListView.as_view(),name='trips-view'),
    
    #Driver paths for create and update
    path('add-driver/',views.DriverCreate.as_view(),name='add-driver'),
    path('driver-update/<str:email>/',views.DriverUpdate.as_view(),name='driver-update'),
    path('driver-list/',views.DriverList.as_view(),name='driver-list'),
    
    #Driver Availability paths for driver avaliable for take ride or not
    path('driver-status/',views.DriverAvaliableCreate.as_view(),name='driver-status'),
    path('driver-status-list/',views.DriverAvaliableList.as_view(),name='driver-status-list'),
    path('driver-availability/<int:id>/',views.DriverAvailableUpdate.as_view(),name='driver-availability'),
]
