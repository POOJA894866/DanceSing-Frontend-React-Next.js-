import os
import re

file_path = "c:\\Users\\Admin\\OneDrive\\Desktop\\DanceSing\\backend\\home\\models.py"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace blocks.CharBlock
def replace_charblock(match):
    args = match.group(1)
    if 'required=' not in args:
        return f"blocks.CharBlock({args}, required=False)"
    return match.group(0)

content = re.sub(r"blocks\.CharBlock\((.*?)\)", replace_charblock, content)

# Replace blocks.TextBlock
def replace_textblock(match):
    args = match.group(1)
    if 'required=' not in args:
        return f"blocks.TextBlock({args}, required=False)"
    return match.group(0)

content = re.sub(r"blocks\.TextBlock\((.*?)\)", replace_textblock, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated models.py to make fields optional.")
