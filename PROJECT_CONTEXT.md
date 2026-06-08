# Project Context — Deepak Inugala's Portfolio Site

> Drop this file into any LLM chat (ChatGPT, Gemini, Claude, Mistral, etc.)
> before asking it to make changes. It captures the project's intent, stack,
> structure, conventions, and current state so a fresh model can act safely.

---

## 1. Project overview

- **Owner**: Deepak Inugala (Abu Dhabi, UAE).
- **What this is**: A personal portfolio + resume site for job applications and
  recruiter sharing.
- **Live URL**: https://deepakinugala.github.io/portfolio/
- **GitHub repo**: https://github.com/deepakinugala/portfolio
- **Default branch**: `main` (production — GitHub Pages serves from here).

## 2. Goals & hard constraints

1. **Zero maintenance cost.** Free hosting only (GitHub Pages). No paid SaaS,
   no databases, no servers we have to run.
2. **AI / agent-era visible.** The site is built so LLM-powered recruiter tools
   and search agents can crawl, summarize, and answer questions about Deepak
   accurately. This is why `llms.txt`, JSON-LD `Person` schema, and a chatbot
   exist.
3. **Recruiter-friendly.** Clear hierarchy, role-tailored CV downloads,
   case-study deep-dives, fast load, mobile-first.
4. **No client-side API keys.** Never commit secrets. The optional LLM upgrade
   path uses a Cloudflare Worker proxy pattern; the key lives only on the
   Worker.
5. **No build step.** Plain HTML + CSS + vanilla JS. Anyone can clone and edit
   in any editor without Node, bundlers, or frameworks.

## 3. Tech stack

- **Hosting**: GitHub Pages (static).
- **Deploy**: GitHub Actions workflow auto-publishes on push to `main`.
- **Frontend**: Vanilla HTML5, CSS3 (custom properties for theming), JS (no
  framework). Fonts: Inter + JetBrains Mono from Google Fonts.
- **Theme**: Dark by default; light mode toggle persists in `localStorage`.
- **Chatbot**: Local in-browser knowledge base (keyword-scoring intent match)
  in `chatbot.js`. Optional remote LLM path via `window.AI_PROXY_URL`.
- **No analytics, no cookies, no tracking.**

## 4. Repository structure

```
/
├── index.html                  ← Main portfolio page (canonical experience data lives here)
├── styles.css                  ← All site styles (incl. chatbot + case-study)
├── script.js                   ← Theme toggle, nav, year, small UI helpers
├── chatbot.js                  ← In-browser chatbot KB + UI (zero-API-key by default)
├── llms.txt                    ← AI-readable profile summary (llms.txt convention)
├── robots.txt                  ← (if present) crawler hints
├── sitemap.xml                 ← (if present) SEO sitemap
├── README.md                   ← Repo readme, Cloudflare Worker upgrade docs
├── PROJECT_CONTEXT.md          ← THIS FILE — LLM/dev onboarding (deep reference)
├── SYSTEM_PROMPT.md            ← Short rules file — paste into LLM system/instructions slot
├── AGENTS.md                   ← Cross-LLM agent entry point (Cursor/Aider/Continue/Windsurf)
│
├── LinkedIn-Export-Profile.pdf ← Authoritative LinkedIn export (source of truth for experience)
│
├── case-studies/
│   ├── index.html              ← Case-study index
│   ├── vllm-serving.html       ← vLLM production serving on H100/H200
│   ├── langgraph-agents.html   ← LangGraph supervisor agent for SRE automation
│   └── air-gapped-llm.html     ← Sovereign air-gapped LLM Ops pipeline
│
├── resumes/                    ← 8 role-tailored CV PDFs
│   ├── LLMOps_MLOps_Engineer.pdf
│   ├── Senior_SRE_Engineer.pdf
│   ├── TeamLead_SRE_Engineer.pdf
│   ├── Senior_DevOps_Engineer.pdf
│   ├── Senior_DevSecOps_Engineer.pdf
│   ├── Senior_Cloud_Engineer.pdf
│   ├── Senior_Kubernetes_Administrator.pdf
│   └── Senior_HPC_Engineer.pdf
│
└── .github/workflows/          ← Pages deploy workflow
```

## 5. Owner identity (sync targets)

Whenever experience, certifications, or titles change, these THREE places
must stay consistent:

1. **`index.html`** — visible site (hero, about, experience, certifications,
   education, languages sections) AND the `<script type="application/ld+json">`
   `Person` schema block.
2. **`llms.txt`** — AI-readable profile (Markdown). Recruiter LLM tools may
   read this directly.
3. **`chatbot.js`** — the `KB` array (entries: intro, experience, current-role,
   banking, linux-scale, polaris, certs, education, languages, etc.).

If you change one, change all three. The LinkedIn export PDF in the repo root
(`LinkedIn-Export-Profile.pdf`) is the source of truth for dates and titles.

### Current canonical facts (as of latest LinkedIn sync)

- **Headline**: Senior SRE · AI Infrastructure · LLMOps / MLOps / AIOps.
- **Career length**: 11+ years.
- **Currently**: Senior Site Reliability Engineer at G42, leading a 6-person
  SRE team, since 03/2023.
- **Experience timeline** (6 roles, newest first):
  1. 03/2023 – Present · **G42** · Senior SRE (Abu Dhabi).
  2. 07/2019 – 03/2023 · **G42** · SRE (Abu Dhabi).
  3. 01/2018 – 07/2019 · **First Abu Dhabi Bank** · Cloud Engineer
     (FGB–NBAD post-merger IT integration).
  4. 05/2017 – 01/2018 · **HCL Technologies** · Technical Specialist
     (Abu Dhabi, Daman health insurance account).
  5. 08/2015 – 04/2017 · **HCL Infosystems** · Linux Engineer
     (Bengaluru, India · UIDAI / Aadhaar programme · 3,000+ RHEL/CentOS servers).
  6. 10/2012 – 06/2013 · **Polaris Consulting & Services** · Technical Support
     Engineer (Hyderabad, India · Videocon d2h).
- **Education**: MBA (10/2012 – 04/2015) and B.Tech (08/2008 – 06/2012),
  Jawaharlal Nehru Technological University.
- **Certifications** (10): AZ-104, AZ-305, AWS SAA, CKA (renewing),
  G42 Cloud Certified Engineer, RHCE, RHCSA, Cloudera Hadoop Administrator,
  GitOps Certified Fundamentals, Cloud Architecture: Design Decisions.
- **Languages**: English & Hindi (Full Professional), Telugu (Native).
- **Contact**: deepak.1990@hotmail.com · +971 50 494 5921 ·
  linkedin.com/in/deepak-inugala.
- **Open to**: Staff / Principal AI Platform & LLMOps roles, Senior SRE,
  Senior DevOps, Senior Infrastructure Engineer — globally.

> Note: `llms.txt` is sometimes maintained in a shorter, condensed form
> (10+ years, 3-role timeline) as a deliberate executive summary. Treat
> `index.html` + this file as the source of truth for the full timeline,
> and `llms.txt` as a high-level abstract. Do not auto-rewrite `llms.txt` to
> match index.html unless explicitly asked.

## 6. Technology themes the site emphasises

- **LLM serving**: vLLM, NVIDIA Triton, LiteLLM, AWQ/GPTQ quantization,
  tensor parallelism, continuous batching, prefix caching.
- **Agentic AI**: LangGraph (supervisor topology), LangChain, AutoGen,
  MCP (Model Context Protocol) tool servers, n8n, OpenClaw, NemoClaw.
- **RAG**: Qdrant, Weaviate, Open WebUI, HuggingFace embeddings.
- **MLOps**: MLflow, Kubeflow Pipelines, Argo Workflows, DVC, Feast,
  Seldon Core, Weights & Biases, Kyverno model admission.
- **GPU / HPC**: H100 / H200 / A100, MIG, DCGM, KubeRay, NCCL, InfiniBand, NVLink.
- **Kubernetes & cloud**: AKS, EKS, RKE2, Rancher, Helm, ArgoCD, Argo Rollouts,
  Kustomize, Azure, AWS, G42 Cloud, Harbor.
- **Air-gapped LLM Ops**: HF offline mode, Harbor mirrors, data diode transfer,
  AWQ, MinIO model registry, Kyverno admission enforcement.
- **Observability / security**: Prometheus, Grafana, Loki, Fluent Bit, Falco,
  Trivy, OPA Gatekeeper, Kyverno, Keycloak OIDC.
- **IaC**: Terraform, Ansible, GitLab CI/CD, GitOps, Python, Bash.

## 7. Highlighted outcomes (used across hero / case studies / chatbot)

- 7B–72B model deployment; AWQ 4-bit reduced 72B 144GB → 36GB VRAM.
- P99 TTFT < 200ms at 1,000+ concurrent vLLM requests on H100/H200.
- MLOps release cycles weeks → hours via Kubeflow + Argo + MLflow + ArgoCD.
- –40% overnight SRE on-call via LangGraph multi-agent automation.
- –50% operational toil via MCP tool servers.
- FAB FGB–NBAD merger: zero major incidents, –35% repeat incidents.
- HCL UIDAI: 3,000+ servers, on-prem→cloud migration < 2h downtime, 0% data loss.

## 8. Conventions & rules for edits

- **Don't introduce a build step.** No Webpack, Vite, Tailwind, React, etc.
- **Don't add tracking, analytics, or third-party JS** unless explicitly asked.
- **Never commit API keys.** If a remote LLM is wired in, it must be via the
  Cloudflare Worker proxy pattern documented in `README.md`.
- **Preserve dark + light themes.** Both must render correctly.
- **Mobile-first.** Test layouts at 360px width.
- **Don't add UI emojis.** The site uses CSS / SVG accents, not emoji decoration.
- **Case studies** follow a consistent layout: hero → problem → architecture
  (ASCII diagram in `<pre class="code">`) → implementation highlights →
  observability/quality gates → outcomes → back-CTA.
- **Keep `chatbot.js` KB entries short** (1–3 sentences). Long answers hurt
  the chat panel UX.
- **CV files** live in `/resumes/` (not repo root). Update the selector in
  `index.html` if you add or rename one.

## 9. Chatbot architecture

- Default: 100% client-side. The `KB` array in `chatbot.js` is scored against
  the user's query via simple keyword inclusion. No network calls. No keys.
- Optional upgrade: set `window.AI_PROXY_URL = "https://your-worker..."`
  before the chatbot script loads. The chatbot will POST
  `{messages: [{role, content}, ...]}` and expect `{reply: "..."}` back.
- Worker template lives in `README.md`. Recommended backend: Groq free tier
  (Llama 3.x) — keep the system prompt grounded in `llms.txt` content.

## 10. Deployment

- Push to `main` → GitHub Actions runs the Pages workflow → site live in
  ~30–60s at the GitHub Pages URL.
- No staging environment. Test locally by opening `index.html` in a browser
  (or `python3 -m http.server` from the repo root).

## 11. Open work / not-yet-implemented suggestions

Captured here so other LLMs don't re-propose the same items endlessly:

- [ ] Custom OpenGraph / Twitter social-card image (1200×630 PNG).
- [ ] Two more case studies: (a) MLOps pipeline end-to-end, (b) FAB FGB–NBAD
      merger integration.
- [ ] `sitemap.xml` + `robots.txt` for SEO discoverability.
- [ ] Print stylesheet so Cmd+P yields a clean one-page profile.
- [ ] Custom 404 page matching the site theme.
- [ ] Pinned GitHub repos / public artefacts section (if/when public OSS exists).
- [ ] Optional: LinkedIn recommendations / testimonials section.

Explicitly **declined / out of scope** (do not propose these again):

- Contact form (email + phone already public).
- Self-hosted analytics (operational overhead too high for a personal site).
- Arabic translation (not a UAE-focused job search).
- Migrating to a framework (React/Next/Astro) — violates the "no build" rule.

## 12. How to brief another LLM with this file

Paste roughly:

> "I'm working on my static portfolio site. Read PROJECT_CONTEXT.md first —
> it explains the stack, constraints, file layout, content sources, and
> conventions. Then help me with: <your request>. Don't introduce a build
> step, don't commit API keys, and keep `index.html`, `llms.txt`, and
> `chatbot.js` KB consistent if you change profile data."

That's enough for any capable model to act safely in the repo.

---

*Last updated: 2026-06-08. Owner: Deepak Inugala
(deepak.1990@hotmail.com).*
