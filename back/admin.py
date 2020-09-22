from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Short_URL)
admin.site.register(models.URL_Visit)