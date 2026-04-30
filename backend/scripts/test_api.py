import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from home.models import HomePage

hp = HomePage.objects.live().first()
print("HomePage ID:", hp.id)
if hp.body:
    for block in hp.body:
        print(f"\nBlock type: {block.block_type}")
        print(f"Block value keys: {block.value.keys()}")
        print(f"Image field content: {block.value.get('image')}")
        if block.value.get('image'):
            print(f"Image type: {type(block.value.get('image'))}")
