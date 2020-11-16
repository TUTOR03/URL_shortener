from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class UserSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(required=True)
	class Meta:
		model = User
		fields =[
			'username',
			'password',
			'email'
		]

class CreateShortURLSerializer(serializers.ModelSerializer):
	class Meta:
		model =  models.Short_URL
		fields = [
			'base_url',
			'name'
		]

class ShortURLSerializer(serializers.ModelSerializer):
	all_visits = serializers.SerializerMethodField()
	created = serializers.DateTimeField(format = "%d.%m.%y %H:%M:%S", read_only = True)
	class Meta:
		model = models.Short_URL
		fields = [
			'base_url',
			'name',
			'short_url',
			'active',
			'created',
			'all_visits'
		]
		read_only_fields = ['base_url','short_url','created','all_visits']

	def get_all_visits(self, instance):
		visits = models.URL_Visit.objects.filter(url = instance).count()
		return visits
