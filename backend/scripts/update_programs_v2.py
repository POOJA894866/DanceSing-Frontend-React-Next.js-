import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from home.models import HomePage

hp = HomePage.objects.live().first()
if hp:
    body_data = hp.body.raw_data
    for block in body_data:
        if block['type'] == 'programs_grid':
            block['value']['category_tags'] = [
                {'label': 'Older adults', 'icon': 'heart'},
                {'label': 'Care professionals', 'icon': 'users'},
                {'label': 'Independent living', 'icon': 'leaf'},
                {'label': 'Music therapy', 'icon': 'music'},
                {'label': 'Mindfulness', 'icon': 'activity'},
            ]
            for card in block['value'].get('cards', []):
                if 'care' in card.get('tag', '').lower():
                    card['icon'] = 'heart'
                    card['features'] = [
                        "Care homes & senior living communities",
                        "Memory care units & hospitals",
                        "Boosts mood, supports dementia care"
                    ]
                elif 'lifestyle' in card.get('tag', '').lower():
                    card['icon'] = 'leaf'
                    card['features'] = [
                        "Personal wellness & longevity",
                        "Supports wellbeing - Reduces stress",
                        "Active aging community"
                    ]
                elif 'air' in card.get('tag', '').lower():
                    card['icon'] = 'radio'
                    card['features'] = [
                        "Care settings & community centres",
                        "Memory care units & day centres",
                        "Lifts mood instantly, supports cognition"
                    ]
    hp.body = body_data
    hp.save_revision().publish()
    print("Updated Programs Grid with icons and features.")
else:
    print("HomePage not found.")
