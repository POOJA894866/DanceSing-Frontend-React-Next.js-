import os
import django
from django.core.files import File

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from wagtail.images.models import Image
from home.models import HomePage

# 1. Load the user's uploaded image
image_path = r"c:\Users\Admin\.gemini\antigravity\brain\c722e00b-9f41-4a50-8a40-ac9e09a7b7c9\uploaded_media_1777116150803.png"

if not os.path.exists(image_path):
    print("Image not found at path:", image_path)
    exit()

img_filename = "landing.png"
existing_img = Image.objects.filter(title="landing").first()

if not existing_img:
    with open(image_path, 'rb') as f:
        existing_img = Image(title="landing", file=File(f, name=img_filename))
        existing_img.save()
        print("Image uploaded to Wagtail.")

# 2. Attach to HomePage Hero block
hp = HomePage.objects.live().first()
if hp and hp.body:
    # Update the first hero block
    body_data = hp.body.raw_data
    updated = False
    for block in body_data:
        if block['type'] == 'hero':
            block['value']['image'] = existing_img.id
            updated = True
            break
    
    if updated:
        hp.body = body_data
        hp.save_revision().publish()
        print("HomePage updated with hero image!")
    else:
        print("No hero block found on HomePage.")
else:
    print("HomePage not found.")
