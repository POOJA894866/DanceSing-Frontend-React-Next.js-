import os
import django
from django.core.files import File

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from wagtail.images.models import Image
from home.models import HomePage

def get_or_create_image(path, title):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return None
    existing = Image.objects.filter(title=title).first()
    if existing:
        return existing
    with open(path, 'rb') as f:
        img = Image(title=title, file=File(f, name=f"{title}.png"))
        img.save()
        print(f"Uploaded: {title}")
        return img

# Image paths
images = {
    "hero": r"C:\Users\Admin\.gemini\antigravity\brain\bf71a6a6-5f1f-46e0-81f8-9084f635c9b3\dancesing_hero_bg_1777188583950.png",
    "dance": r"C:\Users\Admin\.gemini\antigravity\brain\bf71a6a6-5f1f-46e0-81f8-9084f635c9b3\program_dance_1777188617026.png",
    "mind": r"C:\Users\Admin\.gemini\antigravity\brain\bf71a6a6-5f1f-46e0-81f8-9084f635c9b3\program_mind_1777188676421.png",
    "soul": r"C:\Users\Admin\.gemini\antigravity\brain\bf71a6a6-5f1f-46e0-81f8-9084f635c9b3\program_soul_1777188792321.png"
}

hero_img = get_or_create_image(images["hero"], "dancesing_hero")
dance_img = get_or_create_image(images["dance"], "program_dance")
mind_img = get_or_create_image(images["mind"], "program_mind")
soul_img = get_or_create_image(images["soul"], "program_soul")

hp = HomePage.objects.live().first()
if hp and hp.body:
    body_data = hp.body.raw_data
    for block in body_data:
        if block['type'] == 'hero' and hero_img:
            block['value']['image'] = hero_img.id
        elif block['type'] == 'programs_grid':
            cards = block['value'].get('cards', [])
            if len(cards) >= 3:
                if dance_img: cards[0]['value']['image'] = dance_img.id
                if mind_img: cards[1]['value']['image'] = mind_img.id
                if soul_img: cards[2]['value']['image'] = soul_img.id
    
    hp.body = body_data
    hp.save_revision().publish()
    print("Success: HomePage updated with new images.")
else:
    print("Error: HomePage not found.")
