# Deepak Inugala — Portfolio

A free, open-source personal portfolio site focused on **AI / LLMOps / MLOps** work.
Static HTML + CSS — no build step, no dependencies, no hosting cost. Auto-deploys to
GitHub Pages via GitHub Actions on every push to `main`.

**Live site:** https://deepakinugala.github.io/portfolio/

## Stack

- Vanilla HTML / CSS / JS (no framework, no bundler, no lock files)
- Inter + JetBrains Mono via Google Fonts
- GitHub Pages for hosting (free)
- GitHub Actions for CI/CD (`.github/workflows/deploy.yml`)

## Structure

```
.
├── index.html                 # Main single-page portfolio
├── styles.css                 # All styling (dark/light themes)
├── script.js                  # Theme toggle + year stamp
├── llms.txt                   # Structured profile for AI/LLM recruiter tools
├── .nojekyll                  # Tell GitHub Pages not to run Jekyll
├── resumes/                   # Role-tailored CV PDFs
│   ├── LLMOps_MLOps_Engineer.pdf
│   ├── Senior_SRE_Engineer.pdf
│   ├── TeamLead_SRE_Engineer.pdf
│   ├── Senior_DevOps_Engineer.pdf
│   ├── Senior_DevSecOps_Engineer.pdf
│   ├── Senior_Cloud_Engineer.pdf
│   ├── Senior_Kubernetes_Administrator.pdf
│   └── Senior_HPC_Engineer.pdf
└── .github/workflows/deploy.yml
```

## AI / Agentic discoverability

The site is optimized to be discovered and parsed by AI-powered recruiting tools:

- `llms.txt` at the root — structured, LLM-friendly summary of the profile.
- Schema.org `Person` JSON-LD embedded in `<head>`.
- OpenGraph + Twitter meta tags for rich social previews.
- Semantic HTML landmarks for crawlers.

## Enable GitHub Pages (one-time)

1. Merge the portfolio changes into `main`.
2. Repo → **Settings** → **Pages** → **Source: GitHub Actions**.
3. Next push to `main` triggers the `Deploy static site to GitHub Pages` workflow.
4. Site publishes at `https://<username>.github.io/<repo>/`.

### Optional: custom domain

- Add a `CNAME` file at the repo root containing your domain (e.g. `deepakinugala.dev`).
- Add the DNS records shown in the Pages settings page.

## Local preview

No build needed. Just serve the folder:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Updating content

- Edit `index.html` for copy, experience bullets, and CV card descriptions.
- Edit `styles.css` for colors / spacing / type (CSS custom properties at the top).
- Drop new CV PDFs into `resumes/` and add a matching `<a class="cv-card">` in the
  `#cv` section of `index.html`.
- Update `llms.txt` whenever your role, outcomes, or certifications change — this is
  what AI agents and LLM-based recruiter tools will read.

## License

Content (bio, CVs) © Deepak Inugala. Site code released under the MIT License.
