# LLM workspace setup — paste-ready templates

> Set up a Claude Project, ChatGPT Custom GPT, or Gemini Gem once.
> After that, every new conversation already knows the repo — you
> just type your request. No more pasting context in chat.

---

## Files to upload (same set for all three platforms)

From this repo's `main` branch, download (or attach by GitHub URL):

1. `SYSTEM_PROMPT.md` — the rules.
2. `PROJECT_CONTEXT.md` — the deep reference.
3. `llms.txt` — high-level profile summary.
4. `LinkedIn-Export-Profile.pdf` *(optional)* — full experience source of truth.
5. `index.html` *(optional, large)* — only if you want the LLM to see the
   current rendered structure without fetching.

Raw URLs (handy for copy-paste):

- https://raw.githubusercontent.com/deepakinugala/portfolio/main/SYSTEM_PROMPT.md
- https://raw.githubusercontent.com/deepakinugala/portfolio/main/PROJECT_CONTEXT.md
- https://raw.githubusercontent.com/deepakinugala/portfolio/main/llms.txt

---

## Project instructions — paste this verbatim

This is the short pointer text. `SYSTEM_PROMPT.md` does the heavy lifting,
so the instructions slot can stay tight.

```
You're helping me maintain my portfolio site repo at
github.com/deepakinugala/portfolio.

Read SYSTEM_PROMPT.md and PROJECT_CONTEXT.md (uploaded as knowledge / project
files) before making any change. They contain the rules, stack, file layout,
identity snapshot, and sync conventions — treat them as authoritative.

Before changing anything, confirm what you'll do in 1–2 lines. Show diffs or
final file content — don't generate full file rewrites unless I ask. Never
commit to GitHub unless I explicitly say "commit and push".

If profile facts change in one file (index.html, llms.txt, or chatbot.js KB),
update the matching content in the other two. The LinkedIn export PDF in the
repo root is the source of truth for experience timeline.

If something isn't in those files, ask me — don't invent.
```

---

## Platform-specific setup

### Claude Project (claude.ai)

1. claude.ai → **Projects** → **+ New project** → name it "Portfolio Site".
2. Add to **Project knowledge** (drag-drop or click "Add content"):
   - `SYSTEM_PROMPT.md`
   - `PROJECT_CONTEXT.md`
   - `llms.txt`
   - `LinkedIn-Export-Profile.pdf` *(optional)*
3. Click **Set custom instructions** → paste the block above → **Save**.
4. Start a chat. The project keeps context across conversations.

### ChatGPT Custom GPT (chatgpt.com)

1. chatgpt.com → sidebar → **Explore GPTs** → **+ Create**.
2. **Configure** tab:
   - **Name**: "Portfolio Maintainer"
   - **Description**: "Helps maintain Deepak's portfolio site repo."
   - **Instructions**: paste the block above.
   - **Knowledge**: upload `SYSTEM_PROMPT.md`, `PROJECT_CONTEXT.md`, `llms.txt`,
     `LinkedIn-Export-Profile.pdf`.
   - **Capabilities**: enable **Web Browsing** (so it can fetch raw GitHub
     URLs) and **Code Interpreter** (PDF reading).
3. Top right → **Save** → "Only me".
4. Pin it to your sidebar for quick access.

### Gemini Gem (gemini.google.com)

1. gemini.google.com → **Gems** → **+ New Gem**.
2. **Name**: "Portfolio Maintainer".
3. **Instructions**: paste the block above.
4. **Knowledge**: upload `SYSTEM_PROMPT.md`, `PROJECT_CONTEXT.md`, `llms.txt`.
5. **Save**.

### Cursor / Aider / Continue / Windsurf / Cline

Nothing to set up. They auto-detect `AGENTS.md` in the repo root and follow
the trail to `SYSTEM_PROMPT.md` + `PROJECT_CONTEXT.md`.

---

## Day-to-day usage

After setup, a typical conversation looks like:

> **You:** Add a new case study for the FAB FGB–NBAD merger integration.
>
> **LLM:** *(already knows the layout convention, the experience entry,
> and the related outcomes from PROJECT_CONTEXT.md)*
> I'll create `case-studies/fab-merger.html` matching the existing pattern,
> add an entry to `case-studies/index.html`, and add a chatbot KB entry
> for "fab merger". Confirm?

No context-pasting required.

---

## Keeping the context files fresh

When something material changes (new role, new cert, new case study, new
constraint), update these files in the repo:

- New profile fact → `index.html` + `llms.txt` + `chatbot.js` KB *(sync rule)*.
- New constraint or convention → `SYSTEM_PROMPT.md` *(the rules)* +
  `PROJECT_CONTEXT.md` *(the reference)*.
- New file in the repo → file tree section in `PROJECT_CONTEXT.md`.
- New "declined" idea you don't want re-proposed → "Open work / declined"
  section in `PROJECT_CONTEXT.md`.

Then re-upload the changed files to the Claude Project / Custom GPT / Gem
(or, if your LLM has web browsing, it'll pick up the latest from GitHub
automatically).
