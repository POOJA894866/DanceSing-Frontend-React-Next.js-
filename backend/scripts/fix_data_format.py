import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from home.models import HomePage

hp = HomePage.objects.live().first()
if hp:
    body_data = hp.body.raw_data
    
    for block in body_data:
        # Fix Steps Grid (remove type/value wrappers from list items)
        if block['type'] == 'steps_grid':
            steps = block['value'].get('steps', [])
            new_steps = []
            for s in steps:
                val = s['value'] if isinstance(s, dict) and 'value' in s else s
                new_steps.append(val)
            block['value']['steps'] = new_steps

        # Fix Features Grid
        elif block['type'] == 'features_grid':
            items = block['value'].get('items', [])
            new_items = []
            for i in items:
                val = i['value'] if isinstance(i, dict) and 'value' in i else i
                new_items.append(val)
            block['value']['items'] = new_items

        # Fix Testimonials
        elif block['type'] == 'testimonials':
            items = block['value'].get('items', [])
            new_items = []
            for i in items:
                val = i['value'] if isinstance(i, dict) and 'value' in i else i
                new_items.append(val)
            block['value']['items'] = new_items

    hp.body = body_data
    hp.save_revision().publish()
    print("Standardized all StreamField data formats.")
else:
    print("HomePage not found.")
