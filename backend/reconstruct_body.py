import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from home.models import HomePage
from wagtail.images.models import Image

hp = HomePage.objects.live().first()
if hp:
    # Get or generate a sample image if none exists
    img = Image.objects.first()
    
    # We want to RECONSTRUCT the body to ensure order and presence of all sections
    new_body = [
        {
            'type': 'hero',
            'value': {
                'tag': 'A Proven Digital Platform for',
                'heading': 'Movement, Music & Mindfulness',
                'body': 'Transform your mind, body, and soul through expertly guided dance, singing, and mindfulness programs. Join thousands of members already on their wellness journey.',
                'image': img.id if img else None,
                'stats': [
                    {'value': '200+', 'label': 'Programs Available'},
                    {'value': '24/7', 'label': 'Access Anytime'},
                    {'value': '100%', 'label': 'Expert-Led'},
                    {'value': '10,000+', 'label': 'Active Members'}
                ],
                'ctas': [{'label': 'Get Started', 'href': '#cta', 'style': 'primary'}]
            }
        },
        {
            'type': 'programs_grid',
            'value': {
                'tag': 'OUR PROGRAMMES',
                'heading': 'Wellness that Moves You — Body, Mind & Soul',
                'subtitle': 'We combine Movement, Music, and Mindfulness to power joy, connection, and fun, flexible, and accessible to all — helping older adults move more, smile more, and feel more connected.',
                'category_tags': [
                    {'label': 'Older adults', 'icon': 'heart'},
                    {'label': 'Care professionals', 'icon': 'users'},
                    {'label': 'Independent living', 'icon': 'leaf'},
                    {'label': 'Music therapy', 'icon': 'music'},
                    {'label': 'Mindfulness', 'icon': 'activity'},
                ],
                'cards': [
                    {
                        'tag': 'CARE SECTOR',
                        'icon': 'heart',
                        'heading': 'danceSing Care',
                        'body': 'A complete wellbeing programme for the care sector — supporting older adults, people with health conditions, and their carers.',
                        'features': ["Care homes & senior living communities", "Memory care units & hospitals", "Boosts mood, supports dementia care"]
                    },
                    {
                        'tag': 'LIFESTYLE',
                        'icon': 'leaf',
                        'heading': 'danceSing Lifestyle',
                        'body': 'A wellbeing platform for more able individuals seeking to improve health, longevity, and daily vitality.',
                        'features': ["Personal wellness & longevity", "Supports wellbeing - Reduces stress", "Active aging community"]
                    },
                    {
                        'tag': 'ON AIR RADIO',
                        'icon': 'radio',
                        'heading': 'danceSing On Air',
                        'body': 'A 24/7 wellbeing radio station with uplifting music, mood-boosting shows, and reminiscence content.',
                        'features': ["Care settings & community centres", "Memory care units & day centres", "Lifts mood instantly, supports cognition"]
                    }
                ]
            }
        },
        {
            'type': 'cta_banner',
            'value': {
                'heading': 'Online learning',
                'subtitle': 'Access our full library of movement, music, and mindfulness classes from anywhere in the world — at any time.',
                'ctas': [{'label': 'Start Free Trial', 'href': '#cta', 'style': 'accent'}]
            }
        },
        {
            'type': 'about_split',
            'value': {
                'tag': 'ACADEMIC EXCELLENCE',
                'heading': 'Backed by Academic Excellence',
                'body': 'Our programmes are developed in collaboration with leading universities and healthcare experts to ensure maximum impact.',
                'image_position': 'right',
                'stats': [
                    {'value': '95%', 'label': 'Improvement in mood'},
                    {'value': '88%', 'label': 'Increase in mobility'},
                    {'value': '92%', 'label': 'Better sleep quality'},
                    {'value': '100%', 'label': 'Science-backed'}
                ]
            }
        },
        {
            'type': 'steps_grid',
            'value': {
                'tag': 'HOW IT WORKS',
                'heading': 'Why Breathing Works',
                'subtitle': 'A science-backed, joyful approach that fits into your life — not the other way around.',
                'steps': [
                    {'number': '01', 'heading': 'For the mind', 'description': 'Deep breathing activates the parasympathetic nervous system.', 'icon': 'brain'},
                    {'number': '02', 'heading': 'For the body', 'description': 'Improved oxygen flow boosts circulation and vitality.', 'icon': 'activity'},
                    {'number': '03', 'heading': 'For the soul', 'description': 'Rhythmic breathing creates a sense of presence and connection.', 'icon': 'heart'}
                ]
            }
        },
        {
            'type': 'features_grid',
            'value': {
                'tag': 'OUR FOCUS',
                'heading': 'Holistic Wellness Solutions',
                'items': [
                    {'tag': 'FOR INDIVIDUALS', 'heading': 'Better Mind, Body and Well-being', 'body': 'Designed for physical and mental health.', 'accent_color': 'red'},
                    {'tag': 'FOR STAFF', 'heading': 'Support your Staff', 'body': 'Boost morale and retention.', 'accent_color': 'green'},
                    {'tag': 'FOR CARE SETTINGS', 'heading': 'Transforming your Care', 'body': 'Enhance quality of life.', 'accent_color': 'blue'}
                ]
            }
        },
        {
            'type': 'testimonials',
            'value': {
                'tag': 'FEEDBACK',
                'heading': 'Our Experience is Your Advantage',
                'items': [
                    {'stars': 5, 'text': 'Pure joy in every session.', 'author': 'Margaret S.'},
                    {'stars': 5, 'text': 'Highlight of our week.', 'author': 'James L.'},
                    {'stars': 5, 'text': 'Incredible blend of science and soul.', 'author': 'Evelyn R.'}
                ]
            }
        },
        {
            'type': 'faq_accordion',
            'value': {
                'tag': 'FAQ',
                'heading': 'Frequently Asked Questions',
                'items': [
                    {'question': 'Do I need experience?', 'answer': 'No, all levels welcome.'},
                    {'question': 'Can I cancel?', 'answer': 'Yes, anytime.'}
                ]
            }
        },
        {
            'type': 'newsletter',
            'value': {
                'heading': 'Save time and book a demo',
                'subtitle': 'One of our experts will be in touch.'
            }
        }
    ]

    hp.body = new_body
    hp.save_revision().publish()
    print("Reconstructed entire HomePage body with correct order and content.")
else:
    print("HomePage not found.")
