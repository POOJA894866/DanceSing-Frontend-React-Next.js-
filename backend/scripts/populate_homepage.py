import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from django.core.files import File
from wagtail.images.models import Image
from home.models import HomePage

def get_or_create_image(img_path_str):
    if not img_path_str:
        return None
    filename = os.path.basename(img_path_str)
    full_path = os.path.join("c:\\Users\\Admin\\OneDrive\\Desktop\\DanceSing\\frontend\\public\\assets", filename)
    
    existing = Image.objects.filter(title=filename).first()
    if existing:
        return existing
        
    if os.path.exists(full_path):
        with open(full_path, 'rb') as f:
            img = Image(
                title=filename,
                file=File(f, name=filename)
            )
            img.save()
            return img
    return None

# Read content.json
content_path = 'c:/Users/Admin/OneDrive/Desktop/DanceSing/frontend/src/Reference/content.json'
with open(content_path, 'r', encoding='utf-8') as f:
    content = json.load(f)

stream_data = []

for sec in content.get('sections', []):
    if not sec.get('type'):
        continue
        
    t = sec['type']
    block_type = t.replace('-', '_')
    val = {}
    
    if block_type == 'hero':
        val = {
            'tag': sec.get('tag', ''),
            'heading': sec.get('heading', ''),
            'body': sec.get('body', ''),
            'stats': sec.get('stats', []),
            'ctas': sec.get('ctas', []),
            'image': get_or_create_image(sec.get('image', {}).get('src'))
        }
    elif block_type == 'programs_grid':
        cards = []
        for c in sec.get('cards', []):
            cards.append({
                'tag': c.get('tag', ''),
                'heading': c.get('heading', ''),
                'body': c.get('body', ''),
                'image': get_or_create_image(c.get('image', {}).get('src')),
                'cta': c.get('cta')
            })
        val = {
            'tag': sec.get('tag', ''),
            'heading': sec.get('heading', ''),
            'subtitle': sec.get('subtitle', ''),
            'cards': cards
        }
    elif block_type == 'cta_banner':
        val = {
            'heading': sec.get('heading', ''),
            'subtitle': sec.get('subtitle', ''),
            'image': get_or_create_image(sec.get('image', {}).get('src')),
            'ctas': sec.get('ctas', [])
        }
    elif block_type == 'about_split':
        val = {
            'tag': sec.get('tag', ''),
            'heading': sec.get('heading', ''),
            'body': sec.get('body', ''),
            'image_position': sec.get('imagePosition', 'right'),
            'image': get_or_create_image(sec.get('image', {}).get('src')),
            'stats': sec.get('stats', []),
            'ctas': sec.get('ctas', [])
        }
    elif block_type == 'steps_grid':
        steps = []
        for s in sec.get('steps', []):
            steps.append({
                'number': s.get('number', ''),
                'heading': s.get('heading', ''),
                'sub': s.get('sub', ''),
                'image': get_or_create_image(s.get('image', {}).get('src')),
                'cta_label': s.get('cta', {}).get('label', 'Learn More') if s.get('cta') else 'Learn More',
                'cta_href': s.get('cta', {}).get('href', '#') if s.get('cta') else '#'
            })
        val = {
            'tag': sec.get('tag', ''),
            'heading': sec.get('heading', ''),
            'subtitle': sec.get('subtitle', ''),
            'steps': steps
        }
    elif block_type == 'feature_list':
        items = []
        for item in sec.get('items', []):
            items.append({
                'tag': item.get('tag', ''),
                'heading': item.get('heading', ''),
                'body': item.get('body', ''),
                'image': get_or_create_image(item.get('image', {}).get('src')),
                'ctas': item.get('ctas', [])
            })
        val = {
            'tag': sec.get('tag', ''),
            'heading': sec.get('heading', ''),
            'items': items
        }
    elif block_type == 'plans_grid':
        plans = []
        for p in sec.get('plans', []):
            features = [{'text': f} for f in p.get('features', [])]
            plans.append({
                'name': p.get('name', ''),
                'price': p.get('price', ''),
                'period': p.get('period', ''),
                'featured': p.get('featured', False),
                'features': features,
                'cta': p.get('cta')
            })
        val = {
            'tag': sec.get('tag', ''),
            'heading': sec.get('heading', ''),
            'subtitle': sec.get('subtitle', ''),
            'plans': plans
        }
    elif block_type == 'faq_accordion':
        items = []
        for i in sec.get('items', []):
            items.append({
                'question': i.get('question', ''),
                'answer': i.get('answer', ''),
                'default_open': i.get('defaultOpen', False)
            })
        val = {
            'tag': sec.get('tag', ''),
            'heading': sec.get('heading', ''),
            'subtitle': sec.get('subtitle', ''),
            'items': items,
            'footer_heading': sec.get('footerCta', {}).get('heading', ''),
            'footer_body': sec.get('footerCta', {}).get('body', ''),
            'footer_cta': sec.get('footerCta', {}).get('cta') if sec.get('footerCta') else None
        }
    elif block_type == 'newsletter':
        val = {
            'heading': sec.get('heading', ''),
            'subtitle': sec.get('subtitle', ''),
            'input_placeholder': sec.get('inputPlaceholder', 'Enter your email address'),
            'submit_label': sec.get('submitLabel', 'Sign Up Free'),
            'disclaimer': sec.get('disclaimer', '')
        }
        
    stream_data.append({'type': block_type, 'value': val})

homepage = HomePage.objects.first()
if homepage:
    homepage.body = stream_data
    homepage.save_revision().publish()
    print("Success")
else:
    print("Not found")
