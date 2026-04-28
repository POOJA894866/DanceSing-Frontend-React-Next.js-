import os

root_dir = r"c:\Users\Admin\OneDrive\Desktop\DanceSing\frontend\src\components"

for root, dirs, files in os.walk(root_dir):
    for f in files:
        if f.endswith(".jsx"):
            file_path = os.path.join(root, f)
            with open(file_path, 'r', encoding='utf-8') as file:
                lines = file.readlines()
            
            new_lines = [line for line in lines if 'styles/' not in line or 'import' not in line]
            
            with open(file_path, 'w', encoding='utf-8') as file:
                file.writelines(new_lines)
            print(f"Safely cleaned {f}")
