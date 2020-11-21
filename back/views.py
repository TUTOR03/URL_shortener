from django.shortcuts import render, redirect
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, CreateShortURLSerializer, ShortURLSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.authtoken.models import Token
from rest_framework.filters import OrderingFilter, SearchFilter
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from hashlib import sha1
from .models import Short_URL, URL_Visit
from datetime import timedelta, datetime
from django.utils.timezone import now
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
import threading

class EmailTokenGenerator(PasswordResetTokenGenerator):
	def _make_hash_value(self, user, timestamp):
		return(six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user.is_active))

email_token_gen = EmailTokenGenerator()

class ListURLAPIView(generics.ListAPIView):
		serializer_class = ShortURLSerializer
		permission_classes = [permissions.IsAuthenticated]
		filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
		filterset_fields = ['name','created','base_url','short_url','active']
		ordering_fields = ['name','created','base_url','short_url','active']
		search_fields = ['base_url', 'short_url', 'name']
		
		def get_queryset(self):
			return Short_URL.objects.filter(user = self.request.user).order_by('-created')

class SingleURLAPIView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Short_URL.objects.all()
	serializer_class = ShortURLSerializer
	permission_classes = [permissions.IsAuthenticated]
	lookup_field = 'short_url'

	def get_queryset(self):
		return Short_URL.objects.filter(user = self.request.user, short_url = self.kwargs['short_url'])

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def URLGraphAPIView(request, short_url):
	url = Short_URL.objects.filter(user = request.user, short_url = short_url)
	if(url.exists()):
		url = url.first()
		days = str(request.data.get('days','1'))
		base_datetime = {
			'30':60,
			'1':24,
			'14':42
		}
		if(days!= None and days in base_datetime.keys()):
			try:
				str_format = request.data.get('str_format','%H:%M:%S %d.%m.%Y')
				now().strftime(str_format)
			except:
				str_format = '%H:%M:%S %d.%m.%Y'
			queryset = list(filter(lambda ob:ob.datetime+timedelta(days = int(days))>=now(),URL_Visit.objects.filter(url = url).order_by('datetime')))
			queryset = list(map(lambda ob:ob.datetime,queryset))
			if(queryset):
				data = [[0,(queryset[0]+timedelta(hours = int(days)*24//base_datetime[days])*(1+i)).strftime(str_format)] for i in range(base_datetime[days])]
				for t in queryset:
					tt = (t - queryset[0])//timedelta(hours = int(days)*24//base_datetime[days])
					data[tt][0]+=1
				return Response(data, status = status.HTTP_200_OK)
			return Response([], status = status.HTTP_200_OK)
		return Response(status = status.HTTP_400_BAD_REQUEST)
	return Response(status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def URLRedirectAPIView(request, short_url):
	url = Short_URL.objects.filter(short_url = short_url.replace('/',''), active = True)
	if(url.exists()):
		url = url.first()
		if(url.user):
			rm_addr = request.META.get('HTTP_X_FORWARDED_FOR')
			if rm_addr:
				rm_addr = rm_addr.split(',')[0]
			else:
				rm_addr = request.META.get('REMOTE_ADDR')
			visit = URL_Visit.objects.filter(remote_addr = rm_addr)
			if(visit.exists()):
				visit = visit.order_by('-datetime').first()
				if((visit.datetime + timedelta(**settings.UNIQUE_VISIT_CALLDOWN))<now()):
					URL_Visit.objects.create(url = url, remote_addr = rm_addr)
			else:
				URL_Visit.objects.create(url = url, remote_addr = rm_addr)
		return redirect(url.base_url)
	return Response(status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def CreateURLAPIView(request):
	data = request.data
	if(request.user.is_anonymous):
		salt = str(get_random_string(length = 7))
		sha_hash = sha1(bytes(f'{salt}{data["base_url"]}','utf-8')).hexdigest()[:7]
	else:
		salt = sha1(bytes(f'{request.user.username}','utf-8')).hexdigest()[:7]
		sha_hash = sha1(bytes(f'{salt}{data["base_url"]}','utf-8')).hexdigest()[:7]
		temp_q = Short_URL.objects.filter(short_url = sha_hash)
		if(temp_q.exists()):
			temp_q.first().delete()
	sha_hash = f'ts-{sha_hash}'
	serializer = CreateShortURLSerializer(data = data)
	if(serializer.is_valid()):
		serializer = serializer.validated_data
		if(not request.user.is_anonymous):
			url = Short_URL.objects.create(base_url = serializer['base_url'], name = serializer.get('name'), user = request.user, short_url = sha_hash)
		else:
			url = Short_URL.objects.create(base_url = serializer['base_url'], short_url = sha_hash)
		n_serializer = ShortURLSerializer(url)
		return Response(n_serializer.data,status = status.HTTP_200_OK)
	else:
		return Response({'error':serializer.errors}, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([~permissions.IsAuthenticated])
def UserRegisterAPIView(request):
	serializer = UserSerializer(data = request.data)
	if(serializer.is_valid()):
		data = serializer.validated_data
		if(User.objects.filter(username = data['username']).exists()):
			return Response({'error':'User already exists'},status = status.HTTP_400_BAD_REQUEST)
		user = User.objects.create(username = data['username'], email = data['email'], is_active = False)
		user.set_password(data['password'])
		user.save()
		domain = get_current_site(request).domain
		mail_subject = 'Activate your account'
		message = render_to_string('email_activtion.html',{
			'user':user,
			'domain': domain,
            'uidb64': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': email_token_gen.make_token(user),
		})
		message_task = threading.Thread(target = async_email, args=( mail_subject, message, [data['email']] ))
		message_task.start()
		# mail_to_send = EmailMultiAlternatives(mail_subject, strip_tags(message), to=[data['email']])
		# mail_to_send.attach_alternative(message, 'text/html')
		# mail_to_send.send()
		return Response({'ok':True},status = status.HTTP_200_OK)
	return Response({'error':serializer.errors},status = status.HTTP_400_BAD_REQUEST)

def async_email(mail_subject, message, to_email):
	mail_to_send = EmailMultiAlternatives(mail_subject, strip_tags(message), to=to_email)
	mail_to_send.attach_alternative(message, 'text/html')
	mail_to_send.send()

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def UserActivationAPIView(request, uidb64, token):
	uid = force_text(urlsafe_base64_decode(uidb64))
	user = User.objects.filter(id = uid)
	if(user.exists()):
		user = user.first()
		if(email_token_gen.check_token(user, token)):
			user.is_active = True
			user.save()
			return Response({'message':'Thank you for your email confirmation. Now you can login your account'}, status = status.HTTP_200_OK)
	return Response({'message':'Activation link is invalid'}, status = status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def UserLogoutAPIView(request):
	Token.objects.get(user = request.user).delete()
	return Response(status = status.HTTP_200_OK)