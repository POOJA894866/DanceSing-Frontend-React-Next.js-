from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtail.admin.panels import FieldPanel
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
import json
import os

def get_homepage_defaults():
    try:
        json_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'frontend', 'src', 'Reference', 'content.json')
        if not os.path.exists(json_path):
            return []
        with open(json_path, 'r', encoding='utf-8') as f:
            content = json.load(f)
        defaults = []
        
        def clean_cta(c):
            if not isinstance(c, dict): return None
            return {
                'label': c.get('label', ''),
                'href': c.get('href', '#'),
                'style': c.get('style', 'primary')
            }
            
        for sec in content.get('sections', []):
            if not sec.get('type'): continue
            t = sec['type']
            val = {}
            
            if t == 'hero':
                stats = [{'value': s.get('value', ''), 'label': s.get('label', '')} for s in sec.get('stats', []) if isinstance(s, dict)]
                ctas = [clean_cta(c) for c in sec.get('ctas', [])]
                val = {'tag': sec.get('tag', ''), 'heading': sec.get('heading', ''), 'body': sec.get('body', ''), 'stats': stats, 'ctas': ctas}
                defaults.append(('hero', val))
                
            elif t == 'cards-grid':
                cards = []
                for c in sec.get('cards', []):
                    if not isinstance(c, dict): continue
                    cards.append({
                        'tag': c.get('tag', ''), 
                        'heading': c.get('heading', ''), 
                        'body': c.get('body', ''), 
                        'features': c.get('features', []),
                        'cta': clean_cta(c.get('cta'))
                    })
                tags = [{'label': t.get('label', '')} for t in sec.get('categoryTags', []) if isinstance(t, dict)]
                val = {
                    'tag': sec.get('tag', ''), 
                    'heading': sec.get('heading', ''), 
                    'subtitle': sec.get('subtitle', ''), 
                    'category_tags': tags,
                    'cards': cards
                }
                defaults.append(('programs_grid', val))
                
            elif t == 'cta-banner':
                ctas = [clean_cta(c) for c in sec.get('ctas', [])]
                val = {'heading': sec.get('heading', ''), 'subtitle': sec.get('subtitle', ''), 'ctas': ctas}
                defaults.append(('cta_banner', val))
                
            elif t == 'about-split':
                stats = [{'value': s.get('value', ''), 'label': s.get('label', '')} for s in sec.get('stats', []) if isinstance(s, dict)]
                ctas = [clean_cta(c) for c in sec.get('ctas', [])]
                val = {'tag': sec.get('tag', ''), 'heading': sec.get('heading', ''), 'body': sec.get('body', ''), 'image_position': sec.get('imagePosition', 'right'), 'stats': stats, 'ctas': ctas}
                defaults.append(('about_split', val))
                
            elif t == 'steps-grid':
                steps = []
                for s in sec.get('steps', []):
                    if not isinstance(s, dict): continue
                    steps.append({
                        'number': s.get('number', ''), 
                        'heading': s.get('heading', ''), 
                        'description': s.get('description', ''), 
                        'icon': s.get('icon', ''),
                        'cta_label': s.get('cta', {}).get('label', 'Learn More') if isinstance(s.get('cta'), dict) else 'Learn More', 
                        'cta_href': s.get('cta', {}).get('href', '#') if isinstance(s.get('cta'), dict) else '#'
                    })
                val = {'tag': sec.get('tag', ''), 'heading': sec.get('heading', ''), 'subtitle': sec.get('subtitle', ''), 'steps': steps}
                defaults.append(('steps_grid', val))
                
            elif t == 'feature-list':
                items = []
                for item in sec.get('items', []):
                    if not isinstance(item, dict): continue
                    items.append({'tag': item.get('tag', ''), 'heading': item.get('heading', ''), 'body': item.get('body', ''), 'ctas': [clean_cta(c) for c in item.get('ctas', [])]})
                val = {'tag': sec.get('tag', ''), 'heading': sec.get('heading', ''), 'items': items}
                defaults.append(('feature_list', val))
                
            elif t == 'plans-grid':
                plans = []
                for p in sec.get('plans', []):
                    if not isinstance(p, dict): continue
                    features = [{'text': f} for f in p.get('features', [])]
                    plans.append({'name': p.get('name', ''), 'price': p.get('price', ''), 'period': p.get('period', ''), 'featured': bool(p.get('featured', False)), 'features': features, 'cta': clean_cta(p.get('cta'))})
                val = {'tag': sec.get('tag', ''), 'heading': sec.get('heading', ''), 'subtitle': sec.get('subtitle', ''), 'plans': plans}
                defaults.append(('plans_grid', val))
                
            elif t == 'faq-accordion':
                items = []
                for item in sec.get('items', []):
                    if not isinstance(item, dict): continue
                    items.append({'question': item.get('question', ''), 'answer': item.get('answer', ''), 'default_open': bool(item.get('defaultOpen', False))})
                footer_cta = clean_cta(sec.get('footerCta', {}).get('cta'))
                val = {'tag': sec.get('tag', ''), 'heading': sec.get('heading', ''), 'subtitle': sec.get('subtitle', ''), 'items': items, 'footer_heading': sec.get('footerCta', {}).get('heading', ''), 'footer_body': sec.get('footerCta', {}).get('body', ''), 'footer_cta': footer_cta}
                defaults.append(('faq_accordion', val))
                
            elif t == 'newsletter':
                val = {'heading': sec.get('heading', ''), 'subtitle': sec.get('subtitle', ''), 'input_placeholder': sec.get('inputPlaceholder', 'Enter your email address'), 'submit_label': sec.get('submitLabel', 'Sign Up Free'), 'disclaimer': sec.get('disclaimer', '')}
                defaults.append(('newsletter', val))
        return defaults
    except:
        return []


# ─────────────────────────────────────────────────────────────────
# REUSABLE MINI-BLOCKS
# ─────────────────────────────────────────────────────────────────

class CtaBlock(blocks.StructBlock):
    """A single call-to-action button (label + href + style)."""
    label = blocks.CharBlock(max_length=100, required=False)
    href  = blocks.CharBlock(max_length=255, default="#", required=False)
    style = blocks.ChoiceBlock(
        choices=[
            ("primary",       "Primary (dark navy fill)"),
            ("outline",       "Outline (white border)"),
            ("outline-white", "Outline White (thick white border)"),
            ("accent",        "Accent (orange/red fill)"),
            ("green",         "Green (lifestyle fill)"),
            ("text-arrow",    "Text Arrow (borderless)"),
        ],
        default="primary",
    )

    class Meta:
        icon  = "link"
        label = "CTA Button"


# ─────────────────────────────────────────────────────────────────
# SECTION 1 · HERO
# ─────────────────────────────────────────────────────────────────

class StatItemBlock(blocks.StructBlock):
    value = blocks.CharBlock(max_length=20, help_text="e.g. 200+ or 24/7", required=False)
    label = blocks.CharBlock(max_length=100, required=False)

    class Meta:
        icon  = "plus"
        label = "Stat Item"


class HeroBlock(blocks.StructBlock):
    radio_text = blocks.CharBlock(max_length=150, required=False, help_text="e.g. Broadcasting Live • 24/7 Wellness Radio", default="Broadcasting Live • 24/7 Wellness Radio")
    heading = blocks.CharBlock(max_length=300, required=False)
    body    = blocks.TextBlock(required=False)
    image   = ImageChooserBlock(required=False)
    
    ctas    = blocks.ListBlock(CtaBlock(), min_num=0, label="CTA Buttons")
    
    awards  = blocks.ListBlock(ImageChooserBlock(), required=False, label="Award Logos (Bottom Left)")
    rating_text = blocks.CharBlock(max_length=100, required=False, default="4.9 out of 5 Stars from Reviews")
    
    floating_cta = CtaBlock(required=False, label="Floating Button (Bottom Right)")

    class Meta:
        icon  = "image"
        label = "Section 1 – Premium Hero"

# ─────────────────────────────────────────────────────────────────
# ABOUT HERO
# ─────────────────────────────────────────────────────────────────

class AboutHeroBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default="The People and Purpose Behind the Platform")
    heading = blocks.CharBlock(max_length=200, required=False, default="Founded On A Belief That Joy Is Medicine")
    body = blocks.TextBlock(required=False)
    ctas = blocks.ListBlock(CtaBlock(), min_num=0, label="CTA Buttons")
    images = blocks.ListBlock(ImageChooserBlock(), required=False, label="Carousel Images")
    
    bottom_bar = blocks.ListBlock(
        blocks.CharBlock(max_length=100), 
        required=False, 
        label="Bottom Bar Items (e.g. ICO Registered)"
    )

    class Meta:
        icon = "image"
        label = "About Hero"

# ─────────────────────────────────────────────────────────────────
# OUR STORY
# ─────────────────────────────────────────────────────────────────

class OurStoryBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default="OUR STORY")
    heading = blocks.CharBlock(max_length=200, required=False, default="A Simple Idea That Grew Into Something Much Bigger")
    intro = blocks.TextBlock(required=False, help_text="Bold italic intro text")
    body = blocks.TextBlock(required=False, help_text="Main body paragraphs. Use \\n for newlines.")
    image = ImageChooserBlock(required=False)
    ctas = blocks.ListBlock(CtaBlock(), min_num=0, label="CTA Buttons")

    class Meta:
        icon = "doc-full"
        label = "Our Story"

# ─────────────────────────────────────────────────────────────────
# LEADERSHIP SECTION
# ─────────────────────────────────────────────────────────────────

class LeadershipMemberBlock(blocks.StructBlock):
    name = blocks.CharBlock(max_length=100, required=False)
    role = blocks.CharBlock(max_length=200, required=False, help_text="e.g. CHIEF EXECUTIVE OFFICER · CO-FOUNDER")
    bio = blocks.TextBlock(required=False, help_text="Use \\n for paragraph breaks")
    image = ImageChooserBlock(required=False)
    linkedin = blocks.URLBlock(required=False, default="#")

    class Meta:
        icon = "user"
        label = "Team Member"


class LeadershipBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default="LEADERSHIP")
    heading = blocks.CharBlock(max_length=200, required=False, default="The two people who started it all")
    subtitle = blocks.TextBlock(required=False)
    members = blocks.ListBlock(LeadershipMemberBlock(), min_num=0, label="Team Members")

    class Meta:
        icon = "group"
        label = "Leadership Section"

# ─────────────────────────────────────────────────────────────────
# ACADEMIC FOUNDATION
# ─────────────────────────────────────────────────────────────────

class ResearchPartnerBlock(blocks.StructBlock):
    number = blocks.CharBlock(max_length=4, required=False, help_text="e.g. 01, 02, 03")
    name = blocks.CharBlock(max_length=200, required=False)
    description = blocks.TextBlock(required=False)
    tags = blocks.ListBlock(blocks.CharBlock(max_length=100), required=False, label="Tags (e.g. DEMENTIA & AGEING RESEARCH)")

    class Meta:
        icon = "doc-full"
        label = "Research Partner"


class AcademicFoundationBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default="ACADEMIC FOUNDATION")
    heading = blocks.CharBlock(max_length=200, required=False, default="Five Years Of Measurable Difference")
    body = blocks.TextBlock(required=False, help_text="Use \\n for paragraph breaks")
    ctas = blocks.ListBlock(CtaBlock(), min_num=0, label="CTA Buttons")
    partners = blocks.ListBlock(ResearchPartnerBlock(), min_num=0, label="Research Partners")

    class Meta:
        icon = "snippet"
        label = "Academic Foundation"

# ─────────────────────────────────────────────────────────────────
# OUR MISSION
# ─────────────────────────────────────────────────────────────────

class MissionFeatureBlock(blocks.StructBlock):
    icon = blocks.ChoiceBlock(
        choices=[
            ('movement', 'Movement'),
            ('mindfulness', 'Mindfulness'),
            ('music', 'Music'),
            ('training', 'Training'),
        ],
        default='movement',
        required=False,
    )
    title = blocks.CharBlock(max_length=100, required=False)
    description = blocks.TextBlock(required=False)

    class Meta:
        icon = "snippet"
        label = "Mission Feature Card"


class OurMissionBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default="OUR PURPOSE")
    heading = blocks.CharBlock(max_length=200, required=False, default="Our Mission")
    subtitle = blocks.TextBlock(required=False)
    body = blocks.TextBlock(required=False, help_text="Use \\n for paragraph breaks")
    image = ImageChooserBlock(required=False)
    features = blocks.ListBlock(MissionFeatureBlock(), min_num=0, label="Feature Cards (2x2 grid)")
    ctas = blocks.ListBlock(CtaBlock(), min_num=0, label="CTA Buttons")

    class Meta:
        icon = "doc-full"
        label = "Our Mission"

# ─────────────────────────────────────────────────────────────────
# WHAT DRIVES US
# ─────────────────────────────────────────────────────────────────

class DriveCardBlock(blocks.StructBlock):
    icon = blocks.ChoiceBlock(
        choices=[
            ('movement', 'Movement'),
            ('radio', 'Radio'),
            ('training', 'Training'),
        ],
        default='movement',
        required=False,
    )
    accent = blocks.ChoiceBlock(
        choices=[
            ('#c75c4d', 'Red/Orange'),
            ('#2f8080', 'Teal'),
            ('#283466', 'Navy'),
        ],
        default='#c75c4d',
        required=False,
        label="Card Accent Colour",
    )
    title = blocks.CharBlock(max_length=150, required=False)
    description = blocks.TextBlock(required=False)

    class Meta:
        icon = "snippet"
        label = "Drive Card"


class WhatDrivesUsBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default="WHAT DRIVES US")
    heading = blocks.CharBlock(max_length=200, required=False, default="Empowering Every Older Adult To Thrive")
    body = blocks.TextBlock(required=False, help_text="Use \\n for paragraph breaks")
    ctas = blocks.ListBlock(CtaBlock(), min_num=0, label="CTA Buttons")
    cards = blocks.ListBlock(DriveCardBlock(), min_num=0, max_num=3, label="Feature Cards (max 3)")

    class Meta:
        icon = "list-ul"
        label = "What Drives Us"

# ─────────────────────────────────────────────────────────────────
# GUIDING PRINCIPLES
# ─────────────────────────────────────────────────────────────────

class PrincipleCardBlock(blocks.StructBlock):
    icon = blocks.ChoiceBlock(
        choices=[
            ('leaf', 'Leaf'),
            ('handshake', 'Handshake'),
            ('heartHand', 'Heart Hand'),
            ('elevate', 'Elevate'),
            ('community', 'Community'),
        ],
        default='leaf',
        required=False,
    )
    title = blocks.CharBlock(max_length=150, required=False)
    description = blocks.TextBlock(required=False, help_text="Supports **bold** text")

    class Meta:
        icon = "snippet"
        label = "Principle Card"


class GuidingPrinciplesBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default="WHAT WE STAND FOR")
    heading = blocks.CharBlock(max_length=200, required=False, default="The five principles\\nthat guide everything we do")
    subtitle = blocks.TextBlock(required=False)
    cards = blocks.ListBlock(PrincipleCardBlock(), min_num=0, max_num=5, label="Principle Cards (max 5)")

    class Meta:
        icon = "grip"
        label = "Guiding Principles"

# ─────────────────────────────────────────────────────────────────
# OUR GALLERY
# ─────────────────────────────────────────────────────────────────

class GalleryImageBlock(blocks.StructBlock):
    image = ImageChooserBlock(required=False)

    class Meta:
        icon = "image"
        label = "Gallery Image"

class OurGalleryBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default="OUR GALLERY")
    heading = blocks.CharBlock(max_length=200, required=False, default="Building Memories Together")
    subtitle = blocks.TextBlock(required=False)
    images = blocks.ListBlock(GalleryImageBlock(), min_num=0, max_num=8, label="Gallery Images (exactly 8 recommended)")

    class Meta:
        icon = "picture"
        label = "Our Gallery"

# ─────────────────────────────────────────────────────────────────
# CONTACT SECTION
# ─────────────────────────────────────────────────────────────────

class ContactSectionBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default="COME AND SAY HELLO")
    heading = blocks.CharBlock(max_length=200, required=False, default="We'd love to hear from you")
    body = blocks.TextBlock(required=False)
    email = blocks.CharBlock(max_length=150, required=False, default="support@dancesing.online")
    response_time = blocks.CharBlock(max_length=150, required=False, default="We respond within 48 hours.")
    rating_text = blocks.CharBlock(max_length=150, required=False, default="4.9 out of 5 Stars from Reviews")
    form_heading = blocks.CharBlock(max_length=200, required=False, default="Get in touch with us")
    form_subtext = blocks.CharBlock(max_length=200, required=False, default="We respond within 48 hours")
    ctas = blocks.ListBlock(CtaBlock(), min_num=0, label="CTA Buttons")

    class Meta:
        icon = "mail"
        label = "Contact Section"


class ProgramCardBlock(blocks.StructBlock):
    tag      = blocks.CharBlock(max_length=50, required=False, help_text="e.g. CARE SECTOR")
    icon     = blocks.CharBlock(max_length=50, required=False, help_text="Icon name (e.g. heart, leaf, radio)")
    heading  = blocks.CharBlock(max_length=200, required=False)
    body     = blocks.TextBlock(required=False)
    image    = ImageChooserBlock(required=False)
    features = blocks.ListBlock(blocks.CharBlock(label="Feature"), required=False, help_text="Bullet points")
    cta      = CtaBlock(required=False)

    class Meta:
        icon  = "doc-quarter"
        label = "Program Card"


class CategoryTagBlock(blocks.StructBlock):
    label = blocks.CharBlock(max_length=50)
    icon  = blocks.CharBlock(max_length=50, required=False, help_text="Optional icon name")

    class Meta:
        icon = "tag"


class ProgramsGridBlock(blocks.StructBlock):
    tag           = blocks.CharBlock(max_length=50, required=False)
    heading       = blocks.CharBlock(max_length=200, required=False)
    subtitle      = blocks.TextBlock(required=False)
    category_tags = blocks.ListBlock(CategoryTagBlock(), required=False, help_text="Tags like 'Older adults', 'Care professionals'")
    background    = blocks.ChoiceBlock(choices=[("white", "White"), ("off-white", "Off-White"), ("dark", "Dark Navy")], default="white", required=False)
    cards         = blocks.ListBlock(ProgramCardBlock(), min_num=0, label="Program Cards")

    class Meta:
        icon  = "grip"
        label = "Section 2 – Programs Grid"


# ─────────────────────────────────────────────────────────────────
# SECTION 3 · CTA BANNER (dark strip)
# ─────────────────────────────────────────────────────────────────

class CtaBannerBlock(blocks.StructBlock):
    heading  = blocks.CharBlock(max_length=200, required=False)
    subtitle = blocks.TextBlock(required=False)
    image    = ImageChooserBlock(required=False, help_text="Video thumbnail / side image")
    background = blocks.ChoiceBlock(choices=[("white", "White"), ("off-white", "Off-White"), ("dark", "Dark Navy")], default="dark", required=False)
    ctas     = blocks.ListBlock(CtaBlock(), min_num=0, label="CTA Buttons")

    class Meta:
        icon  = "pick"
        label = "Section 3 – CTA Banner (dark bg)"


# ─────────────────────────────────────────────────────────────────
# SECTION 4 · ABOUT / EXCELLENCE (split + stats)
# ─────────────────────────────────────────────────────────────────

class AboutSplitBlock(blocks.StructBlock):
    tag           = blocks.CharBlock(max_length=50, required=False)
    heading       = blocks.CharBlock(max_length=200, required=False)
    body          = blocks.TextBlock(required=False)
    image         = ImageChooserBlock(required=False)
    image_position = blocks.ChoiceBlock(
        choices=[("right", "Image Right"), ("left", "Image Left")],
        default="right",
    )
    background = blocks.ChoiceBlock(choices=[("white", "White"), ("off-white", "Off-White"), ("dark", "Dark Navy")], default="white", required=False)
    stats = blocks.ListBlock(StatItemBlock(), min_num=0, label="Stats")
    ctas  = blocks.ListBlock(CtaBlock(), min_num=0, label="CTA Buttons")

    class Meta:
        icon  = "horizontalrule"
        label = "Section 4 – About Split"


# ─────────────────────────────────────────────────────────────────
# SECTION 5 · HOW IT WORKS (3-step photo cards)
# ─────────────────────────────────────────────────────────────────

class StepCardBlock(blocks.StructBlock):
    number      = blocks.CharBlock(max_length=10, help_text="e.g. 01, 02, 03", required=False)
    icon        = blocks.CharBlock(max_length=50, required=False, help_text="Icon name or SVG path")
    heading     = blocks.CharBlock(max_length=200, required=False)
    description = blocks.TextBlock(required=False)
    cta_label   = blocks.CharBlock(max_length=100, default="Learn More", required=False)
    cta_href    = blocks.CharBlock(max_length=255, default="#",          required=False)

    class Meta:
        icon  = "doc-quarter"
        label = "Step Card"


class StepsGridBlock(blocks.StructBlock):
    tag      = blocks.CharBlock(max_length=50, required=False)
    heading  = blocks.CharBlock(max_length=200, required=False)
    subtitle = blocks.TextBlock(required=False)
    background = blocks.ChoiceBlock(choices=[("white", "White"), ("off-white", "Off-White"), ("dark", "Dark Navy")], default="white", required=False)
    steps    = blocks.ListBlock(StepCardBlock(), min_num=0, max_num=99, label="Steps (exactly 3)")

    class Meta:
        icon  = "list-ol"
        label = "Section 5 – Steps Grid (How It Works)"


# ─────────────────────────────────────────────────────────────────
# SECTION 6 · FEATURES (alternating rows)
# ─────────────────────────────────────────────────────────────────

class FeatureRowBlock(blocks.StructBlock):
    tag     = blocks.CharBlock(max_length=50, required=False)
    heading = blocks.CharBlock(max_length=200, required=False)
    body    = blocks.TextBlock(required=False)
    image   = ImageChooserBlock(required=False)
    accent_color = blocks.ChoiceBlock(
        choices=[("red", "Red"), ("green", "Green"), ("blue", "Blue"), ("gold", "Gold")],
        default="gold",
        required=False
    )
    ctas    = blocks.ListBlock(CtaBlock(), min_num=0, label="CTA Buttons")

    class Meta:
        icon  = "doc-full"
        label = "Feature Row"


class FeatureListBlock(blocks.StructBlock):
    tag     = blocks.CharBlock(max_length=50, required=False)
    heading = blocks.CharBlock(max_length=200, required=False)
    background = blocks.ChoiceBlock(choices=[("white", "White"), ("off-white", "Off-White"), ("dark", "Dark Navy")], default="white", required=False)
    items   = blocks.ListBlock(FeatureRowBlock(), min_num=0, label="Feature Rows")

    class Meta:
        icon  = "list-ul"
        label = "Section 6 – Feature List (alternating)"


class FeaturesGridBlock(blocks.StructBlock):
    tag     = blocks.CharBlock(max_length=50, required=False)
    heading = blocks.CharBlock(max_length=200, required=False)
    background = blocks.ChoiceBlock(choices=[("white", "White"), ("off-white", "Off-White"), ("dark", "Dark Navy")], default="white", required=False)
    items   = blocks.ListBlock(FeatureRowBlock(), min_num=0, label="Feature Cards")

    class Meta:
        icon  = "grip"
        label = "Section 7 – Features Grid (colored borders)"


# ─────────────────────────────────────────────────────────────────
# SECTION 7 · PLANS (pricing cards, dark bg)
# ─────────────────────────────────────────────────────────────────

class PlanFeatureBlock(blocks.StructBlock):
    text = blocks.CharBlock(max_length=200, required=False)

    class Meta:
        icon  = "tick"
        label = "Plan Feature"


class PlanCardBlock(blocks.StructBlock):
    name     = blocks.CharBlock(max_length=100, required=False)
    price    = blocks.CharBlock(max_length=20, help_text="e.g. Free, $19", required=False)
    period   = blocks.CharBlock(max_length=50, required=False, help_text="e.g. per month")
    featured = blocks.BooleanBlock(required=False, default=False, help_text="Highlight as most popular")
    features = blocks.ListBlock(PlanFeatureBlock(), min_num=0, label="Features")
    cta      = CtaBlock()

    class Meta:
        icon  = "doc-quarter"
        label = "Plan Card"


class PlansGridBlock(blocks.StructBlock):
    tag      = blocks.CharBlock(max_length=50, required=False)
    heading  = blocks.CharBlock(max_length=200, required=False)
    subtitle = blocks.TextBlock(required=False)
    background = blocks.ChoiceBlock(choices=[("white", "White"), ("off-white", "Off-White"), ("dark", "Dark Navy")], default="dark", required=False)
    plans    = blocks.ListBlock(PlanCardBlock(), min_num=0, label="Plans")

    class Meta:
        icon  = "grip"
        label = "Section 7 – Plans Grid (dark bg)"

class TestimonialItemBlock(blocks.StructBlock):
    stars   = blocks.IntegerBlock(min_value=1, max_value=5, default=5)
    text    = blocks.TextBlock()
    author  = blocks.CharBlock(max_length=100)
    role    = blocks.CharBlock(max_length=100, required=False)
    image   = ImageChooserBlock(required=False)

    class Meta:
        icon = "user"

class TestimonialsBlock(blocks.StructBlock):
    tag      = blocks.CharBlock(max_length=50, required=False)
    heading  = blocks.CharBlock(max_length=200, required=False)
    background = blocks.ChoiceBlock(choices=[("white", "White"), ("off-white", "Off-White"), ("dark", "Dark Navy")], default="dark", required=False)
    items    = blocks.ListBlock(TestimonialItemBlock())

    class Meta:
        icon  = "group"
        label = "Section 8 – Testimonials"


# ─────────────────────────────────────────────────────────────────
# SECTION 8 · FAQ ACCORDION
# ─────────────────────────────────────────────────────────────────

class FaqItemBlock(blocks.StructBlock):
    question     = blocks.CharBlock(max_length=300, required=False)
    answer       = blocks.TextBlock(required=False)
    default_open = blocks.BooleanBlock(required=False, default=False)

    class Meta:
        icon  = "help"
        label = "FAQ Item"


class FaqAccordionBlock(blocks.StructBlock):
    tag            = blocks.CharBlock(max_length=50, required=False)
    heading        = blocks.CharBlock(max_length=200, required=False)
    subtitle       = blocks.TextBlock(required=False)
    background     = blocks.ChoiceBlock(choices=[("white", "White"), ("off-white", "Off-White"), ("dark", "Dark Navy")], default="white", required=False)
    items          = blocks.ListBlock(FaqItemBlock(), min_num=0, label="FAQ Items")
    footer_heading = blocks.CharBlock(max_length=200, required=False)
    footer_body    = blocks.TextBlock(required=False)
    footer_cta     = CtaBlock(required=False)

    class Meta:
        icon  = "help"
        label = "Section 8 – FAQ Accordion"


# ─────────────────────────────────────────────────────────────────
# SECTION 9 · NEWSLETTER
# ─────────────────────────────────────────────────────────────────

class NewsletterBlock(blocks.StructBlock):
    heading           = blocks.CharBlock(max_length=300, required=False)
    subtitle          = blocks.TextBlock(required=False)
    input_placeholder = blocks.CharBlock(max_length=100, default="Enter your email address", required=False)
    submit_label      = blocks.CharBlock(max_length=50,  default="Sign Up Free", required=False)
    background        = blocks.ChoiceBlock(choices=[("white", "White"), ("off-white", "Off-White"), ("dark", "Dark Navy")], default="dark", required=False)
    disclaimer        = blocks.TextBlock(required=False)

    class Meta:
        icon  = "mail"
        label = "Section 9 – Newsletter / CTA"


@register_setting
class NavigationSettings(BaseSiteSetting):
    logo = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    logo_text = models.CharField(max_length=50, default="DanceSing")
    
    links = StreamField([
        ('nav_link', blocks.StructBlock([
            ('label', blocks.CharBlock(max_length=100, required=False)),
            ('href', blocks.CharBlock(max_length=255, required=False)),
        ]))
    ], blank=True, use_json_field=True)
    
    cta_label = models.CharField(max_length=100, default="Book a Demo")
    cta_href = models.CharField(max_length=255, default="#cta")
    login_label = models.CharField(max_length=100, default="Login")
    login_href = models.CharField(max_length=255, default="#login")
    
    panels = [
        FieldPanel('logo'),
        FieldPanel('logo_text'),
        FieldPanel('links'),
        FieldPanel('cta_label'),
        FieldPanel('cta_href'),
        FieldPanel('login_label'),
        FieldPanel('login_href'),
    ]


# ─────────────────────────────────────────────────────────────────
# HOME PAGE MODEL
# ─────────────────────────────────────────────────────────────────

class HomePage(Page):
    body = StreamField(
        [
            ("hero",          HeroBlock()),
            ("programs_grid", ProgramsGridBlock()),
            ("cta_banner",    CtaBannerBlock()),
            ("about_split",   AboutSplitBlock()),
            ("steps_grid",    StepsGridBlock()),
            ("feature_list",  FeatureListBlock()),
            ("features_grid", FeaturesGridBlock()),
            ("testimonials",  TestimonialsBlock()),
            ("faq_accordion", FaqAccordionBlock()),
            ("newsletter",    NewsletterBlock()),
        ],
        use_json_field=True,
        blank=True,
        default=get_homepage_defaults
    )

    content_panels = Page.content_panels + [
        FieldPanel("body", classname="full"),
    ]

    class Meta:
        verbose_name = "Home Page"

# ─────────────────────────────────────────────────────────────────
# ABOUT PAGE MODEL
# ─────────────────────────────────────────────────────────────────

class AboutPage(Page):
    body = StreamField(
        [
            ("about_hero", AboutHeroBlock()),
            ("our_story", OurStoryBlock()),
            ("leadership", LeadershipBlock()),
            ("academic_foundation", AcademicFoundationBlock()),
            ("our_mission", OurMissionBlock()),
            ("what_drives_us", WhatDrivesUsBlock()),
            ("guiding_principles", GuidingPrinciplesBlock()),
            ("our_gallery", OurGalleryBlock()),
            ("contact_section", ContactSectionBlock()),
            ("feature_list", FeatureListBlock()),
            ("testimonials", TestimonialsBlock()),
            ("cta_banner", CtaBannerBlock()),
        ],
        use_json_field=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        FieldPanel("body", classname="full"),
    ]

    class Meta:
        verbose_name = "About Page"


# ─────────────────────────────────────────────────────────────────
# CARE PAGE
# ─────────────────────────────────────────────────────────────────

class CareFeatureCardBlock(blocks.StructBlock):
    icon = blocks.ChoiceBlock(
        choices=[
            ('music', 'Music'),
            ('movement', 'Movement'),
            ('mindfulness', 'Mindfulness'),
            ('training', 'Training'),
            ('radio', 'Radio / 24⁷7'),
            ('compliance', 'Compliance & Reporting'),
        ],
        default='music',
        required=False,
    )
    title = blocks.CharBlock(max_length=150, required=False)
    description = blocks.TextBlock(required=False)
    color = blocks.CharBlock(max_length=20, required=False, default='#964B4B', help_text="Hex color e.g. #964B4B")

    class Meta:
        icon = 'snippet'
        label = 'Feature Card'


class CareHeroBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default='Trusted by 200+ communities')
    heading = blocks.CharBlock(max_length=300, required=False, default='Wellness That Enriches\nEvery Care Community')
    body = blocks.TextBlock(required=False)
    image = ImageChooserBlock(required=False)
    features = blocks.ListBlock(CareFeatureCardBlock(), min_num=0, max_num=3, label='Floating Feature Cards (max 3)')
    ctas = blocks.ListBlock(CtaBlock(), min_num=0, label='CTA Buttons')

    class Meta:
        icon = 'image'
        label = 'Care Hero'


class CarePlatformCardBlock(blocks.StructBlock):
    title = blocks.CharBlock(max_length=150, required=False)
    description = blocks.TextBlock(required=False)
    image = ImageChooserBlock(required=False)

    class Meta:
        icon = 'image'
        label = 'Platform Card'


class CarePlatformBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default='MORE THAN A PROGRAMME')
    heading = blocks.CharBlock(max_length=200, required=False, default='The Platform - The Heartbeat Of Your Community')
    body = blocks.TextBlock(required=False, default='danceSing is more than a wellness tool. It is a central hub for community life — bringing people together, supporting staff, and creating an atmosphere your residents will genuinely look forward to every single day.')
    cards = blocks.ListBlock(CarePlatformCardBlock(), min_num=0, max_num=4, label='Platform Cards (max 4)')
    ctas = blocks.ListBlock(CtaBlock(), min_num=0, label='CTA Buttons')

    class Meta:
        icon = 'list-ul'
        label = 'Care Platform'


class CareEvidenceListItemBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=False, help_text="e.g. Improved wellbeing")
    text = blocks.TextBlock(required=False, help_text="e.g. Music, movement, and mindfulness...")

    class Meta:
        icon = 'tick'
        label = 'List Item'

class CareEvidenceCardBlock(blocks.StructBlock):
    icon = blocks.ChoiceBlock(choices=[
        ('patient', 'Patient'),
        ('staff', 'Staff'),
        ('leadership', 'Leadership'),
        ('community', 'Community'),
    ], default='patient', required=False)
    tag = blocks.CharBlock(required=False, help_text="e.g. PATIENT")
    title = blocks.CharBlock(required=False, help_text="e.g. Wellbeing, Belonging & Independence.")
    items = blocks.ListBlock(CareEvidenceListItemBlock(), min_num=0, label='List Items')

    class Meta:
        icon = 'doc-full'
        label = 'Evidence Card'

class CareEvidenceBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default='EVIDENCE')
    heading = blocks.CharBlock(max_length=200, required=False, default='Why Care Resource Works')
    body = blocks.TextBlock(required=False, default='Our platform is based on research and real-life experience. Through ongoing evaluation, our programmes have consistently demonstrated positive outcomes for resident wellbeing, engagement, and quality of life.')
    cards = blocks.ListBlock(CareEvidenceCardBlock(), min_num=0, max_num=4, label='Evidence Cards (max 4)')

    class Meta:
        icon = 'success'
        label = 'Care Evidence'

class CareOutcomesStatBlock(blocks.StructBlock):
    label = blocks.CharBlock(required=False, help_text="e.g. Depression in participants")
    value = blocks.CharBlock(required=False, help_text="e.g. 49%")
    trend = blocks.ChoiceBlock(choices=[('up', 'Up Arrow'), ('down', 'Down Arrow'), ('none', 'No Arrow')], default='down', required=False)

    class Meta:
        icon = 'arrow-up'
        label = 'Stat Item'

class CareOutcomesBlock(blocks.StructBlock):
    tag = blocks.CharBlock(required=False, default='UNIVERSITY VALIDATED OUTCOMES')
    heading = blocks.CharBlock(required=False, default='Proven, research-backed results in 12 weeks')
    body = blocks.TextBlock(required=False)
    partner_box_heading = blocks.CharBlock(required=False, default='University of Stirling & Partner Institutions')
    partner_box_text = blocks.CharBlock(required=False, default='Independently validated · 5+ year academic partnership')
    ctas = blocks.ListBlock(CtaBlock(), min_num=0, label='CTAs')
    
    stats_tag = blocks.CharBlock(required=False, default='PROVEN IMPACT DATA')
    stats = blocks.ListBlock(CareOutcomesStatBlock(), min_num=0, label='Stats Grid')

    class Meta:
        icon = 'table'
        label = 'Care Outcomes'

class CareConsultationStepBlock(blocks.StructBlock):
    number = blocks.CharBlock(required=False, help_text="e.g. 01")
    title = blocks.CharBlock(required=False)
    description = blocks.TextBlock(required=False)

    class Meta:
        icon = 'list-ol'
        label = 'Step'

class CareAudienceCardBlock(blocks.StructBlock):
    icon = blocks.ChoiceBlock(choices=[
        ('home-heart', 'Home with Heart'),
        ('hospital', 'Hospital'),
        ('clipboard-heart', 'Clipboard with Heart'),
    ], default='home-heart', required=False)
    title = blocks.CharBlock(required=False)
    description = blocks.TextBlock(required=False)

    class Meta:
        icon = 'group'
        label = 'Audience Card'

class CareConsultationBlock(blocks.StructBlock):
    tag = blocks.CharBlock(required=False, default='BOOK A CONSULTATION')
    heading = blocks.CharBlock(required=False, default="Let's talk about your care community")
    body = blocks.TextBlock(required=False)
    steps = blocks.ListBlock(CareConsultationStepBlock(), min_num=0, label='Steps')
    cta = CtaBlock()
    image = ImageChooserBlock(required=False)

    audience_heading = blocks.CharBlock(required=False, default="Who is this right for?")
    audience_body = blocks.TextBlock(required=False)
    audience_cards = blocks.ListBlock(CareAudienceCardBlock(), min_num=0, label='Audience Cards')
    audience_cta = CtaBlock(required=False)

    class Meta:
        icon = 'phone'
        label = 'Care Consultation'

class CareStatItemBlock(blocks.StructBlock):
    value = blocks.CharBlock(max_length=30, required=False, help_text='e.g. 200+, 49%')
    label = blocks.CharBlock(max_length=100, required=False)

    class Meta:
        icon = 'plus'
        label = 'Stat Item'


class CareStatsBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default='OUR IMPACT')
    heading = blocks.CharBlock(max_length=200, required=False, default='Measurable Results for Care Communities')
    subtitle = blocks.TextBlock(required=False)
    stats = blocks.ListBlock(CareStatItemBlock(), min_num=0, max_num=6, label='Statistics')

    class Meta:
        icon = 'snippet'
        label = 'Care Stats'


class CareFeaturesBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default='WHAT WE OFFER')
    heading = blocks.CharBlock(max_length=200, required=False, default='A Complete Wellness Solution for Care')
    subtitle = blocks.TextBlock(required=False)
    items = blocks.ListBlock(CareFeatureCardBlock(), min_num=0, max_num=6, label='Feature Cards (max 6)')

    class Meta:
        icon = 'grip'
        label = 'Care Features Grid'


class CareTestimonialItemBlock(blocks.StructBlock):
    badge = blocks.CharBlock(max_length=50, required=False, default='CARE')
    text = blocks.TextBlock()
    author = blocks.CharBlock(max_length=100)
    role = blocks.CharBlock(max_length=200, required=False)

    class Meta:
        icon = 'user'
        label = 'Testimonial'


class CareTestimonialsBlock(blocks.StructBlock):
    tag = blocks.CharBlock(max_length=100, required=False, default='WHAT CARE TEAMS SAY')
    heading = blocks.CharBlock(max_length=200, required=False, default='Heard directly from the communities we serve')
    subtitle = blocks.TextBlock(required=False, default="Real feedback from care managers, activities coordinators, researchers, and residents' families across the UK.")
    items = blocks.ListBlock(CareTestimonialItemBlock(), min_num=0, label='Testimonials')

    class Meta:
        icon = 'group'
        label = 'Care Testimonials'


class CareFaqItemBlock(blocks.StructBlock):
    question = blocks.CharBlock(required=False)
    answer   = blocks.TextBlock(required=False)

    class Meta:
        icon  = 'help'
        label = 'FAQ Item'


class CareFaqBlock(blocks.StructBlock):
    tag              = blocks.CharBlock(required=False, default='SUPPORT')
    heading          = blocks.CharBlock(required=False, default='Everything you need to know about Care')
    subtitle         = blocks.TextBlock(required=False)
    support_box_text = blocks.TextBlock(required=False, default="Can't find what you're looking for? Our team responds within 48 hours.")
    support_email    = blocks.EmailBlock(required=False)
    items            = blocks.ListBlock(CareFaqItemBlock(), min_num=0, label='FAQ Items')

    class Meta:
        icon  = 'help'
        label = 'Care FAQ'


class CareContactBlock(blocks.StructBlock):
    tag = blocks.CharBlock(required=False, default="GET STARTED")
    heading = blocks.CharBlock(required=False, default="Ready to bring danceSing Care to your community?")
    body = blocks.TextBlock(required=False, default="Book a free consultation and let's talk through how Music, Movement, and Mindfulness can transform daily life for your residents and team.")
    email_label = blocks.CharBlock(required=False, default="Email ID:")
    email_address = blocks.CharBlock(required=False, default="support@dancesing.online")
    response_label = blocks.CharBlock(required=False, default="Response time:")
    response_text = blocks.CharBlock(required=False, default="We respond within 48 hours.")
    rating_label = blocks.CharBlock(required=False, default="Rating:")
    rating_text = blocks.CharBlock(required=False, default="4.9 out of 5 Stars from Reviews")
    
    button_1_label = blocks.CharBlock(required=False, default="Book a Consultation →")
    button_1_link = blocks.CharBlock(required=False, default="#book")
    button_2_label = blocks.CharBlock(required=False, default="View Pricing")
    button_2_link = blocks.CharBlock(required=False, default="#pricing")
    
    form_heading = blocks.CharBlock(required=False, default="Get in touch with us")
    form_response_text = blocks.CharBlock(required=False, default="We respond within 48 hours")
    form_button_label = blocks.CharBlock(required=False, default="Send Message →")

    class Meta:
        icon = 'mail'
        label = 'Care Contact Form'


class CareCtaBlock(blocks.StructBlock):
    heading = blocks.CharBlock(max_length=200, required=False, default='Ready to Enrich Your Care Community?')
    subtitle = blocks.TextBlock(required=False)
    ctas = blocks.ListBlock(CtaBlock(), min_num=0, label='CTA Buttons')

    class Meta:
        icon = 'pick'
        label = 'Care CTA Banner'


class CarePage(Page):
    body = StreamField(
        [
            ('care_hero', CareHeroBlock()),
            ('care_platform', CarePlatformBlock()),
            ('care_evidence', CareEvidenceBlock()),
            ('care_outcomes', CareOutcomesBlock()),
            ('care_consultation', CareConsultationBlock()),
            ('care_stats', CareStatsBlock()),
            ('care_features', CareFeaturesBlock()),
            ('care_testimonials', CareTestimonialsBlock()),
            ('care_faq', CareFaqBlock()),
            ('care_contact', CareContactBlock()),
            ('care_cta', CareCtaBlock()),
            ('contact_section', ContactSectionBlock()),
            ('testimonials', TestimonialsBlock()),
            ('faq_accordion', FaqAccordionBlock()),
            ('newsletter', NewsletterBlock()),
        ],
        use_json_field=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        FieldPanel('body', classname='full'),
    ]

    class Meta:
        verbose_name = 'Care Page'
