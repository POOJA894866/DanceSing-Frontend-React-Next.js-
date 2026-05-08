import os, sys, uuid, django

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings.dev')
django.setup()

from home.models import TrainingPage

def main():
    page = TrainingPage.objects.first()
    if not page:
        print("No TrainingPage found."); return

    new_blocks = []
    found = False

    for b in page.body.get_prep_value():
        btype = b.get('type')
        if btype in ('contact_section',):
            print(f"Found old '{btype}' block, replacing with 'training_contact'...")
            new_blocks.append({"type": "training_contact", "value": {}, "id": str(uuid.uuid4())})
            found = True
        elif btype == 'training_contact':
            print("training_contact already present.")
            found = True
            new_blocks.append(b)
        else:
            new_blocks.append(b)

    if not found:
        # Insert after training_faq, or at the end before newsletter
        insert_at = len(new_blocks)
        for i, b in enumerate(new_blocks):
            if b.get('type') == 'training_faq':
                insert_at = i + 1
                break
        new_blocks.insert(insert_at, {"type": "training_contact", "value": {}, "id": str(uuid.uuid4())})
        print(f"Inserted training_contact at position {insert_at}.")

    page.body = new_blocks
    page.save_revision().publish()
    page.save()
    print("Done.")

if __name__ == '__main__':
    main()
