import os

file_path = "c:\\Users\\Admin\\OneDrive\\Desktop\\DanceSing\\backend\\home\\models.py"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("(, required=False)", "(required=False)")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up syntax errors in models.py")
