"""
Run with:  python3 manage.py shell < scripts/inject_beyond_care.py
"""
import json, uuid
from django.db import connection
from home.models import TrainingPage

page = TrainingPage.objects.live().first()
print(f"Page: {page.title} (id={page.pk})")

# Read raw JSON from the DB
with connection.cursor() as cur:
    cur.execute("SELECT body FROM home_trainingpage WHERE page_ptr_id = %s", [page.pk])
    raw_json = cur.fetchone()[0]

blocks = json.loads(raw_json)
types = [b["type"] for b in blocks]
print("Existing block types:", types)

if "training_beyond_care" in types:
    print("Block already present — skipping.")
else:
    new_block = {
        "type": "training_beyond_care",
        "id":   str(uuid.uuid4()),
        "value": {
            "section_tag": "TRAINING BEYOND CARE",
            "heading": "Currently built for care \u2014\nbut not limited to it",
            "body": (
                "Right now, danceSing Training is focused on care homes, hospital trusts, and "
                "adult social care teams \u2014 where the need is clearest and the impact is most "
                "immediate.\n\n"
                "But the programme \u2014 building confident facilitation of Music, Movement, and "
                "Mindfulness \u2014 is transferable. If you work in a setting that isn\u2019t a care home "
                "but could benefit from what we do, we want to hear from you. We\u2019re open to "
                "exploring training partnerships beyond the care sector, and happy to discuss "
                "what that could look like."
            ),
            "image": None,
            "currently_train_heading": "Who We Currently Train",
            "currently_train_items": [
                {"type": "item", "id": str(uuid.uuid4()), "value": {"icon": "building", "label": "Care homes & residential settings"}},
                {"type": "item", "id": str(uuid.uuid4()), "value": {"icon": "hospital", "label": "NHS trusts & hospital wards"}},
                {"type": "item", "id": str(uuid.uuid4()), "value": {"icon": "network",  "label": "Multi-site care organisations"}},
                {"type": "item", "id": str(uuid.uuid4()), "value": {"icon": "home",     "label": "Care homes & residential settings"}},
            ],
            "benefit_heading": "Who Else Could Benefit?",
            "benefit_subtitle": (
                "These are the settings we\u2019re open to discussing \u2014 if any of these sound like "
                "your organisation, reach out and let\u2019s explore what a training partnership "
                "could look like."
            ),
            "benefit_cards": [
                {"type": "item", "id": str(uuid.uuid4()), "value": {"icon": "briefcase",   "title": "Corporate & workplace wellbeing",   "description": "Organisations looking to train internal facilitators to lead wellness sessions for employees \u2014 movement, mindfulness, and creative connection in the workplace."}},
                {"type": "item", "id": str(uuid.uuid4()), "value": {"icon": "community",   "title": "Community & voluntary sector",       "description": "Charities, community centres, and voluntary organisations who want to equip their teams to run evidence-based wellbeing programmes for the people they serve."}},
                {"type": "item", "id": str(uuid.uuid4()), "value": {"icon": "education",   "title": "Education & training providers",     "description": "Colleges, universities, or CPD providers who want to incorporate danceSing facilitation training into their own health, social care, or wellbeing programmes."}},
                {"type": "item", "id": str(uuid.uuid4()), "value": {"icon": "fitness",     "title": "Fitness & Wellness Instructors",     "description": "Independent fitness professionals or wellness coaches who want to extend their practice to include specialist facilitation skills for older or mixed-age populations."}},
                {"type": "item", "id": str(uuid.uuid4()), "value": {"icon": "mindfulness", "title": "Mindfulness & Arts Therapist",       "description": "Practitioners in music therapy, mindfulness, or movement-based disciplines looking to formalise their approach with our evidence-based facilitation framework."}},
                {"type": "item", "id": str(uuid.uuid4()), "value": {"icon": "question",    "title": "Something else entirely",            "description": "If you see a fit between what we do and the work your organisation does, we\u2019re genuinely open to the conversation. The best partnerships often start with an unexpected question."}},
            ],
        }
    }

    # Insert after training_consultation
    new_blocks = []
    inserted = False
    for b in blocks:
        new_blocks.append(b)
        if b["type"] == "training_consultation" and not inserted:
            new_blocks.append(new_block)
            inserted = True
            print("Inserted after training_consultation")

    if not inserted:
        new_blocks.append(new_block)
        print("Appended at end (training_consultation not found)")

    updated_json = json.dumps(new_blocks, ensure_ascii=False)

    # Set the body field on the Django model object AND update DB
    # This ensures save_revision reads the updated body
    from django.db import models as django_models
    TrainingPage.objects.filter(pk=page.pk).update(body=updated_json)

    # Reload the page from DB so it has the updated body
    page.refresh_from_db()
    print("DB updated. Block types now:", [b.block_type for b in page.body])

    # Save revision + publish from the freshly loaded page
    rev = page.save_revision()
    rev.publish()
    print("Published successfully!")

# Final verification
with connection.cursor() as cur:
    cur.execute("SELECT body FROM home_trainingpage WHERE page_ptr_id = %s", [page.pk])
    final = json.loads(cur.fetchone()[0])
print("Final DB block types:", [b["type"] for b in final])
