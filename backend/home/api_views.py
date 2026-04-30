from django.http import JsonResponse
from home.models import HomePage
from wagtail.images.models import Image
from django.conf import settings

def get_image_data(image_id, request):
    if not image_id:
        return None
    try:
        if isinstance(image_id, Image):
            img = image_id
        else:
            img = Image.objects.get(id=image_id)
        
        # Use a specific rendition for efficiency
        rendition = img.get_rendition('original')
        return {
            'src': request.build_absolute_uri(rendition.url),
            'alt': img.title,
            'width': rendition.width,
            'height': rendition.height,
        }
    except Exception:
        return None

def serialize_cta(value):
    if not value: return None
    return {
        "label": value.get("label", ""),
        "href":  value.get("href", "#"),
        "style": value.get("style", "primary"),
    }

def serialize_ctas(value):
    if not value: return []
    return [serialize_cta(item) for item in value]

def serialize_hero(value, request):
    awards = []
    for img in (value.get("awards") or []):
        data = get_image_data(img, request)
        if data:
            awards.append(data)
        
    return {
        "type":         "hero",
        "radio_text":   str(value.get("radio_text") or ""),
        "heading":      str(value.get("heading") or ""),
        "body":         str(value.get("body") or ""),
        "image":        get_image_data(value.get("image"), request),
        "ctas":         serialize_ctas(value.get("ctas")),
        "awards":       awards,
        "rating_text":  str(value.get("rating_text") or ""),
        "floating_cta": serialize_cta(value.get("floating_cta")),
    }

def serialize_about_hero(value, request):
    images = []
    for img in (value.get("images") or []):
        data = get_image_data(img, request)
        if data:
            images.append(data)
            
    bottom_bar = []
    for item in (value.get("bottom_bar") or []):
        bottom_bar.append(str(item))
        
    return {
        "type":       "about-hero",
        "tag":        str(value.get("tag") or ""),
        "heading":    str(value.get("heading") or ""),
        "body":       str(value.get("body") or ""),
        "ctas":       serialize_ctas(value.get("ctas")),
        "images":     images,
        "bottom_bar": bottom_bar,
    }


def serialize_leadership(value, request):
    members = []
    for m in (value.get('members') or []):
        members.append({
            'name': str(m.get('name') or ''),
            'role': str(m.get('role') or ''),
            'bio': str(m.get('bio') or ''),
            'image': get_image_data(m.get('image'), request),
            'linkedin': str(m.get('linkedin') or '#'),
        })
    return {
        'type': 'leadership',
        'tag': str(value.get('tag') or ''),
        'heading': str(value.get('heading') or ''),
        'subtitle': str(value.get('subtitle') or ''),
        'members': members,
    }


def serialize_our_story(value, request):
    return {
        "type": "our-story",
        "tag": str(value.get("tag") or ""),
        "heading": str(value.get("heading") or ""),
        "intro": str(value.get("intro") or ""),
        "body": str(value.get("body") or ""),
        "image": get_image_data(value.get("image"), request),
        "ctas": serialize_ctas(value.get("ctas")),
    }

def serialize_academic_foundation(value, request):
    partners = []
    for p in (value.get('partners') or []):
        tags = [str(t) for t in (p.get('tags') or [])]
        partners.append({
            'number': str(p.get('number') or ''),
            'name': str(p.get('name') or ''),
            'description': str(p.get('description') or ''),
            'tags': tags,
        })
    return {
        'type': 'academic-foundation',
        'tag': str(value.get('tag') or ''),
        'heading': str(value.get('heading') or ''),
        'body': str(value.get('body') or ''),
        'ctas': serialize_ctas(value.get('ctas')),
        'partners': partners,
    }

def serialize_our_mission(value, request):
    features = []
    for f in (value.get('features') or []):
        features.append({
            'icon': str(f.get('icon') or 'movement'),
            'title': str(f.get('title') or ''),
            'description': str(f.get('description') or ''),
        })
    return {
        'type': 'our-mission',
        'tag': str(value.get('tag') or ''),
        'heading': str(value.get('heading') or ''),
        'subtitle': str(value.get('subtitle') or ''),
        'body': str(value.get('body') or ''),
        'image': get_image_data(value.get('image'), request),
        'features': features,
        'ctas': serialize_ctas(value.get('ctas')),
    }

def serialize_what_drives_us(value, request):
    cards = []
    for c in (value.get('cards') or []):
        cards.append({
            'icon': str(c.get('icon') or 'movement'),
            'accent': str(c.get('accent') or '#c75c4d'),
            'title': str(c.get('title') or ''),
            'description': str(c.get('description') or ''),
        })
    return {
        'type': 'what-drives-us',
        'tag': str(value.get('tag') or ''),
        'heading': str(value.get('heading') or ''),
        'body': str(value.get('body') or ''),
        'ctas': serialize_ctas(value.get('ctas')),
        'cards': cards,
    }

def serialize_guiding_principles(value, request):
    cards = []
    for c in (value.get('cards') or []):
        cards.append({
            'icon': str(c.get('icon') or 'leaf'),
            'title': str(c.get('title') or ''),
            'description': str(c.get('description') or ''),
        })
    return {
        'type': 'guiding-principles',
        'tag': str(value.get('tag') or ''),
        'heading': str(value.get('heading') or ''),
        'subtitle': str(value.get('subtitle') or ''),
        'cards': cards,
    }

def serialize_our_gallery(value, request):
    images = []
    for img in (value.get('images') or []):
        images.append(get_image_data(img.get('image'), request))
    return {
        'type': 'our-gallery',
        'tag': str(value.get('tag') or ''),
        'heading': str(value.get('heading') or ''),
        'subtitle': str(value.get('subtitle') or ''),
        'images': images,
    }

def serialize_contact_section(value, request):
    return {
        'type': 'contact-section',
        'tag': str(value.get('tag') or ''),
        'heading': str(value.get('heading') or ''),
        'body': str(value.get('body') or ''),
        'email': str(value.get('email') or ''),
        'response_time': str(value.get('response_time') or ''),
        'rating_text': str(value.get('rating_text') or ''),
        'form_heading': str(value.get('form_heading') or ''),
        'form_subtext': str(value.get('form_subtext') or ''),
        'ctas': serialize_ctas(value.get('ctas')),
    }

def serialize_programs_grid(value, request):
    tags = []
    for t in (value.get("category_tags") or []):
        tags.append({
            "label": str(t.get("label") or ""),
            "icon":  str(t.get("icon") or ""),
        })
    cards = []
    for card in (value.get("cards") or []):
        cards.append({
            "tag":      str(card.get("tag") or ""),
            "icon":     str(card.get("icon") or ""),
            "heading":  str(card.get("heading") or ""),
            "body":     str(card.get("body") or ""),
            "image":    get_image_data(card.get("image"), request),
            "features": list(card.get("features") or []),
            "cta":      serialize_cta(card.get("cta")),
        })
    return {
        "type":         "programs-grid",
        "tag":          str(value.get("tag") or ""),
        "heading":      str(value.get("heading") or ""),
        "subtitle":     str(value.get("subtitle") or ""),
        "categoryTags": tags,
        "cards":        cards,
    }

def serialize_cta_banner(value, request):
    return {
        "type":       "cta-banner",
        "background": str(value.get("background") or "dark"),
        "heading":    str(value.get("heading") or ""),
        "subtitle":   str(value.get("subtitle") or ""),
        "image":      get_image_data(value.get("image"), request),
        "ctas":       serialize_ctas(value.get("ctas")),
    }

def serialize_about_split(value, request):
    stats = []
    for s in (value.get("stats") or []):
        stats.append({
            "value": str(s.get("value") or ""),
            "label": str(s.get("label") or ""),
        })
    return {
        "type":          "about-split",
        "tag":           str(value.get("tag") or ""),
        "heading":       str(value.get("heading") or ""),
        "body":          str(value.get("body") or ""),
        "imagePosition": str(value.get("image_position") or "right"),
        "image":         get_image_data(value.get("image"), request),
        "stats":         stats,
        "ctas":          serialize_ctas(value.get("ctas")),
    }

def serialize_steps_grid(value, request):
    steps = []
    for step in (value.get("steps") or []):
        steps.append({
            "number":      str(step.get("number") or ""),
            "heading":     str(step.get("heading") or ""),
            "description": str(step.get("description") or ""),
            "icon":        str(step.get("icon") or ""),
            "cta":         serialize_cta(step.get("cta")),
        })
    return {
        "type":     "steps-grid",
        "tag":      str(value.get("tag") or ""),
        "heading":  str(value.get("heading") or ""),
        "subtitle": str(value.get("subtitle") or ""),
        "steps":    steps,
    }

def serialize_feature_list(value, request):
    items = []
    for item in (value.get("items") or []):
        items.append({
            "tag":          str(item.get("tag") or ""),
            "heading":      str(item.get("heading") or ""),
            "body":         str(item.get("body") or ""),
            "image":        get_image_data(item.get("image"), request),
            "accentColor":  str(item.get("accent_color") or "gold"),
            "ctas":         serialize_ctas(item.get("ctas")),
        })
    return {
        "type":    "feature-list",
        "tag":     str(value.get("tag") or ""),
        "heading": str(value.get("heading") or ""),
        "items":   items,
    }

def serialize_features_grid(value, request):
    items = []
    for item in (value.get("items") or []):
        items.append({
            "tag":          str(item.get("tag") or ""),
            "heading":      str(item.get("heading") or ""),
            "body":         str(item.get("body") or ""),
            "image":        get_image_data(item.get("image"), request),
            "accentColor":  str(item.get("accent_color") or "gold"),
            "ctas":         serialize_ctas(item.get("ctas")),
        })
    return {
        "type":    "features-grid",
        "tag":     str(value.get("tag") or ""),
        "heading": str(value.get("heading") or ""),
        "items":   items,
    }

def serialize_testimonials(value, request):
    items = []
    for item in (value.get("items") or []):
        items.append({
            "stars":  item.get("stars", 5),
            "text":   str(item.get("text") or ""),
            "author": str(item.get("author") or ""),
            "role":   str(item.get("role") or ""),
            "image":  get_image_data(item.get("image"), request),
        })
    return {
        "type":    "testimonials",
        "tag":     str(value.get("tag") or ""),
        "heading": str(value.get("heading") or ""),
        "items":   items,
    }

def serialize_faq_accordion(value, request):
    items = []
    for item in (value.get("items") or []):
        items.append({
            "question":    str(item.get("question") or ""),
            "answer":      str(item.get("answer") or ""),
            "defaultOpen": bool(item.get("default_open", False)),
        })
    return {
        "type":     "faq-accordion",
        "tag":      str(value.get("tag") or ""),
        "heading":  str(value.get("heading") or ""),
        "subtitle": str(value.get("subtitle") or ""),
        "items":    items,
    }

def serialize_newsletter(value, request):
    return {
        "type":             "newsletter",
        "background":       str(value.get("background") or "dark"),
        "heading":          str(value.get("heading") or ""),
        "subtitle":         str(value.get("subtitle") or ""),
        "inputPlaceholder": str(value.get("input_placeholder") or "Enter your email"),
        "submitLabel":      str(value.get("submit_label") or "Subscribe"),
    }

BLOCK_SERIALIZERS = {
    "hero":            serialize_hero,
    "about_hero":      serialize_about_hero,
    'our_story':       serialize_our_story,
    'leadership':      serialize_leadership,
    'academic_foundation': serialize_academic_foundation,
    'our_mission':         serialize_our_mission,
    'what_drives_us':      serialize_what_drives_us,
    'guiding_principles':  serialize_guiding_principles,
    'our_gallery':         serialize_our_gallery,
    'contact_section':     serialize_contact_section,
    'programs_grid':   serialize_programs_grid,
    "cta_banner":      serialize_cta_banner,
    "about_split":     serialize_about_split,
    "steps_grid":      serialize_steps_grid,
    "feature_list":    serialize_feature_list,
    "features_grid":   serialize_features_grid,
    "testimonials":    serialize_testimonials,
    "faq_accordion":   serialize_faq_accordion,
    "newsletter":      serialize_newsletter,
}

from home.models import HomePage, NavigationSettings

def homepage_api(request):
    try:
        homepage = HomePage.objects.live().public().first()
        if not homepage:
            return JsonResponse({"error": "No home page found"}, status=404)

        # Fetch site-specific navigation settings
        nav_settings = NavigationSettings.for_site(homepage.get_site())
        
        nav_links = []
        if nav_settings:
            for link in nav_settings.links:
                nav_links.append({
                    "label": link.value.get("label"),
                    "href": link.value.get("href"),
                })

        sections = []
        for block in homepage.body:
            serializer_fn = BLOCK_SERIALIZERS.get(block.block_type)
            if serializer_fn:
                data = serializer_fn(block.value, request)
                # Background colors were missing in some serializers
                if 'background' not in data and 'background' in block.value:
                    data['background'] = block.value['background']
                sections.append(data)

        data = {
            "id":       homepage.id,
            "title":    homepage.title,
            "sections": sections,
            "navigation": {
                "logo": get_image_data(nav_settings.logo, request) if nav_settings else None,
                "logo_text": nav_settings.logo_text if nav_settings else "danceSing",
                "links": nav_links,
                "cta_label": nav_settings.cta_label if nav_settings else "Book a Demo",
                "cta_href": nav_settings.cta_href if nav_settings else "#cta",
                "login_label": nav_settings.login_label if nav_settings else "Login",
                "login_href": nav_settings.login_href if nav_settings else "#login",
            }
        }
        return JsonResponse(data)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)

from home.models import AboutPage

def aboutpage_api(request):
    try:
        aboutpage = AboutPage.objects.live().public().first()
        if not aboutpage:
            return JsonResponse({"error": "No about page found"}, status=404)

        sections = []
        for block in aboutpage.body:
            serializer_fn = BLOCK_SERIALIZERS.get(block.block_type)
            if serializer_fn:
                data = serializer_fn(block.value, request)
                if 'background' not in data and 'background' in block.value:
                    data['background'] = block.value['background']
                sections.append(data)

        data = {
            "id":       aboutpage.id,
            "title":    aboutpage.title,
            "sections": sections,
        }
        return JsonResponse(data)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return JsonResponse({"error": str(e)}, status=500)

