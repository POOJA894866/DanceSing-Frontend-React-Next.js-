import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from home.models import HomePage

hp = HomePage.objects.live().first()
if hp:
    body_data = hp.body.raw_data
    
    # 1. Holistic Wellness Solutions (features_grid)
    features_grid_val = {
        'tag': 'OUR FOCUS',
        'heading': 'Holistic Wellness Solutions',
        'items': [
            {
                'type': 'item',
                'value': {
                    'tag': 'FOR INDIVIDUALS',
                    'heading': 'Better Mind, Body and Well-being',
                    'body': 'Specifically designed to improve the physical and mental health of older adults, helping them live more active and independent lives.',
                    'accent_color': 'red',
                    'ctas': [{'type': 'cta', 'value': {'label': 'Learn More', 'href': '#', 'style': 'text-arrow'}}]
                }
            },
            {
                'type': 'item',
                'value': {
                    'tag': 'FOR STAFF',
                    'heading': 'Support your Staff and Professionals',
                    'body': 'Reduce stress, boost morale, and improve staff retention through our specialized wellness programmes for the care sector.',
                    'accent_color': 'green',
                    'ctas': [{'type': 'cta', 'value': {'label': 'Learn More', 'href': '#', 'style': 'text-arrow'}}]
                }
            },
            {
                'type': 'item',
                'value': {
                    'tag': 'FOR CARE SETTINGS',
                    'heading': 'Transforming your Care Environment',
                    'body': 'Enhance the quality of life in your care facility with evidence-based music, dance, and mindfulness interventions.',
                    'accent_color': 'blue',
                    'ctas': [{'type': 'cta', 'value': {'label': 'Learn More', 'href': '#', 'style': 'text-arrow'}}]
                }
            }
        ]
    }

    # 2. Testimonials (testimonials)
    testimonials_val = {
        'tag': 'FEEDBACK',
        'heading': 'Our Experience is Your Advantage',
        'items': [
            {
                'type': 'item',
                'value': {
                    'stars': 5,
                    'text': "DanceSing has brought so much joy back into my daily routine. I feel more energetic and connected than I have in years.",
                    'author': "Margaret S.",
                    'role': "Independent Living Member"
                }
            },
            {
                'type': 'item',
                'value': {
                    'stars': 5,
                    'text': "The staff wellness sessions have made a massive difference to our team's morale. It's the highlight of our week.",
                    'author': "James L.",
                    'role': "Care Home Manager"
                }
            },
            {
                'type': 'item',
                'value': {
                    'stars': 5,
                    'text': "An incredible blend of science and soul. The breathing exercises alone have helped my anxiety significantly.",
                    'author': "Evelyn R.",
                    'role': "Lifestyle Member"
                }
            }
        ]
    }

    # Update or append blocks
    new_body = []
    found_fg = False
    found_t = False
    
    for block in body_data:
        if block['type'] == 'features_grid':
            block['value'] = features_grid_val
            found_fg = True
        elif block['type'] == 'testimonials':
            block['value'] = testimonials_val
            found_t = True
        elif block['type'] == 'newsletter':
            block['value']['heading'] = "Save time and book a demo with us"
            block['value']['subtitle'] = "Experience how DanceSing can transform your wellness journey. One of our experts will be in touch shortly."
            block['value']['submit_label'] = "Book Now"
        new_body.append(block)
    
    if not found_fg: new_body.append({'type': 'features_grid', 'value': features_grid_val})
    if not found_t: new_body.append({'type': 'testimonials', 'value': testimonials_val})

    hp.body = new_body
    hp.save_revision().publish()
    print("Populated all new sections to match reference structure.")
else:
    print("HomePage not found.")
