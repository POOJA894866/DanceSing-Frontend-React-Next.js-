import os
import re

file_path = "c:\\Users\\Admin\\OneDrive\\Desktop\\DanceSing\\backend\\home\\models.py"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the broken ChoiceBlock syntax
content = content.replace('choices=[("right", "Image Right", required=False), ("left", "Image Left")]', 'choices=[("right", "Image Right"), ("left", "Image Left")]')
content = content.replace('default="right",\n    ), required=False)', 'default="right", required=False\n    )')
content = content.replace('default="primary",\n    ), required=False)', 'default="primary", required=False\n    )')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed syntax errors in models.py")
