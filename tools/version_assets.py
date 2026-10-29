#!/usr/bin/env python3
"""Stamp every stylesheet and script reference with a hash of its contents.

RUN THIS AFTER EVERY EDIT TO assets/css/* OR assets/js/*, before committing.

Why it exists: those files have stable names, and at one point they were served
with `Cache-Control: immutable` for a year. Returning visitors held a year-old
copy and no header change could reach them, because they had been told not to
ask. The policy in vercel.json is fixed now, but the hash stamp is what
guarantees a changed file gets a new URL, so an edit can never again be
invisible to someone who has been here before.

Fonts and vendor files keep plain immutable caching: they never change.

Safe to re-run: existing ?v= stamps are replaced, not appended.
"""
import hashlib
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
VERSIONED = ("assets/css/", "assets/js/")
LANGS = ("de", "ru", "ua")

digests = {}
for prefix in VERSIONED:
    for f in sorted((ROOT / prefix).glob("*")):
        if f.is_file():
            digests[f"{prefix}{f.name}"] = hashlib.sha256(f.read_bytes()).hexdigest()[:8]

print("asset versions:")
for k, v in digests.items():
    print(f"  {v}  {k}")

pattern = re.compile(
    r'((?:\.\./|/)?(?:' + "|".join(re.escape(p) for p in VERSIONED)
    + r')[A-Za-z0-9_.-]+\.(?:css|js))(\?v=[0-9a-f]+)?'
)

changed = 0
for html in sorted(ROOT.glob("*/*.html")):
    if html.parent.name not in LANGS:
        continue
    text = html.read_text(encoding="utf-8")

    def stamp(m):
        path = m.group(1)
        key = path.lstrip("./").lstrip("/")
        key = key[key.index("assets/"):] if "assets/" in key else key
        return f"{path}?v={digests[key]}" if key in digests else m.group(0)

    new = pattern.sub(stamp, text)
    if new != text:
        html.write_text(new, encoding="utf-8")
        changed += 1

print(f"\nstamped references in {changed} pages")
