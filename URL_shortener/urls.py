from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('back.urls')),
    # re_path(r'^short/(?P<short_url>[0-9A-Za-z]{7}/$)',include('back.urls')),
    path('', include('frontend.urls'))
]+ static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)
