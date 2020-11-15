from django.urls import path, re_path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
	path('', views.URLRedirectAPIView, name = 'URLRedirect'),
	path('register', views.UserRegisterAPIView, name = 'UserRegister'),
	path('login', obtain_auth_token, name = 'UserLogin'),
	path('logout', views.UserLogoutAPIView, name = 'UserLogout'),
	path('create_url', views.CreateURLAPIView, name = 'URLCreate'),
	path('list_url', views.ListURLAPIView.as_view(), name = 'URLList'),
	path('list_url/<short_url>', views.SingleURLAPIView.as_view(), name = 'Update'),
	path('list_url/<short_url>/graph', views.URLGraphAPIView, name = 'URLGraph')
]