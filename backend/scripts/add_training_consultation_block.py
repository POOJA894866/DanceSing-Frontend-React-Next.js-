import os, sys, uuid, django

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings.dev')
django.setup()

from home.models import TrainingPage

def main():
    page = TrainingPage.objects.first()
    if not page:
        print("No TrainingPage found."); return

    has_block = any(b.get('type') == 'training_consultation' for b in page.body.get_prep_value())
    if has_block:
        print("training_consultation already present."); return

    new_blocks = page.body.get_prep_value()

    insert_at = len(new_blocks)
    for i, b in enumerate(new_blocks):
        if b.get('type') == 'training_outcomes':
            insert_at = i + 1
            break

    new_blocks.insert(insert_at, {"type": "training_consultation", "value": {}, "id": str(uuid.uuid4())})
    page.body = new_blocks
    page.save_revision().publish()
    page.save()
    print(f"Inserted training_consultation at position {insert_at}. Done.")

if __name__ == '__main__':
    main()
