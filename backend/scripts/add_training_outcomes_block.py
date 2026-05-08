import os, sys, uuid, django

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings.dev')
django.setup()

from home.models import TrainingPage

def main():
    page = TrainingPage.objects.first()
    if not page:
        print("No TrainingPage found."); return

    has_block = any(b.get('type') == 'training_outcomes' for b in page.body.get_prep_value())
    if has_block:
        print("training_outcomes already present."); return

    new_blocks = page.body.get_prep_value()

    # Insert after training_support, or before cta_banner as fallback
    insert_at = len(new_blocks)  # default: append at end
    for i, b in enumerate(new_blocks):
        if b.get('type') == 'training_support':
            insert_at = i + 1
            break

    new_blocks.insert(insert_at, {"type": "training_outcomes", "value": {}, "id": str(uuid.uuid4())})
    page.body = new_blocks
    page.save_revision().publish()
    page.save()
    print(f"Inserted training_outcomes at position {insert_at}. Done.")

if __name__ == '__main__':
    main()
