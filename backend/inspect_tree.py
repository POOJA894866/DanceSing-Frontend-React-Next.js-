import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from wagtail.models import Page

for page in Page.objects.all():
    print(f"ID: {page.id} | Title: {page.title} | Parent: {page.get_parent().id if page.get_parent() else 'None'} | Depth: {page.depth}")
