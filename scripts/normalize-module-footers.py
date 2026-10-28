#!/usr/bin/env python3
"""Normalize module footers after the content rewrites.

Two inconsistencies were introduced by the parallel rewrites:

1. The interactive "Mark as Complete" button (read by js/module.js and
   js/store.js to award XP) was dropped in favor of a static XP line.
2. Track-final modules should offer a route into certifications instead of
   a dead end.

This script restores (1) everywhere and adds (2) on track-final modules only,
for both content partials and the hand-written full pages that have no partial.

Usage:
    python3 scripts/normalize-module-footers.py [track ...]
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "content", "modules")
MODULES = os.path.join(ROOT, "modules")

FOOTER_OPEN = '<div class="module-footer">'
XP_RE = re.compile(r"&#11088;\s*(\d+)\s*XP")
XP_EARNED_RE = re.compile(r'<div class="module-xp-earned">.*?</div>', re.S)
BUTTON_RE = re.compile(r'<button class="mark-complete-btn"[^>]*>.*?</button>', re.S)
NAV_RE = re.compile(r'<div class="module-nav-buttons">(.*?)</div>', re.S)
DIV_TOKEN = re.compile(r"<div\b|</div>")


def find_footer(src):
    """Return (start, end) of the balanced module-footer div, or None."""
    start = src.find(FOOTER_OPEN)
    if start == -1:
        return None
    depth = 0
    for m in DIV_TOKEN.finditer(src, start):
        if m.group(0) == "</div>":
            depth -= 1
            if depth == 0:
                return start, m.end()
        else:
            depth += 1
    return None


def process(path: str, is_last: bool) -> str:
    with open(path, encoding="utf-8") as f:
        original = f.read()
    src = original

    span = find_footer(src)
    if not span:
        return "no-footer"

    start, end = span
    inner = src[start + len(FOOTER_OPEN): end - len("</div>")]

    m = XP_RE.search(src)
    xp = m.group(1) if m else "150"
    btn = f'<button class="mark-complete-btn" data-xp="{xp}">Mark as Complete</button>'

    if BUTTON_RE.search(inner):
        inner = BUTTON_RE.sub(btn, inner)
    elif XP_EARNED_RE.search(inner):
        inner = XP_EARNED_RE.sub(btn, inner)
    else:
        inner = btn + "\n                " + inner.lstrip()

    nav = NAV_RE.search(inner)
    if is_last and nav and "certifications.html" not in nav.group(1):
        inner = NAV_RE.sub(
            lambda n: n.group(0).replace(
                "</div>",
                '<a href="../../certifications.html" class="btn btn-primary">'
                'View Certifications &#8594;</a>\n                    </div>',
            ),
            inner,
        )

    src = src[:start] + FOOTER_OPEN + inner + "</div>" + src[end:]
    if src != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        return "updated"
    return "unchanged"


def main():
    only = sys.argv[1:]
    tracks = sorted(
        {
            d
            for base in (CONTENT, MODULES)
            if os.path.isdir(base)
            for d in os.listdir(base)
            if os.path.isdir(os.path.join(base, d))
        }
    )
    if only:
        tracks = [t for t in tracks if t in only]

    updated = 0
    for track in tracks:
        # Track-final detection spans partials and full pages, because some
        # tracks mix the two.
        names = set()
        for base in (CONTENT, MODULES):
            tdir = os.path.join(base, track)
            if os.path.isdir(tdir):
                names |= {f for f in os.listdir(tdir) if f.endswith(".html")}
        if not names:
            continue
        last = sorted(names)[-1]

        pdir = os.path.join(CONTENT, track)
        targets = []
        if os.path.isdir(pdir):
            targets += [
                os.path.join(pdir, n)
                for n in sorted(os.listdir(pdir))
                if n.endswith(".html")
            ]
        mdir = os.path.join(MODULES, track)
        if os.path.isdir(mdir):
            targets += [
                os.path.join(mdir, n)
                for n in sorted(os.listdir(mdir))
                if n.endswith(".html")
                and not os.path.exists(os.path.join(pdir, n))
            ]

        for path in targets:
            result = process(path, is_last=os.path.basename(path) == last)
            if result == "updated":
                updated += 1
            print(f"{os.path.relpath(path, ROOT)}: {result}")

    print(f"done: {updated} files updated")


if __name__ == "__main__":
    main()
