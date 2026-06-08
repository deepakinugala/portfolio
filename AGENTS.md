# Agents entry point

This file is the standard agent-discovery target read by tools like Cursor,
Aider, Continue, Windsurf, Cline, and most LLM coding assistants.

## Read these first

1. **`SYSTEM_PROMPT.md`** — short rules + identity snapshot. Use this as the
   agent's system prompt.
2. **`PROJECT_CONTEXT.md`** — long reference: stack, file layout, conventions,
   open work, declined ideas.

Together they're sufficient context to act in this repo safely.

## TL;DR

- Static portfolio site, GitHub Pages, vanilla HTML/CSS/JS, no build step.
- Owner: Deepak Inugala — Senior SRE at G42, AI Infrastructure / LLMOps focus.
- When editing profile facts, sync `index.html`, `llms.txt`, and `chatbot.js`
  KB. Source of truth for experience: `LinkedIn-Export-Profile.pdf`.
- Never commit API keys. Never add a build step. Never add tracking.
- Default branch: `main` (GitHub Pages serves from here).
