import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

user, created = User.objects.get_or_create(username='admin')
user.email = 'admin@example.com'
user.is_superuser = True
user.is_staff = True
user.set_password('admin12345')
user.save()

if created:
    print("Created superuser 'admin' with password 'admin12345'")
else:
    print("Reset password for superuser 'admin' to 'admin12345'")
