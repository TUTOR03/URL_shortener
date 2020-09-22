from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.utils.timezone import now

# Create your models here.
class Short_URL(models.Model):
	base_url = models.URLField()
	short_url = models.CharField(max_length = 100)
	name = models.CharField(max_length = 100, null = True, blank = True)
	active = models.BooleanField(default = True)
	user = models.ForeignKey(User, on_delete = models.CASCADE, blank = True, null = True)
	created = models.DateTimeField(auto_now_add = True)
	
	def __str__(self):
		return(f'{self.short_url} - {self.user} - {self.created.strftime("%d.%m.%y %H:%M:%S")}')

class URL_Visit(models.Model):
	remote_addr = models.CharField(max_length = 50)
	url = models.ForeignKey(Short_URL, on_delete = models.CASCADE)
	datetime = models.DateTimeField(auto_now_add = True)
	
	def __str__(self):
		return(f'{self.url.short_url} - {self.remote_addr} - {self.datetime.strftime("%H:%M:%S %d.%m.%Y")}')

@receiver(pre_save, sender = Short_URL)
def add_name(sender, instance, **kwargs):
	if(not instance.name):
		instance.name = instance.short_url