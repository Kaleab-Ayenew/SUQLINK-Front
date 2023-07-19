import man_temps
import os

def create_folder(f_name):
    current_dir = os.getcwd()
    new_path = os.path.join(current_dir, 'src', 'pages', f_name)
    os.mkdir(new_path)
    print(f'[-] Created folder {f_name}')
    return f_name

def create_page(pg_name):
    content = man_temps.new_page_temp(pg_name)
    folder_name = pg_name.lower()+'-page'
    create_folder(folder_name)
    with open(f'src/pages/{folder_name}/index.jsx', 'w') as f:
        f.write(content)
        f.close()
    print(f"[-] Created page {pg_name}.jsx in src/pages/{folder_name}")