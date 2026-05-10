"""Create or update the CalendarPage with default Book-a-Demo content.

Run from the backend dir:
    python manage.py shell < scripts/setup_calendar_page.py
or:
    python scripts/setup_calendar_page.py
"""
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings.dev")
django.setup()

from wagtail.models import Page  # noqa: E402
from home.models import CalendarPage, HomePage  # noqa: E402

DEFAULT_BODY = [
    ("calendar_hero", {
        "tag": "START YOUR JOURNEY",
        "heading": "Book Your Free 30-Minute Demo",
        "body": (
            "Pick a date that works for you. Our team will walk you through "
            "the platform, answer your questions, and help you find the right "
            "plan for your setting — no commitment, no pressure."
        ),
        "ctas": [
            {"label": "Explore our Programmes →", "href": "#programmes", "style": "outline-white"},
            {"label": "Talk to Our Team", "href": "#contact", "style": "text-arrow"},
        ],
    }),
    ("calendar_booking", {
        "dates_heading": "Select your dates",
        "dates_subtitle": "Pick any available slot from the calendar below",
        "legend_available": "Available",
        "legend_not_available": "Not Available",
        "legend_today": "Today",
        "timezone_text": "All times shown in UK time (GMT+1) · British Summer Time",
        "slot_section_subtitle": "Select a 30-minute window for your demo",
        "default_time_slots": [
            "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
            "14:00", "14:30", "15:00",
        ],
        "details_heading": "Enter your details",
        "details_subtitle": "We'll confirm your booking by email within a few minutes.",
        "date_confirmed_label": "DATE CONFIRMED",
        "time_confirmed_label": "UK TIME CONFIRMED",
        "required_note": "Fields marked * are required",
        "form_fields": [
            {"label": "Full Name",            "name": "full_name",    "placeholder": "Jane Smith",                 "field_type": "text",     "required": True,  "options": []},
            {"label": "Work email address",   "name": "email",        "placeholder": "jane@carehome.co.uk",        "field_type": "email",    "required": True,  "options": []},
            {"label": "Phone number",         "name": "phone",        "placeholder": "+44 7700 000000",            "field_type": "tel",      "required": False, "options": []},
            {"label": "Organisation name",    "name": "organisation", "placeholder": "Elmhurst Care Home",         "field_type": "text",     "required": True,  "options": []},
            {"label": "Which product are you interested in?", "name": "product", "placeholder": "Select a product...", "field_type": "select", "required": True,
             "options": ["danceSing Care", "danceSing Lifestyle", "danceSing Training", "Not sure yet"]},
            {"label": "Anything you'd like us to know?", "name": "message", "placeholder": "Tell us a bit about your setting or any specific questions...", "field_type": "textarea", "required": False, "options": []},
        ],
        "submit_label": "Request this slot →",
    }),
    ("calendar_stats", {
        "stats": [
            {"heading": "200+",     "label": "Care Communities"},
            {"heading": "4.9/5",    "label": "of 49 Reviews"},
            {"heading": "5+",       "label": "Years of Research"},
            {"heading": "30 mins",  "label": "Free, no obligation"},
        ],
    }),
]


def main():
    page = CalendarPage.objects.first()
    parent = HomePage.objects.first() or Page.objects.filter(id=1).first()

    if page is None:
        page = CalendarPage(title="Calendar", slug="calendar", live=True, body=DEFAULT_BODY)
        parent.add_child(instance=page)
        page.save_revision().publish()
        print(f"Created CalendarPage under parent {parent.title}")
    else:
        page.body = DEFAULT_BODY
        page.save_revision().publish()
        print(f"Updated CalendarPage (id={page.id}) with default content.")


if __name__ == "__main__":
    main()
