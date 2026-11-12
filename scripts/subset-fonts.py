"""Build the self-hosted webfonts used by the site.

Source files (assets/fonts-source/) are the Google Fonts Latin subsets of
Newsreader and Jost (SIL Open Font License 1.1). This script:
  1. clamps each variable weight axis to the range the design actually uses,
  2. narrows Newsreader's optical-size axis to the sizes we render (10–72),
  3. subsets to Latin-1 plus typographic punctuation,
and writes compact woff2 files to src/fonts/. Run: python3 scripts/subset-fonts.py
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

SRC = Path("assets/fonts-source")
OUT = Path("src/fonts")
UNICODES = "U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2009,U+2013-2014,U+2018-201A,U+201C-201E,U+2022,U+2026,U+2032-2033,U+2039-203A,U+2044,U+20AC,U+2122,U+2190-2193,U+2212"

jobs = [
    # Roman: keep optical sizing (headlines rely on it), clamp weight to 300–500.
    ("nr-roman.woff2", "newsreader-roman.woff2", {"wght": (300, 500), "opsz": (10, 72)}),
    # Italic: used only for accents, so optical size is pinned (one axis fewer, much smaller file).
    ("nr-italic.woff2", "newsreader-italic.woff2", {"wght": (300, 500), "opsz": 36}),
    ("jost.woff2", "jost.woff2", {"wght": (400, 500)}),
]

OUT.mkdir(parents=True, exist_ok=True)
for src, dst, limits in jobs:
    font = TTFont(SRC / src)
    opts = subset.Options()
    opts.layout_features = ["kern", "liga", "clig", "calt", "lnum", "pnum", "tnum", "onum", "case", "frac"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=subset.parse_unicodes(UNICODES))
    sub.subset(font)
    axes = {a.axisTag: a.defaultValue for a in font["fvar"].axes}
    spec = {}
    for tag, v in limits.items():
        if isinstance(v, tuple):
            spec[tag] = instancer.AxisTriple(v[0], min(max(axes[tag], v[0]), v[1]), v[1])
        else:
            spec[tag] = v
    font = instancer.instantiateVariableFont(font, spec)
    font.flavor = "woff2"
    font.save(OUT / dst)
    print(f"{dst}: {(SRC / src).stat().st_size:,} -> {(OUT / dst).stat().st_size:,} bytes")
