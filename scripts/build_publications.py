#!/usr/bin/env python3
"""Convert the site's BibTeX bibliography into Jekyll-readable JSON."""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = ROOT / "bibliography" / "publications.bib"
DEFAULT_OUTPUT = ROOT / "_data" / "publications.json"
PDF_DIR = ROOT / "files" / "publications"


def extract_entries(source: str) -> list[tuple[str, str, str]]:
    entries = []
    cursor = 0

    while match := re.search(r"@([A-Za-z]+)\s*([\{\(])", source[cursor:]):
        entry_type = match.group(1).lower()
        opening = match.group(2)
        start = cursor + match.end()
        closing = "}" if opening == "{" else ")"
        depth = 1
        quoted = False
        escaped = False
        index = start

        while index < len(source) and depth:
            char = source[index]
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                quoted = not quoted
            elif not quoted:
                if char == opening:
                    depth += 1
                elif char == closing:
                    depth -= 1
            index += 1

        if depth:
            raise ValueError(f"Unclosed @{entry_type} entry")

        body = source[start : index - 1].strip()
        cursor = index

        if entry_type in {"comment", "preamble", "string"}:
            continue

        key, separator, fields = body.partition(",")
        if not separator:
            raise ValueError(f"Entry @{entry_type} is missing its fields")
        entries.append((entry_type, key.strip(), fields))

    return entries


def parse_fields(source: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    cursor = 0

    while cursor < len(source):
        while cursor < len(source) and (source[cursor].isspace() or source[cursor] == ","):
            cursor += 1
        if cursor >= len(source):
            break

        name_match = re.match(r"([A-Za-z][A-Za-z0-9_-]*)\s*=", source[cursor:])
        if not name_match:
            preview = source[cursor : cursor + 40].replace("\n", " ")
            raise ValueError(f"Could not parse BibTeX field near: {preview}")

        name = name_match.group(1).lower()
        cursor += name_match.end()
        while cursor < len(source) and source[cursor].isspace():
            cursor += 1

        if cursor >= len(source):
            raise ValueError(f"Field {name} has no value")

        if source[cursor] == "{":
            value, cursor = read_wrapped_value(source, cursor, "{", "}")
        elif source[cursor] == '"':
            value, cursor = read_wrapped_value(source, cursor, '"', '"')
        else:
            end = source.find(",", cursor)
            end = len(source) if end == -1 else end
            value = source[cursor:end].strip()
            cursor = end

        fields[name] = clean_bibtex(value)

    return fields


def read_wrapped_value(
    source: str, cursor: int, opening: str, closing: str
) -> tuple[str, int]:
    start = cursor + 1
    cursor = start
    depth = 1
    escaped = False

    while cursor < len(source):
        char = source[cursor]
        if escaped:
            escaped = False
        elif char == "\\":
            escaped = True
        elif opening == closing and char == closing:
            return source[start:cursor], cursor + 1
        elif opening != closing:
            if char == opening:
                depth += 1
            elif char == closing:
                depth -= 1
                if depth == 0:
                    return source[start:cursor], cursor + 1
        cursor += 1

    raise ValueError("Unclosed BibTeX field value")


def clean_bibtex(value: str) -> str:
    value = re.sub(r"\s+", " ", value.strip())
    value = value.replace("~", " ")
    value = re.sub(r"\\(?:textit|emph|textbf)\s*\{([^{}]*)\}", r"\1", value)
    value = value.replace(r"\&", "&").replace(r"\_", "_").replace(r"\%", "%")
    value = value.replace("{", "").replace("}", "")

    accent_marks = {
        "'": "\N{COMBINING ACUTE ACCENT}",
        "`": "\N{COMBINING GRAVE ACCENT}",
        '"': "\N{COMBINING DIAERESIS}",
        "^": "\N{COMBINING CIRCUMFLEX ACCENT}",
        "~": "\N{COMBINING TILDE}",
    }

    def replace_accent(match: re.Match[str]) -> str:
        return unicodedata.normalize(
            "NFC", match.group(2) + accent_marks[match.group(1)]
        )

    return re.sub(r"""\\(['"`^~])([A-Za-z])""", replace_accent, value)


def format_authors(value: str) -> list[str]:
    authors = []
    for author in re.split(r"\s+and\s+", value):
        if author.strip().lower() == "others":
            authors.append("et al.")
            continue
        parts = [part.strip() for part in author.split(",")]
        if len(parts) >= 2:
            author = " ".join(parts[1:] + [parts[0]])
        authors.append(re.sub(r"\s+", " ", author).strip())
    return [author for author in authors if author]


def build_publications(source: str) -> list[dict[str, object]]:
    publications = []

    for entry_type, key, raw_fields in extract_entries(source):
        fields = parse_fields(raw_fields)
        if "title" not in fields:
            raise ValueError(f"Entry {key} is missing a title")

        publication: dict[str, object] = {
            "id": key,
            "type": entry_type,
            "title": fields["title"],
            "authors": format_authors(fields.get("author", "")),
            "year": fields.get("year", ""),
            "venue": fields.get("journal", fields.get("booktitle", "")),
        }

        for name in ("volume", "number", "pages", "doi", "url"):
            if fields.get(name):
                publication[name] = fields[name]

        pdf_name = fields.get("pdf", "")
        if pdf_name:
            pdf_name = Path(pdf_name).name
            pdf_path = PDF_DIR / pdf_name
            publication["pdf_name"] = pdf_name
            publication["pdf_available"] = pdf_path.is_file()
            if pdf_path.is_file():
                publication["pdf"] = f"/files/publications/{pdf_name}"

        publications.append(publication)

    def sort_key(publication: dict[str, object]) -> int:
        year = str(publication.get("year", ""))
        numeric_year = int(year) if year.isdigit() else 0
        return -numeric_year

    return sorted(publications, key=sort_key)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    publications = build_publications(args.input.read_text(encoding="utf-8"))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(publications, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Generated {args.output} from {len(publications)} BibTeX entries.")


if __name__ == "__main__":
    main()
