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

## Case studies

Deep-dive pages under `case-studies/`:

- `vllm-serving.html` — production vLLM on H100/H200.
- `langgraph-agents.html` — multi-agent SRE automation.
- `air-gapped-llm.html` — sovereign air-gapped LLM pipeline.

Add more by copying one of the existing files and linking it from
`case-studies/index.html` + the `#ai` section of the main `index.html`.

## Chatbot

A floating chat widget (`chatbot.js`) runs entirely in the browser. By default it
answers from a curated local knowledge base sourced from `llms.txt` — **zero cost,
zero API keys, zero setup**. To extend the knowledge base, edit the `KB` array
at the top of `chatbot.js`.

### Optional: upgrade to a real LLM (still free)

A static site on GitHub Pages cannot safely hold an API key (anything embedded
client-side is public). The safe pattern is a tiny **proxy** that holds the key
as a secret and forwards messages.

**Cheapest/free options for the proxy:**

| Option | Free tier | Notes |
|---|---|---|
| Cloudflare Workers | 100k req/day | Recommended; easy |
| Vercel Edge Functions | 100k req/month | Needs a Vercel account |
| Hugging Face Space | Free CPU Space | Slower, but dead simple |

**Cheapest/free LLM backends:**

| Provider | Free tier |
|---|---|
| Groq | Generous free tier on Llama 3 / Mixtral |
| Google AI Studio (Gemini) | Free tier on Gemini Flash |
| OpenRouter | Free tier on a few models |

**Cloudflare Worker template** (paste into a new Worker):

```js
export default {
  async fetch(req, env) {
    if (req.method !== "POST") return new Response("POST only", { status: 405 });
    const { messages } = await req.json();
    const sys = { role: "system", content:
      "You are a concise recruiter-facing assistant representing Deepak Inugala. " +
      "Answer only based on his profile (LLMOps/MLOps/SRE at G42). " +
      "If the question is unrelated, steer back to Deepak's work or his contact." };
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [sys, ...messages],
        max_tokens: 400
      })
    });
    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content ?? "";
    return Response.json({ reply }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    });
  }
};
```

Set the Worker secret (`wrangler secret put GROQ_API_KEY`), then tell the site
to use the proxy by adding one line to `index.html` just **before** the
`<script src="./chatbot.js">` line:

```html
<script>window.AI_PROXY_URL = "https://your-worker.example.workers.dev";</script>
```

No code changes needed on the static site — the chatbot auto-detects the
variable and switches to live LLM mode, falling back to the local KB if the
proxy is unreachable.

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
