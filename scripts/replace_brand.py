import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IGNORE_DIRS = {'.git', '.VSCodeCounter'}
TEXT_EXTS = {'.html', '.js', '.css', '.md', '.txt', '.csv', '.json', '.py', ''}
REPLACEMENTS = {
    'Alterven': 'Alterven',
    'alterven': 'alterven',
    'ALTERVEN': 'ALTERVEN',
    'alterven.dev': 'alterven.com',
    'Alterven.dev': 'Alterven.com',
}

changed_files = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    # skip ignored directories
    parts = Path(dirpath).parts
    if any(p in IGNORE_DIRS for p in parts):
        continue
    for fn in filenames:
        fp = Path(dirpath) / fn
        # attempt to read as text
        try:
            text = fp.read_text(encoding='utf-8')
        except Exception:
            continue
        new_text = text
        for a, b in REPLACEMENTS.items():
            new_text = new_text.replace(a, b)
        if new_text != text:
            fp.write_text(new_text, encoding='utf-8')
            changed_files.append(str(fp.relative_to(ROOT)))

print('Replaced in', len(changed_files), 'files')
for f in changed_files:
    print(f)
