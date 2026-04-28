import os
import re

file_path = "c:\\Users\\Admin\\OneDrive\\Desktop\\DanceSing\\backend\\home\\models.py"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace min_num=1 and min_num=3 with min_num=0
content = re.sub(r'min_num=[1-9]', 'min_num=0', content)
content = re.sub(r'max_num=[1-9]', 'max_num=99', content)

# Add required=False to ChoiceBlock
def replace_choiceblock(match):
    args = match.group(1)
    if 'required=' not in args:
        return f"blocks.ChoiceBlock({args}, required=False)"
    return match.group(0)

content = re.sub(r"blocks\.ChoiceBlock\((.*?)\)", replace_choiceblock, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Removed min_num constraints and added required=False to ChoiceBlock in models.py")
