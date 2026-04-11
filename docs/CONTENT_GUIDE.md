# Site Content Guide

This is a working cheat sheet for adding and updating content on this site.

The important big-picture rule is:

1. Put the content file in the right folder.
2. Fill in the YAML front matter at the top.
3. Add any supporting images or PDFs in the right asset folder.
4. Rebuild the site with `bundle exec jekyll build` when you want to check it locally.

This file lives in `docs/` and is excluded from the published site, so visitors will not see it.

## Ultra Quick Start

Use this section for the most common tasks.

### Add a new gallery album

1. Create a new file in `_galleries/`
2. Create a matching folder in `images/galleries/`
3. Drop images into that folder
4. Number filenames like `01_cover.jpg`, `02_site.jpg`, `03_team.jpg`
5. Optionally add captions in `_data/gallery_captions.yml`

Template:

```md
---
title: "Album Title"
excerpt: "Short album description."
gallery_dir: /images/galleries/album-slug/
cover_image: 01_cover.jpg
caption_key: album-slug
order: 1
---

Optional album intro text.
```

### Add a normal page

1. Create a new file in `_pages/`
2. Add front matter
3. Add page content
4. Add it to `_data/navigation.yml` if you want it in the top menu

Template:

```md
---
title: "Page Title"
permalink: /page-slug/
author_profile: true
---

Content here.
```

### Add a talk

1. Create a new file in `_talks/`
2. Add talk metadata
3. Add a short description below the front matter

Template:

```md
---
title: "Talk Title"
collection: talks
type: "Talk"
permalink: /talks/2026-04-11-talk-title
venue: "Venue Name"
date: 2026-04-11
location: "City, State, Country"
---

Talk description.
```

### Add a publication

1. Create a new file in `_publications/`
2. Add title, date, venue, and category
3. Add `paperurl` or other links if you have them

Template:

```md
---
title: "Paper Title"
collection: publications
category: manuscripts
permalink: /publication/2026-paper-title
excerpt: "Short summary."
date: 2026-04-11
venue: "Journal Name"
paperurl: "/files/paper.pdf"
citation: "Citation text."
---

Publication notes.
```

### Add a teaching item

1. Create a new file in `_teaching/`
2. Fill in course info
3. Add course content below the front matter

Template:

```md
---
title: "Course Title"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/fall-2026-course-title
venue: "Institution, Department"
date: 2026-09-01
term: "Fall 2026"
location: "City, Country"
---

## Course content
Description here.
```

### Update the top navigation

Edit `_data/navigation.yml`.

Example:

```yml
main:
  - title: "Page Title"
    url: /page-slug/
```

### Add captions to a gallery

Edit `_data/gallery_captions.yml`.

Example:

```yml
album-slug:
  01_cover.jpg: "Main field site."
  02_site.jpg: "Sampling location."
```

### Preview locally

From the repo root:

```zsh
bundle exec jekyll build
```

Or serve the site locally:

```zsh
bundle exec jekyll serve
```

## Site Map

Main content locations:

- `_pages/` for top-level pages like home, CV, research, talks, teaching, publications, and the gallery landing page
- `_galleries/` for photo album pages
- `_research/` for research/project entries
- `_talks/` for talks and presentations
- `_publications/` for publications
- `_teaching/` for teaching/course entries
- `_data/` for structured site data like navigation and gallery captions
- `images/` for images
- `files/` for PDFs and downloadable documents

Main site controls:

- `_config.yml` controls collections, defaults, and Jekyll behavior
- `_data/navigation.yml` controls the top navigation links

## Core Pattern

Most new content follows the same pattern:

1. Choose the correct folder.
2. Create a new `.md` or `.html` file there.
3. Add front matter between `---` lines.
4. Write the page body below the front matter.
5. Add optional metadata only if you need it.

Think of it as:

- basic layer: title, permalink, date, body text
- optional layer: images, captions, links, sorting, teaser text, custom metadata

## Quick Reference

Use these folders for each content type:

- New top-level page: `_pages/`
- New gallery album: `_galleries/` plus `images/galleries/<album-name>/`
- New research item: `_research/`
- New talk: `_talks/`
- New publication: `_publications/`
- New teaching item: `_teaching/`
- New downloadable PDF/file: `files/`
- New site image: `images/`

## Adding A Normal Page

Use `_pages/` for standalone pages.

Minimal example:

```md
---
title: "My New Page"
permalink: /my-new-page/
author_profile: true
---

Page content goes here.
```

Notes:

- If you want it in the top nav, also add it to `_data/navigation.yml`
- Most pages inherit the `single` layout automatically from `_config.yml`
- Archive-style pages like research/talks/publications often use `layout: archive`

## Adding A Navigation Link

Edit `_data/navigation.yml`.

Example:

```yml
main:
  - title: "Photo Gallery"
    url: /photo-gallery/
```

This only controls whether a link appears in the top menu. The page itself still has to exist.

## Adding A Gallery Album

This gallery system has two pieces:

1. album metadata file in `_galleries/`
2. image folder in `images/galleries/`

Example album file:

`_galleries/my-new-project.md`

```md
---
title: "My New Project"
excerpt: "Short description shown on the gallery landing page."
gallery_dir: /images/galleries/my-new-project/
cover_image: 01_cover.jpg
caption_key: my-new-project
order: 2
---

Optional intro text for the album page.
```

Matching image folder:

`images/galleries/my-new-project/`

Recommended image naming:

- `01_cover.jpg`
- `02_fieldsite.jpg`
- `03_team.jpg`

Why number the files:

- images are shown in alphabetical order
- numbering is the easiest way to control the click-through sequence

## Adding Gallery Captions

Captions live in `_data/gallery_captions.yml`.

Example:

```yml
my-new-project:
  01_cover.jpg: "Main field site at sunrise."
  02_fieldsite.jpg: "Preparing traps near the estuary."
  03_team.jpg: "Field crew after the final sampling run."
```

Rules:

- the top-level key should match the album `caption_key`
- each nested key should exactly match the image filename
- if no custom caption is found, the site falls back to a caption based on the filename

## Adding A Research Item

Use `_research/`.

Minimal example:

```md
---
title: "Project Title"
collection: research
excerpt: "Short summary shown in the research list."
---

Write the project description here.
```

Optional extras:

- add an image to the excerpt with inline HTML
- use `.html` instead of `.md` if you want more custom markup

Example excerpt with image:

```yml
excerpt: "Short summary<br/><img src='/images/example.jpg'>"
```

## Adding A Talk

Use `_talks/`.

Minimal example:

```md
---
title: "Talk Title"
collection: talks
type: "Talk"
permalink: /talks/2026-04-11-my-talk
venue: "University or Conference Name"
date: 2026-04-11
location: "City, State, Country"
---

Short description of the talk.
```

Useful optional fields:

- `type`
- `venue`
- `date`
- `location`

## Adding A Publication

Use `_publications/`.

Minimal example:

```md
---
title: "Paper Title"
collection: publications
category: manuscripts
permalink: /publication/2026-paper-title
excerpt: "Short publication summary."
date: 2026-04-11
venue: "Journal Name"
paperurl: "/files/my-paper.pdf"
citation: "Tobias, Z. (2026). Paper Title. Journal Name."
---

Optional description or notes.
```

Publication categories currently used in `_config.yml`:

- `manuscripts`
- `conferences`

Useful optional fields:

- `paperurl`
- `slidesurl`
- `bibtexurl`
- `citation`

Put local PDFs in `files/`.

## Adding A Teaching Item

Use `_teaching/`.

Minimal example:

```md
---
title: "Course Name"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/fall-2026-course-name
venue: "Institution, Department"
date: 2026-09-01
term: "Fall 2026"
location: "City, Country"
---

## Course content
Description here.

## Sample syllabus
Link or details here.
```

Useful optional fields:

- `type`
- `venue`
- `term`
- `location`

## Adding Images

General image guidance:

- site-wide images go in `images/`
- gallery images go in `images/galleries/<album-name>/`

Recommended habits:

- use descriptive filenames
- use numbered prefixes when order matters
- keep filenames simple: lowercase, hyphens or underscores, no spaces

## Adding PDFs And Other Files

Put downloadable files in `files/`.

Examples:

- CV PDF
- article PDF
- talk slides

Link to them with a site-relative path:

```md
[Download PDF](/files/my-document.pdf)
```

## Updating The Home Page

The current home page is `_pages/about.md` and uses:

```md
permalink: /
```

If you edit that file, you are editing the actual site homepage.

## When To Use Markdown vs HTML

Use `.md` when:

- you mostly want text, headings, links, and images
- you want the simplest editing experience

Use `.html` when:

- you need custom markup
- you want tighter control over layout inside that one content file

## Common Front Matter Fields

These show up a lot across the site:

- `title`
- `permalink`
- `layout`
- `author_profile`
- `collection`
- `excerpt`
- `date`
- `venue`
- `type`
- `location`
- `term`
- `order`
- `cover_image`
- `gallery_dir`
- `caption_key`

## Minimal First, Extras Later

A good workflow is:

1. Create the file with only the required fields.
2. Make sure it appears in the right place.
3. Add optional metadata after the basic version works.

Examples:

- first add a publication, then later add `paperurl` and `citation`
- first add a gallery album, then later add custom captions
- first add a research item, then later add a teaser image

## Local Preview

From the repo root:

```zsh
bundle exec jekyll build
```

If you want to serve locally:

```zsh
bundle exec jekyll serve
```

Because this repo now has `.ruby-version`, make sure you run commands from the repo root so `rbenv` uses the correct Ruby version.

## Handy Templates To Copy

### New page

```md
---
title: "Page Title"
permalink: /page-slug/
author_profile: true
---

Content here.
```

### New gallery album

```md
---
title: "Album Title"
excerpt: "Short album description."
gallery_dir: /images/galleries/album-slug/
cover_image: 01_cover.jpg
caption_key: album-slug
order: 1
---

Optional album intro text.
```

### New talk

```md
---
title: "Talk Title"
collection: talks
type: "Talk"
permalink: /talks/2026-04-11-talk-title
venue: "Venue Name"
date: 2026-04-11
location: "City, State, Country"
---

Talk description.
```

### New publication

```md
---
title: "Paper Title"
collection: publications
category: manuscripts
permalink: /publication/2026-paper-title
excerpt: "Short summary."
date: 2026-04-11
venue: "Journal Name"
paperurl: "/files/paper.pdf"
citation: "Citation text."
---

Publication notes.
```

### New teaching item

```md
---
title: "Course Title"
collection: teaching
type: "Undergraduate course"
permalink: /teaching/fall-2026-course-title
venue: "Institution, Department"
date: 2026-09-01
term: "Fall 2026"
location: "City, Country"
---

## Course content
Description here.
```
