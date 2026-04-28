import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from home.models import HomePage

hp = HomePage.objects.live().first()
if hp:
    body_data = hp.body.raw_data
    for block in body_data:
        if block['type'] == 'steps_grid':
            block['value']['tag'] = "HOW IT WORKS"
            block['value']['heading'] = "Why Breathing Works"
            block['value']['subtitle'] = "A science-backed, joyful approach that fits into your life — not the other way around."
            block['value']['steps'] = [
                {
                    'type': 'item',
                    'value': {
                        'number': '01',
                        'heading': 'For the mind',
                        'description': 'Deep breathing activates the parasympathetic nervous system, lowering cortisol and calming racing thoughts instantly.',
                        'icon': 'brain'
                    }
                },
                {
                    'type': 'item',
                    'value': {
                        'number': '02',
                        'heading': 'For the body',
                        'description': 'Improved oxygen flow boosts circulation, supporting muscle recovery and overall physical vitality during daily activities.',
                        'icon': 'activity'
                    }
                },
                {
                    'type': 'item',
                    'value': {
                        'number': '03',
                        'heading': 'For the soul',
                        'description': 'Rhythmic breathing creates a sense of presence and connection, fostering emotional balance and inner peace.',
                        'icon': 'heart'
                    }
                }
            ]
    hp.body = body_data
    hp.save_revision().publish()
    print("Updated Steps section with icon-based content")
