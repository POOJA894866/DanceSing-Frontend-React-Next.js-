import os
import django
from django.core.files import File

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from wagtail.images.models import Image
from home.models import HomePage

def get_or_create_image(path, title):
    existing = Image.objects.filter(title=title).first()
    if existing:
        return existing
    if os.path.exists(path):
        with open(path, 'rb') as f:
            img = Image(title=title, file=File(f, name=f"{title}.png"))
            img.save()
            return img
    return None

care_img = get_or_create_image(r"C:\Users\Admin\.gemini\antigravity\brain\bf71a6a6-5f1f-46e0-81f8-9084f635c9b3\dancesing_care_1777214801592.png", "dancesing_care")
lifestyle_img = get_or_create_image(r"C:\Users\Admin\.gemini\antigravity\brain\bf71a6a6-5f1f-46e0-81f8-9084f635c9b3\dancesing_lifestyle_1777214825615.png", "dancesing_lifestyle")
on_air_img = Image.objects.filter(id=2).first() # Fallback

hp = HomePage.objects.live().first()
if hp:
    body_data = hp.body.raw_data
    for block in body_data:
        if block['type'] == 'programs_grid':
            block['value']['tag'] = "OUR PROGRAMMES"
            block['value']['heading'] = "Wellness that Moves You — Body, Mind & Soul"
            block['value']['subtitle'] = "We combine Movement, Music, and Mindfulness to power joy, connection, and fun, flexible, and accessible to all — helping older adults move more, smile more, and feel more connected."
            block['value']['category_tags'] = [
                {'type': 'item', 'value': {'label': 'Older adults'}},
                {'type': 'item', 'value': {'label': 'Care professionals'}},
                {'type': 'item', 'value': {'label': 'Independent living'}},
                {'type': 'item', 'value': {'label': 'Music therapy'}},
                {'type': 'item', 'value': {'label': 'Mindfulness'}},
            ]
            block['value']['cards'] = [
                {
                    'type': 'item',
                    'value': {
                        'tag': 'CARE SECTOR',
                        'heading': 'danceSing Care',
                        'body': 'A complete wellbeing programme for the care sector — supporting older adults, people with health conditions, and their carers. Includes chair-based movement, dementia-friendly activities, music, singing, mindfulness, and daily resources.',
                        'features': ['Care homes & senior living communities', 'Memory care units & hospitals', 'Boosts mood, supports dementia care', 'Builds independence · Saves staff time', 'Creates community & connection'],
                        'image': care_img.id if care_img else None,
                        'cta': {'label': 'Explore Care →', 'href': '#', 'style': 'text-arrow'}
                    }
                },
                {
                    'type': 'item',
                    'value': {
                        'tag': 'LIFESTYLE',
                        'heading': 'danceSing Lifestyle',
                        'body': 'A wellbeing platform for more able individuals seeking to improve health, longevity, and daily vitality. Offers fitness, movement, music and singing, mindfulness, and nutrition programmes for personal goals and group activities.',
                        'features': ['Independent adults & community groups', 'Workplace wellness teams & social clubs', 'Supports wellbeing · Reduces stress', 'Encourages healthy habits', 'Easy and engaging for all'],
                        'image': lifestyle_img.id if lifestyle_img else None,
                        'cta': {'label': 'Explore Lifestyle →', 'href': '#', 'style': 'text-arrow'}
                    }
                },
                {
                    'type': 'item',
                    'value': {
                        'tag': 'ON AIR RADIO',
                        'heading': 'danceSing On Air',
                        'body': 'A 24/7 wellbeing radio station with uplifting music, mood-boosting shows, reminiscence content, seasonal routines, and dementia-friendly programming. No adverts — just continuous, positive audio.',
                        'features': ['Care settings & community centres', 'Memory care units & day centres', 'Lifts mood instantly · Supports cognition', 'Enhances daily routines', 'No facilitation needed · No adverts'],
                        'image': on_air_img.id if on_air_img else None,
                        'cta': {'label': 'Explore danceSing on Air →', 'href': '#', 'style': 'text-arrow'}
                    }
                }
            ]
    hp.body = body_data
    hp.save_revision().publish()
    print("Updated Programs section")
