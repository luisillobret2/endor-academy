#!/usr/bin/env python3
"""Extract content partials only for module pages that lack one.

The full `extract` command re-derives partials for EVERY module page, which
would overwrite hand-edited partials with the stale generated pages. This
wrapper extracts only the pages listed (the hand-written module pages that
have no content partial yet).

Usage:
    python3 scripts/extract-missing-partials.py
"""
import importlib.machinery
import importlib.util
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
# build-modules.py has a hyphen, so it cannot be imported by name.
_loader = importlib.machinery.SourceFileLoader(
    "build_modules", os.path.join(HERE, "build-modules.py")
)
_spec = importlib.util.spec_from_loader("build_modules", _loader)
build_modules = importlib.util.module_from_spec(_spec)
_loader.exec_module(build_modules)

ROOT = build_modules.ROOT
MODULES = build_modules.MODULES
CONTENT = build_modules.CONTENT


def main():
    extracted = 0
    for page in sorted(MODULES.rglob("*.html")):
        partial = CONTENT / page.relative_to(MODULES)
        if partial.exists():
            continue
        build_modules.write_partial(page)
        print(f"extracted {os.path.relpath(partial, ROOT)}")
        extracted += 1
    print(f"done: {extracted} partials extracted")
    if extracted == 0:
        print("all module pages already have partials")


if __name__ == "__main__":
    main()
