from django.apps import AppConfig
from django.db.models.signals import post_save

class NotificationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notifications'

    def ready(self):
        # implicitly connect signals using the @receiver decorator
        from . import signals
