from django.urls import path, re_path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
	path('api/register', views.UserRegisterAPIView, name = 'UserRegister'),
	path('api/login', obtain_auth_token, name = 'UserLogin'),
	path('api/logout', views.UserLogoutAPIView, name = 'UserLogout'),
	path('api/create_url', views.CreateURLAPIView, name = 'URLCreate'),
	path('api/list_url', views.ListURLAPIView.as_view(), name = 'URLList'),
	path('api/list_url/<short_url>', views.SingleURLAPIView.as_view(), name = 'Update'),
	path('api/list_url/<short_url>/graph/<int:days>', views.URLGraphAPIView, name = 'URLGraph'),
	re_path(r'^ts-(?P<short_url>[0-9A-Za-z]{7}$)', views.URLRedirectAPIView, name = 'URLRedirect'),
]