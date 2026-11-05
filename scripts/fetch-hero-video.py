import re
import urllib.request
from pathlib import Path

PAGE = "https://www.pexels.com/video/aerial-night-view-of-city-lights-in-halifax-2252810/"
OUT = Path(__file__).resolve().parents[1] / "public" / "media" / "hero-bg.mp4"

req = urllib.request.Request(
    PAGE,
    headers={"User-Agent": "Mozilla/5.0 (compatible; FintiQBot/1.0)"},
)
html = urllib.request.urlopen(req, timeout=60).read().decode("utf-8", "ignore")
urls = sorted(
    set(re.findall(r"https://videos\.pexels\.com/video-files/[^\s\"'\\]+?\.mp4", html))
)
print("found", len(urls))
for u in urls:
    print(u)

# Prefer HD ~1280 or 1920, avoid huge 4k if possible
preferred = [u for u in urls if "1280" in u or "hd" in u.lower() or "720" in u]
if not preferred:
    preferred = [u for u in urls if "1920" in u or "1080" in u]
pick = preferred[0] if preferred else (urls[0] if urls else None)
if not pick:
    raise SystemExit("No MP4 URL found")

print("downloading", pick)
urllib.request.urlretrieve(pick, OUT)
print("saved", OUT, "bytes", OUT.stat().st_size)
