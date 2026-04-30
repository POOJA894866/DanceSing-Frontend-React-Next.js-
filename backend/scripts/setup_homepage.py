import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from wagtail.models import Page, Site
from home.models import HomePage

# Fetch root node (ID 1) and default welcome (ID 2)
root_node = Page.objects.filter(id=1).first()
welcome_page = Page.objects.filter(id=2).first()

# Check if HomePage already exists
homepage = HomePage.objects.first()

if not homepage:
    homepage = HomePage(
        title="Home",
        slug="dancesing-home",
        live=True,
    )
    # Place it directly under the root node or the Welcome page. 
    # Let's place it under the Welcome page (ID 2) so it appears in the user's child explorer!
    parent = welcome_page if welcome_page else root_node
    parent.add_child(instance=homepage)
    homepage.save_revision().publish()
    print(f"Created HomePage '{homepage.title}' under Parent ID {parent.id}.")
else:
    print("HomePage already exists.")

# Update default site config
default_site = Site.objects.filter(is_default_site=True).first()
if default_site:
    default_site.root_page = homepage
    default_site.save()
    print(f"Configured site to serve '{homepage.title}'.")
