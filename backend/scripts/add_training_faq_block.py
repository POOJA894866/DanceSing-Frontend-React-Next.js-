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
    found_faq = False
    
    for b in page.body.get_prep_value():
        if b.get('type') == 'faq_accordion':
            print("Found old 'faq_accordion' block, upgrading to 'training_faq'...")
            new_blocks.append({
                "type": "training_faq",
                "value": {},
                "id": str(uuid.uuid4())
            })
            found_faq = True
        elif b.get('type') == 'training_faq':
            print("training_faq already present.")
            found_faq = True
            new_blocks.append(b)
        else:
            new_blocks.append(b)

    # If it wasn't there at all, append it after training_testimonials
    if not found_faq:
        insert_at = len(new_blocks)
        for i, b in enumerate(new_blocks):
            if b.get('type') == 'training_testimonials':
                insert_at = i + 1
                break
        
        new_blocks.insert(insert_at, {
            "type": "training_faq",
            "value": {},
            "id": str(uuid.uuid4())
        })
        print(f"Inserted training_faq at position {insert_at}.")

    page.body = new_blocks
    page.save_revision().publish()
    page.save()
    print("Done.")

if __name__ == '__main__':
    main()
