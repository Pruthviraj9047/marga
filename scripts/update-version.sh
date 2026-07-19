#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

if ! command -v git &>/dev/null; then
  echo "ERROR: git is required but not found"
  exit 1
fi

VERSION="$(git -C "$ROOT" rev-parse --short HEAD 2>/dev/null || true)"

if [[ -z "$VERSION" ]]; then
  echo "ERROR: unable to determine git commit hash"
  exit 1
fi

echo "Bumping asset version to: $VERSION"

find "$ROOT" -name '*.html' -not -path '*/node_modules/*' | while read -r file; do
  if grep -qE '\.(js|css)\?v=' "$file"; then
    sed -E "s/\.(js|css)\?v=[^\"' \t&]*/.\1?v=$VERSION/g" "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    echo "  Updated: $file"
  fi
done

echo "Done. All assets now use v=$VERSION"
