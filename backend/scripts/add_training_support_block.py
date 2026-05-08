import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings.dev')
django.setup()

from home.models import TrainingPage
from wagtail.blocks import StreamValue

def main():
    page = TrainingPage.objects.first()
    if not page:
        print("No TrainingPage found.")
        return

    # Check if 'training_support' block already exists
    has_support = any(block.block_type == 'training_support' for block in page.body)
    
    if not has_support:
        print("Adding training_support block to TrainingPage...")
        
        import uuid
        new_blocks = page.body.get_prep_value()
        
        # Find index of training_journey to insert after
        idx = -1
        for i, b in enumerate(new_blocks):
            if b.get('type') == 'training_journey':
                idx = i
                break
                
        new_block = {"type": "training_support", "value": {}, "id": str(uuid.uuid4())}
        
        if idx != -1:
            new_blocks.insert(idx + 1, new_block)
            print("Inserted training_support after training_journey.")
        else:
            new_blocks.append(new_block)
            print("Appended training_support at the end.")

        # Assign raw JSON-like list to body, Wagtail will convert it
        page.body = new_blocks
        
        page.save_revision().publish()
        page.save()
        print("TrainingPage updated successfully.")
    else:
        print("training_support block already exists on TrainingPage.")

if __name__ == '__main__':
    main()
