# QA Engineer Portfolio — Ganesh Guda

A modern, responsive personal portfolio for a QA Engineer with 6+ months of experience in
**Manual Testing**, **API Testing**, and **Automation basics**. Built with plain
**HTML, CSS, and JavaScript** — no build step, no dependencies, just open `index.html`.

## Highlights

- Clean, minimal UI with professional blue / white / grey palette
- **Dark + light mode** (persisted via `localStorage`, respects system preference)
- Fully **mobile responsive**
- Sections: **Hero, About, Skills, Projects, Experience, Certifications, Contact**
- Animated skill bars, reveal-on-scroll, counters, code-card, smooth scrolling
- **Hire Me** and **Download Resume** CTAs
- Contact form with client-side validation (opens default mail client)
- Sticky nav with active-section highlight and mobile hamburger menu

## Project Structure

```
.
├── index.html          # Main page (all sections)
├── css/
│   └── style.css       # Theme tokens, layout, components, responsive rules
├── js/
│   └── script.js       # Theme toggle, reveal, counters, form, nav
├── assets/
│   └── resume.html     # Printable resume (Print → Save as PDF)
├── .gitignore
└── README.md
```

## Run Locally

Because this is pure static HTML/CSS/JS, you have a few options:

**Option 1 — Just open the file**

Double-click `index.html`. It will open in your browser.

**Option 2 — Run a local server (recommended for nicer URLs and caching)**

```bash
# Python 3
python -m http.server 8000

# Node (if you have it)
npx serve .
```

Then visit `http://localhost:8000`.

## Customize

- **Name, summary, stats** — edit the Hero and About sections in `index.html`.
- **Skills** — update `data-level="..."` attributes inside `<i>` bars or chip text in the Skills section.
- **Projects** — replace the three `.project-card` blocks with your own work.
- **Experience** — update the company, role, dates, and bullets in the Timeline.
- **Links** — replace the placeholder `https://github.com/` and `https://www.linkedin.com/` hrefs with your real profiles, and update the email in the Contact section and the hero's `mailto:` link.
- **Resume** — update `assets/resume.html` with your content, or drop your actual `resume.pdf` into `assets/` and change the `<a href="assets/resume.html">` to `<a href="assets/resume.pdf">` in the Hero CTA.
- **Colors** — tweak the CSS custom properties at the top of `css/style.css` (`--primary`, `--accent`, etc.).

## Deploy

This site works out of the box on any static host:

- **GitHub Pages** — push to a repo, enable Pages on the `main` branch.
- **Netlify / Vercel** — drag-and-drop the folder or connect the repo (no build command needed; publish directory is the repo root).
- **Cloudflare Pages** — framework preset: **None**; build command: *(empty)*; output directory: `/`.

## Tech

- HTML5, modern CSS (CSS variables, `color-mix`, Grid, Flex)
- Vanilla JS (ES6+, IntersectionObserver)
- Google Fonts: Inter + JetBrains Mono
- No frameworks, no bundler, no dependencies

## License

Personal portfolio — feel free to fork and customize for your own use.
