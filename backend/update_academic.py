import os
import django
from django.core.files import File

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from wagtail.images.models import Image
from home.models import HomePage

hp = HomePage.objects.live().first()
if hp:
    body_data = hp.body.raw_data
    for block in body_data:
        if block['type'] == 'about_split':
            block['value']['tag'] = "ACADEMIC COLLABORATION"
            block['value']['heading'] = "Backed by Academic Excellence"
            block['value']['body'] = "Our programmes are grounded in evidence-based research. We collaborate with leading academic institutions to ensure every movement, song, and mindfulness session delivers measurable wellbeing benefits."
            block['value']['image_position'] = 'right'
            block['value']['stats'] = [
                {'type': 'item', 'value': {'value': '45%', 'label': 'Increase in mood'}},
                {'type': 'item', 'value': {'value': '34%', 'label': 'Reduction in stress'}},
                {'type': 'item', 'value': {'value': '28%', 'label': 'Better sleep quality'}},
                {'type': 'item', 'value': {'value': '92%', 'label': 'Member satisfaction'}},
            ]
            # Use an existing image or fallback
            img = Image.objects.filter(title='landing').first()
            if img:
                block['value']['image'] = img.id
    
    hp.body = body_data
    hp.save_revision().publish()
    print("Updated About/Academic section")
