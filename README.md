# Eng. Boniface Sankwa — Portfolio Website

A complete, responsive personal portfolio website for **Eng. Boniface Sankwa**, Telecommunication Systems Engineer based in Mbeya, Tanzania. Built with plain HTML5, CSS3 and JavaScript (plus Bootstrap 5 and Font Awesome from CDN) — no build tools, backend, or database required. Ready to deploy on GitHub Pages.

## File structure

```
boniface-portfolio/
├── index.html                     # Main single-page site
├── css/
│   └── style.css                  # All site styling
├── js/
│   └── main.js                    # Navigation, animation, filtering, modal, form
├── assets/
│   ├── images/
│   │   ├── profile.jpg            # Profile photo (placeholder — replace)
│   │   ├── network-project.jpg    # Project 1 image (generated placeholder)
│   │   ├── pulmoxai.jpg           # Project 2 image (generated placeholder)
│   │   ├── wireless-network.jpg   # Project 3 image (generated placeholder)
│   │   └── fiber-optics.jpg       # Project 4 image (generated placeholder)
│   └── icons/
│       └── favicon.png
├── projects/
│   ├── network-design.html        # Project 1 detail page
│   ├── pulmoxai.html              # Project 2 detail page
│   ├── wireless-network.html      # Project 3 detail page
│   └── fiber-optics.html          # Project 4 detail page
├── documents/
│   └── Boniface_Sankwa_CV.pdf     # CV placeholder — replace with the real file
└── README.md
```

## Before you publish — things to replace

1. **Profile photo** — `assets/images/profile.jpg` currently holds a generated placeholder silhouette. Replace it with a real photo of the same file name and roughly square/portrait aspect ratio for the best fit.
2. **CV file** — `documents/Boniface_Sankwa_CV.pdf` currently holds a placeholder page with instructions. Replace it with the real CV, keeping the exact same file name so the "Download CV" button keeps working.
3. **Project images** — the four project images in `assets/images/` are generated abstract graphics matching the site's color palette (network topology, fiber light strands, wireless coverage, and an explainability heatmap motif). Swap in real screenshots or diagrams from each project whenever you have them, keeping the same file names.
4. **Certifications** — the Certifications section on the homepage uses placeholder cards ("Add issuer & date"). Edit these in `index.html` once certificates are completed; no certificate names or numbers were invented.
5. **Contact form → Formspree** — the contact form currently shows a message saying it isn't connected yet. To receive real messages:
   - Create a free form at [formspree.io](https://formspree.io) and copy your form endpoint (looks like `https://formspree.io/f/abcd1234`).
   - In `index.html`, find the `<form id="contact-form" ...>` tag and replace `action="https://formspree.io/f/your-form-id"` with your real endpoint.
   - In `js/main.js`, inside `initContactForm()`, the check for `"your-form-id"` can then be removed (it only exists to show a friendly notice until you connect a real form).

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `boniface-portfolio`).
2. Upload all files in this folder, keeping the folder structure exactly as-is.
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, choose the `main` branch and `/root` folder, then save.
5. GitHub will publish the site at `https://<your-username>.github.io/<repository-name>/`.
6. Because every link and image path in this project is relative, the site will work correctly whether it's hosted at the root of a domain or inside a repository subfolder.

## Updating content

Everything is in plain HTML/CSS/JS, so the site can be edited with any text editor:

- **Text content** (name, bio, experience, education, etc.) lives directly in `index.html`, organized by section with HTML comments.
- **Colors, fonts and spacing** are controlled by CSS custom properties at the top of `css/style.css` (`:root { ... }`) — change a value there to restyle the whole site consistently.
- **Behavior** (mobile menu, project filtering, the project quick-view modal, the animated background, scroll reveal animations) lives in `js/main.js`, with each feature in its own function.
- **Adding a new project**: duplicate one of the files in `projects/`, update its content, add a matching `<article class="project-card">` block in `index.html`, and add an entry to `PROJECT_DATA` in `js/main.js` so the "quick view" modal works for it too.

## Technology used

- HTML5, CSS3, vanilla JavaScript (no frameworks, no build step)
- [Bootstrap 5](https://getbootstrap.com/) (loaded from CDN, used lightly)
- [Font Awesome 6](https://fontawesome.com/) (loaded from CDN, for icons)
- [Google Fonts](https://fonts.google.com/): Space Grotesk, IBM Plex Sans, IBM Plex Mono

## Accessibility & performance notes

- Semantic HTML with a skip-to-content link, labeled navigation, and visible focus states.
- `prefers-reduced-motion` is respected for the animated background and scroll-reveal effects.
- Images use descriptive `alt` text and `loading="lazy"` where appropriate.
- All pages include SEO meta tags, Open Graph tags, and a favicon.

---

© 2026 Eng. Boniface Sankwa. All Rights Reserved.
