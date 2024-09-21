from django.shortcuts import render
from .models import User,Document,MyTrips,Driver,DriverAvailability
from .serializers import UserSerializer,RegistrationSerializer,MyTOPS,DocumentSerializer,MyTripsSerializer,DriverSerializer,DriverAvailabilitySerializer
# Create your views here.
from rest_framework.decorators import api_view,permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status
from django.core.mail import send_mail,EmailMessage
from django.conf import settings


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTOPS
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer
    
class DocumentView(generics.CreateAPIView):
    queryset = Document.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = DocumentSerializer

class DocumentList(generics.ListAPIView):
    queryset = Document.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = DocumentSerializer
    
# class MyTripsView(generics.CreateAPIView):
#     queryset = MyTrips.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = MyTripsSerializer

def get_name_from_email(email):
    # Split the email at '@' and take the first part
    name = email.split('@')[0]
    
    # Check if there are any dots to replace with spaces, if not return the name as is
    if '.' in name:
        name = name.replace('.', ' ').title()  # Convert 'john.doe' to 'John Doe'
    else:
        # If there's no dot, just capitalize the first letter of the name
        name = name.capitalize()  # 'vanshdesai' becomes 'Vanshdesai'
    
    return name


class MyTripsView(generics.CreateAPIView):
    queryset = MyTrips.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = MyTripsSerializer

    from django.core.mail import EmailMessage

def perform_create(self, serializer):
    # Save the trip object first
    trip = serializer.save()
    
    # After saving the trip, send an email to the user
    user_email = trip.email  # Assuming MyTrips has a user field linked to the User model
    name = get_name_from_email(user_email)

    # Create the HTML message
    html_message = f"""
    <html>
    <body>
        <h2>Hi {name},</h2>
        <p>Your trip has been successfully booked. Here are the details:</p>
        <ul>
            <li><strong>Trip ID:</strong> {trip.id}</li>
            <li><strong>Pickup Location:</strong> {trip.pickup}</li>
            <li><strong>Drop-off Location:</strong> {trip.dropoff}</li>
            <li><strong>Scheduled Date:</strong> {trip.dateTime}</li>
            <li><strong>Driver:</strong> {trip.driver}</li>
            <li><strong>Driver Phone Number:</strong> {trip.phone}</li>
        </ul>
        <p>Thank you for booking with us. We look forward to serving you!</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Your Ride Booking Team</strong></p>
    </body>
    </html>
    """

    # Email details
    subject = "Your Trip Confirmation"
    from_email = settings.EMAIL_HOST_USER
    to_email = [user_email]

    # Send the email using EmailMessage class with HTML content
    email = EmailMessage(subject, html_message, from_email, to_email)
    email.content_subtype = "html"  # Set the content type to HTML
    email.send(fail_silently=False)

    # Optionally, handle additional post-save logic here (e.g., notify the driver)

    
class MyTripsListView(generics.ListAPIView):
    queryset = MyTrips.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = MyTripsSerializer
    
class DriverCreate(generics.CreateAPIView):
    queryset = Driver.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = DriverSerializer
    
class DriverUpdate(generics.UpdateAPIView):
    queryset = Driver.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = DriverSerializer
    lookup_field = 'email'  # Set email as the lookup field
    
class DriverList(generics.ListAPIView):
    queryset = Driver.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = DriverSerializer
    
    
class DriverAvaliableCreate(generics.CreateAPIView):
    queryset = DriverAvailability.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = DriverAvailabilitySerializer
    
class DriverAvaliableList(generics.ListAPIView):
    queryset = DriverAvailability.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = DriverAvailabilitySerializer

class DriverAvailableUpdate(generics.UpdateAPIView):
    queryset = DriverAvailability.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = DriverAvailabilitySerializer
    lookup_field='id'
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protectedView(request):
    # output = f'Welcome {request.user}, Authentication successful.'
    
    # output = f'Welcome {request.user.username}, Authentication successful.'
    output = f'Welcome {request.user.profile.full_name}, Authentication successful.'
    
    return Response({"response":output},status=status.HTTP_200_OK)


@api_view(['GET'])
def view_all_routes(request):
    routes = [
        'api/token/refresh/',
        'api/register/',
        'api/document/',
        'api/mytrips/',
        'api/token/',
        'api/document/',
        'api/mytrips/',
        'api/mytrips-list/',
        'api/document-list/',
        'api/add-driver/',
        'api/driver-list/',
        'api/driver-update/<str:email>/',
        'api/driver-status/',
        'api/driver-status-list/',
        'api/driver-availability/<int:id>/'
        ]
    
    return Response(routes)
