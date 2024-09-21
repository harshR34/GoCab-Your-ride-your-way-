from django.contrib import admin
from api.models import User,Profile,Document,MyTrips,Driver,DriverAvailability
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['username','email']
    
class ProfileAdmin(admin.ModelAdmin):
    list_editable=['verified']
    list_display = ['full_name','user','verified']
    
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['email','driving_license_num', 'adhaar_num', 'pan_number', 'license_plate','profilePhoto']
    
class MyTripAdmin(admin.ModelAdmin):
    list_display = ['email','pickup','dropoff','paymentMethod','dateTime','distance','duration','price','driver','phone']
    
class DriverAdmin(admin.ModelAdmin):
    list_display=['id','first_name','last_name','email','phone','documentStatus']
    
class DriverAvailabilityAdmin(admin.ModelAdmin):
    list_display= ['id','name','phone','lat','lon','availabilityStatus']

    
admin.site.register(User,UserAdmin)
admin.site.register(Profile,ProfileAdmin)
admin.site.register(Document,DocumentAdmin)
admin.site.register(MyTrips,MyTripAdmin)
admin.site.register(Driver,DriverAdmin)
admin.site.register(DriverAvailability,DriverAvailabilityAdmin)