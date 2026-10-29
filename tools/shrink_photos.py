#!/usr/bin/env python3
"""Bring every photo the site serves down to the size it is displayed at.

RUN THIS AFTER ADDING ANY NEW PHOTO to images/ or assets/images/.

Three things happen to each file:

  * EXIF orientation is baked into the pixels. Camera frames are often stored
    landscape with a flag saying "rotate"; browsers honour the flag, so the
    real displayed shape is portrait. Resizing without applying it first caps
    the wrong edge and the photo comes out far too small.
  * All EXIF is dropped. Originals carry GPS coordinates of the events they
    were shot at, which has no business being served to the public.
  * The short edge is capped at 900 and the long edge at 1600, never
    upscaling. The gallery grid is three columns in a ~1100px container, so a
    cell is around 350-370px; 900px of real pixels covers it past 2x and
    leaves the click-to-enlarge lightbox sharp.

Files are only rewritten when the result is meaningfully smaller, so this is
safe to re-run. It processes every JPEG regardless of whether a page links to
it, so nothing gets missed by a reference scan.

Requires: pip install pillow
"""
import os
import pathlib
from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
SHORT_MAX, LONG_MAX = 900, 1600
QUALITY = 82
MIN_SAVING = 0.10          # skip rewrites that buy less than this

SERVED = sorted(
    [p for p in (ROOT / "images").glob("*") if p.suffix.lower() in (".jpg", ".jpeg")]
    + [p for p in (ROOT / "assets" / "images").glob("*.jpg")]
)

print(f"{'file':34s} {'before':>10s} {'after':>10s}  {'dims':>13s}  saved")
before_total = after_total = touched = 0

for path in SERVED:
    before = path.stat().st_size
    # Read through fully and close: PIL keeps the handle open lazily, and on
    # Windows that blocks replacing the file we are about to rewrite.
    with Image.open(path) as src:
        img = ImageOps.exif_transpose(src).convert("RGB")

    short, long = min(img.size), max(img.size)
    scale = min(SHORT_MAX / short, LONG_MAX / long, 1.0)
    if scale < 1.0:
        img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)

    tmp = path.with_suffix(path.suffix + ".tmp")
    img.save(tmp, "JPEG", quality=QUALITY, optimize=True, progressive=True, subsampling=1)
    after = tmp.stat().st_size

    if after < before * (1 - MIN_SAVING):
        os.replace(tmp, path)
        touched += 1
        mark = f"-{(1 - after / before) * 100:.0f}%"
    else:
        tmp.unlink()
        after = before
        mark = "kept"

    before_total += before
    after_total += after
    print(f"{path.name:34s} {before/1024:9.1f}K {after/1024:9.1f}K  {img.width:5d}x{img.height:<5d}  {mark}")

print(f"\nrewrote {touched} of {len(SERVED)} files")
print(f"{before_total/1024/1024:.1f} MB -> {after_total/1024/1024:.1f} MB "
      f"({(1 - after_total/before_total)*100:.1f}% smaller)")
print("\nReminder: declared width/height attributes in the HTML must match the "
      "new pixel dimensions.")
