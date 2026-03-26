from __future__ import annotations

import posixpath
import re
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

MAPPINGS: list[tuple[str, str]] = [
    ("works\\technical-works\\_template.html", "assets\\images\\works\\technical-works\\work-001\\index.html"),
    ("works\\analytical-pieces\\_template.html", "assets\\images\\works\\analytical-pieces\\work-001\\index.html"),
    ("works\\experimental-forms\\_template.html", "assets\\images\\works\\experimental-forms\\work-001\\index.html"),
    ("works\\artistic-creations\\_template.html", "assets\\images\\works\\artistic-creations\\work-002\\index.html"),
    ("writing\\essays\\_template.html", "assets\\images\\writing\\essays\\essay-001\\index.html"),
    ("writing\\notes\\_template.html", "assets\\images\\writing\\notes\\note-001\\index.html"),
    ("projects\\research-systems\\_template.html", "assets\\images\\projects\\research-systems\\project-001\\index.html"),
    ("projects\\technical-builds\\_template.html", "assets\\images\\projects\\technical-builds\\project-001\\index.html"),
    ("projects\\personal-infrastructure\\_template.html", "assets\\images\\projects\\personal-infrastructure\\project-001\\index.html"),
    ("projects\\creative-development\\_template.html", "assets\\images\\projects\\creative-development\\project-001\\index.html"),
    ("archive\\discarded-paths\\_template.html", "archive\\discarded-paths\\index.html"),
    ("archive\\incomplete-fragments\\_template.html", "archive\\incomplete-fragments\\index.html"),
    ("archive\\process-snapshots\\_template.html", "archive\\process-snapshots\\index.html"),
]

ATTR_PATTERN = re.compile(
    r'(?P<prefix>\b(?:href|src)\s*=\s*)(?P<quote>["\'])(?P<value>[^"\']*)(?P=quote)',
    re.IGNORECASE,
)

SKIP_PREFIXES = (
    "/",
    "data:",
    "http:",
    "https:",
    "#",
    "javascript:",
    "mailto:",
    "tel:",
    "//",
)


def read_text(path: Path) -> str:
    with path.open("r", encoding="utf-8", newline="") as handle:
        return handle.read()


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="") as handle:
        handle.write(content)


def should_skip(value: str) -> bool:
    if not value:
        return True
    return value.lower().startswith(SKIP_PREFIXES)


def normalize_url(value: str, source_rel_posix: str) -> str:
    parts = urlsplit(value)
    if not parts.path:
        return value

    source_dir = posixpath.dirname(source_rel_posix)
    path_part = parts.path.replace("\\", "/")
    joined = posixpath.normpath(posixpath.join(source_dir, path_part))

    if joined in ("", "."):
        new_path = "/"
    elif joined == ".." or joined.startswith("../"):
        return value
    else:
        new_path = "/" + joined.lstrip("/")

    if parts.path.endswith("/") and not new_path.endswith("/"):
        new_path += "/"

    return urlunsplit(("", "", new_path, parts.query, parts.fragment))


def normalize_html(content: str, source_rel_posix: str) -> tuple[str, list[tuple[str, str]]]:
    examples: list[tuple[str, str]] = []

    def replacer(match: re.Match[str]) -> str:
        original_value = match.group("value")
        if should_skip(original_value):
            return match.group(0)

        normalized_value = normalize_url(original_value, source_rel_posix)
        if normalized_value != original_value:
            examples.append((original_value, normalized_value))

        return f"{match.group('prefix')}{match.group('quote')}{normalized_value}{match.group('quote')}"

    return ATTR_PATTERN.sub(replacer, content), examples


def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent
    changed_targets: list[str] = []
    all_examples: list[tuple[str, str, str]] = []

    for target_rel, source_rel in MAPPINGS:
        source_path = repo_root / source_rel
        target_path = repo_root / target_rel

        if not source_path.exists():
            raise FileNotFoundError(f"Missing source file: {source_path}")

        source_content = read_text(source_path)
        normalized_content, examples = normalize_html(source_content, source_rel.replace("\\", "/"))
        for before, after in examples:
            all_examples.append((before, after, target_rel))

        existing = read_text(target_path) if target_path.exists() else None
        if existing != normalized_content:
            write_text(target_path, normalized_content)
            changed_targets.append(target_rel)

    print(f"Processed {len(MAPPINGS)} mappings")
    print(f"Updated {len(changed_targets)} target files")
    for target in changed_targets:
        print(f"UPDATED {target}")

    unique_examples: list[tuple[str, str, str]] = []
    seen: set[tuple[str, str]] = set()
    for before, after, target in all_examples:
        key = (before, after)
        if key in seen:
            continue
        seen.add(key)
        unique_examples.append((before, after, target))

    print(f"Unique path normalizations: {len(unique_examples)}")
    for before, after, target in unique_examples[:20]:
        print(f"EXAMPLE [{target}] {before} -> {after}")


if __name__ == "__main__":
    main()
