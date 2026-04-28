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
    "programs_grid":   serialize_programs_grid,
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
