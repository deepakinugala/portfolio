/**
 * Portfolio chatbot — runs entirely in the browser.
 *
 * Default: answers from a curated local knowledge base sourced from the
 * llms.txt profile. Zero cost, zero keys, zero setup.
 *
 * Optional LLM upgrade path:
 *   window.AI_PROXY_URL = "https://your-worker.example.workers.dev/chat";
 * When set, messages are POSTed there as {messages: [{role, content}, ...]}
 * and the proxy returns {reply: "..."}. Your API key stays in the Worker —
 * never in this file. See README for a Cloudflare Worker template.
 */
(() => {
  const KB = [
    {
      id: "intro",
      q: ["who are you", "about you", "introduce", "who is deepak", "tell me about"],
      a: "I'm Deepak Inugala — an LLM & MLOps Engineer based in Abu Dhabi with 10+ years of infrastructure and platform engineering experience, currently at G42 building production LLM and agentic AI systems."
    },
    {
      id: "experience",
      q: ["years experience", "how long", "how many years"],
      a: "Over 10 years: Group 42 (G42) since 2019 as LLM & MLOps / Senior SRE / AI Platform, First Abu Dhabi Bank 2018–2019 as Cloud Engineer, and HCL InfoSystems 2015–2018 as Linux Engineer."
    },
    {
      id: "current-role",
      q: ["current role", "current job", "g42", "group 42", "where do you work"],
      a: "I'm at Group 42 (G42) in Abu Dhabi — LLM & MLOps Engineer, Senior SRE, AI Platform. I'm the sole technical authority for GPU infrastructure at client sites across Kazakhstan, Angola, Bahrain, with remote support for Maldives and Ethiopia."
    },
    {
      id: "ai-stack",
      q: ["ai", "llm", "agents", "agentic", "langgraph", "mcp", "vllm", "triton", "litellm", "rag", "langchain"],
      a: "My production AI stack: vLLM and NVIDIA Triton for serving (with AWQ/GPTQ quantization), LiteLLM as the OpenAI-compatible gateway, LangGraph for stateful multi-agent workflows, MCP (Model Context Protocol) servers for tool exposure, Qdrant for RAG, and n8n for workflow automation."
    },
    {
      id: "vllm",
      q: ["vllm", "serving", "inference", "h100", "h200", "tensor parallel", "awq", "quantization", "ttft"],
      a: "I run production vLLM on H100/H200 clusters — 7B to 72B models, AWQ 4-bit quantization (144GB → 36GB for 72B), tensor parallelism, continuous batching, prefix caching. P99 TTFT under 200 ms at 1,000+ concurrent. Deep dive: /case-studies/vllm-serving.html"
    },
    {
      id: "agents",
      q: ["agent", "langgraph", "multi-agent", "sre automation", "supervisor"],
      a: "I built a LangGraph supervisor-topology agent system for SRE automation — retrieval (Qdrant RAG), execution (kubectl / Ansible via MCP), validation (Prometheus verification), with human-in-the-loop gates. Reduced overnight on-call by 40%. Deep dive: /case-studies/langgraph-agents.html"
    },
    {
      id: "air-gapped",
      q: ["air gap", "airgap", "air-gapped", "sovereign", "offline", "govint", "classified", "huggingface offline"],
      a: "I designed the full air-gapped sovereign LLM pipeline: offline HuggingFace mirror → AWQ quantize + MMLU/HumanEval gates → data diode → Harbor + internal MinIO registry → isolated K8s with Kyverno admission enforcement. Deployed for GOVINT clients. Deep dive: /case-studies/air-gapped-llm.html"
    },
    {
      id: "mlops",
      q: ["mlops", "pipeline", "kubeflow", "argo", "mlflow", "seldon", "dvc", "training pipeline"],
      a: "End-to-end MLOps: Kubeflow Pipelines + Argo Workflows for DAGs, KubeRay for distributed fine-tuning, MLflow for tracking and model registry (stage promotion with approval gates), DVC for data versioning on MinIO, Seldon Core + Argo Rollouts for canary/blue-green with Prometheus analysis gates. Release cycles: weeks → hours."
    },
    {
      id: "kubernetes",
      q: ["kubernetes", "k8s", "aks", "eks", "rke2", "rancher", "helm", "argocd", "gitops"],
      a: "Deep Kubernetes experience — AKS, EKS, RKE2, Rancher. GitOps with ArgoCD (Argo Rollouts + Prometheus analysis), Helm, Kustomize. NVIDIA GPU Operator with MIG, DCGM Exporter, Longhorn storage, Harbor registry."
    },
    {
      id: "gpu-hpc",
      q: ["gpu", "hpc", "nvidia", "h100", "h200", "a100", "infiniband", "nccl", "mig"],
      a: "GPU / HPC: NVIDIA H100, H200, A100; MIG via GPU Operator MIG Manager; DCGM metrics; KubeRay clusters; CUDA/cuDNN stack management; InfiniBand + NVLink fabric; NCCL tuning for distributed training."
    },
    {
      id: "observability",
      q: ["observability", "monitoring", "prometheus", "grafana", "loki", "alerting", "dashboards"],
      a: "Observability stack: Prometheus (with custom recording rules on vLLM + DCGM metrics), Grafana (30+ dashboards covering golden signals), Loki + Fluent Bit for logs, Alertmanager rules for TTFT degradation, KV-cache exhaustion, GPU hang, and distributed tracing across multi-agent workflows."
    },
    {
      id: "security",
      q: ["security", "devsecops", "falco", "trivy", "opa", "kyverno", "keycloak", "zero trust"],
      a: "DevSecOps stack: Falco (runtime), Trivy (scanning), OPA Gatekeeper and Kyverno (policy), Keycloak OIDC, zero-trust NetworkPolicies. Kyverno admission policy enforces 'registered models only' for vLLM Deployments, closing the sideload audit gap."
    },
    {
      id: "cloud",
      q: ["cloud", "aws", "azure", "g42 cloud", "terraform", "ansible"],
      a: "Cloud: Azure (AKS, Key Vault, Defender), AWS (EKS, EC2, RDS, S3, Lambda), G42 Cloud. IaC with Terraform and Ansible; CI/CD on GitLab with GitOps delivery via ArgoCD."
    },
    {
      id: "linux-scale",
      q: ["linux", "datacenter", "servers", "rhel", "centos", "hcl", "3000 servers"],
      a: "Earlier in my career at HCL InfoSystems I managed 3,000+ physical Linux servers (RHEL, CentOS) across enterprise data centers — provisioning, Ansible configuration, hardware (iDRAC/iLO), firmware lifecycle. Led on-prem-to-cloud migration with under 2 hours downtime and 0% data loss."
    },
    {
      id: "banking",
      q: ["bank", "banking", "fab", "first abu dhabi", "merger", "cloudera", "hadoop"],
      a: "At First Abu Dhabi Bank (2018–2019) I completed the FGB–NBAD merger IT integration with zero major incidents, designed AWS architectures (EC2, EKS, RDS, S3, Lambda), administered Cloudera CDH clusters (Kerberos + Ranger), and led incident response reducing repeat incidents by 35%."
    },
    {
      id: "countries",
      q: ["countries", "international", "travel", "kazakhstan", "angola", "bahrain", "maldives", "ethiopia", "where delivered"],
      a: "International delivery across 6 countries: on-site in Kazakhstan, Angola, and Bahrain; remote support for Maldives and Ethiopia via secure VPN — plus my base in the UAE. I travelled about 50% of each month during peak delivery phases."
    },
    {
      id: "certs",
      q: ["certification", "certificate", "certified", "azure", "aws certified", "cka", "rhce"],
      a: "Certifications: Azure Administrator Associate (AZ-104, valid through 07/2027), Azure Solutions Architect Expert (AZ-305, valid through 07/2027), AWS Solutions Architect Associate, Certified Kubernetes Administrator (CKA, renewing), G42 Cloud Certified Engineer, Red Hat Certified Engineer (RHCE)."
    },
    {
      id: "education",
      q: ["education", "university", "degree", "mba", "btech", "jntu"],
      a: "MBA and B.Tech from Jawaharlal Nehru Technological University (B.Tech 2008–2012, MBA 2012–2015)."
    },
    {
      id: "languages",
      q: ["languages", "speak", "hindi", "telugu", "german", "english"],
      a: "Languages: English and Hindi (professional), Telugu (native), German (elementary)."
    },
    {
      id: "contact",
      q: ["contact", "email", "phone", "linkedin", "reach", "hire", "get in touch", "message"],
      a: "Reach me at deepak.1990@hotmail.com or +971 50 494 5921. LinkedIn: linkedin.com/in/deepak-inugala. I'm open to Staff / Principal AI Platform & LLMOps roles, Senior SRE Engineer, Senior DevOps Engineer, and Senior Infrastructure Engineer — globally."
    },
    {
      id: "cv",
      q: ["cv", "resume", "download", "pdf"],
      a: "I keep eight role-tailored CV variants — LLMOps/MLOps, Senior SRE, Team Lead SRE, Senior DevOps, Senior DevSecOps, Senior Cloud, Senior Kubernetes Administrator, and Senior HPC Engineer. Pick the one that matches the role and download it from the Resumes section."
    },
    {
      id: "outcomes",
      q: ["impact", "outcomes", "results", "achievements", "numbers", "metrics"],
      a: "Selected outcomes: P99 TTFT < 200 ms at 1k+ concurrent on vLLM/H100-H200; 72B quantized 144GB → 36GB VRAM via AWQ; MLOps release cycles weeks → hours; −40% overnight on-call via LangGraph agents; −50% operational toil via MCP tool servers; 35% reduction in repeat incidents at FAB."
    },
    {
      id: "location",
      q: ["location", "where", "based", "abu dhabi", "uae", "relocate"],
      a: "Based in Abu Dhabi, UAE. Open to relocation for the right role; equally comfortable with remote-first arrangements given my international delivery track record."
    },
    {
      id: "ai-eco",
      q: ["mcp", "model context protocol", "tools", "tool use", "n8n", "open webui", "claw", "openclaw", "nemoclaw"],
      a: "Agent ecosystem: MCP servers exposing Kubernetes API / GitLab / Prometheus / Jira as structured tools; n8n for workflow automation (StatefulSet with OAuth2-proxy sidecar); Open WebUI for internal chat UX; deployed OpenClaw and NemoClaw autonomous agent platforms."
    }
  ];

  const SUGGESTIONS = [
    "What AI & agent systems have you built?",
    "Tell me about your vLLM work",
    "Do you have air-gapped LLM experience?",
    "What MLOps tools do you use?",
    "How many years of experience?",
    "How can I contact you?"
  ];

  const GREETING =
    "Hi! I'm a chatbot trained on Deepak's profile. Ask me about his AI/LLMOps work, experience, certifications, or how to get in touch. Or pick a question below.";

  const FALLBACK =
    "I don't have a specific answer for that, but the portfolio covers it. Try asking about vLLM, LangGraph, MCP, MLOps, air-gapped LLM Ops, certifications, or contact. You can also download a role-tailored CV from the Resumes section.";

  function score(query, entry) {
    const q = query.toLowerCase();
    let s = 0;
    for (const kw of entry.q) {
      if (q.includes(kw)) s += kw.length;
    }
    return s;
  }

  function answerLocal(query) {
    let best = null;
    let bestScore = 0;
    for (const entry of KB) {
      const s = score(query, entry);
      if (s > bestScore) { bestScore = s; best = entry; }
    }
    if (!best || bestScore < 3) return FALLBACK;
    return best.a;
  }

  async function answerRemote(history) {
    const url = window.AI_PROXY_URL;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history })
      });
      if (!res.ok) throw new Error("proxy " + res.status);
      const data = await res.json();
      return data.reply || FALLBACK;
    } catch (e) {
      console.warn("AI proxy failed, falling back to local KB", e);
      return answerLocal(history[history.length - 1].content);
    }
  }

  function el(tag, attrs = {}, ...children) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const c of children) if (c) n.append(c);
    return n;
  }

  function mount() {
    const btn = el("button", {
      class: "chat-fab", "aria-label": "Open chatbot", type: "button"
    });
    btn.innerHTML = '<span aria-hidden="true">&#128172;</span><span class="chat-fab-text">Ask</span>';

    const panel = el("div", { class: "chat-panel", role: "dialog", "aria-label": "Portfolio chatbot", hidden: "" });
    const header = el("div", { class: "chat-header" },
      el("div", { class: "chat-title" },
        el("span", { class: "chat-dot", "aria-hidden": "true" }),
        el("strong", { text: "Ask about Deepak" })),
      el("button", { class: "chat-close", "aria-label": "Close chatbot", type: "button", text: "\u00d7" }));
    const body = el("div", { class: "chat-body" });
    const suggs = el("div", { class: "chat-suggs" });
    const form = el("form", { class: "chat-form" });
    const input = el("input", { type: "text", placeholder: "Type a question\u2026", "aria-label": "Type a question", autocomplete: "off" });
    const send = el("button", { class: "chat-send", type: "submit", "aria-label": "Send", text: "Send" });
    form.append(input, send);
    panel.append(header, body, suggs, form);

    document.body.append(btn, panel);

    const history = [];

    function addMsg(role, text) {
      const msg = el("div", { class: "chat-msg chat-" + role });
      msg.textContent = text;
      body.append(msg);
      body.scrollTop = body.scrollHeight;
    }

    function addLinks(text) {
      const msg = el("div", { class: "chat-msg chat-bot" });
      const html = text.replace(/(\/case-studies\/[a-z0-9\-]+\.html)/gi, '<a href="$1">$1</a>');
      msg.innerHTML = html;
      body.append(msg);
      body.scrollTop = body.scrollHeight;
    }

    function renderSuggs(list) {
      suggs.innerHTML = "";
      list.forEach(s => {
        const b = el("button", { class: "chat-sugg", type: "button", text: s });
        b.addEventListener("click", () => handle(s));
        suggs.append(b);
      });
    }

    async function handle(text) {
      const q = text.trim();
      if (!q) return;
      addMsg("user", q);
      history.push({ role: "user", content: q });
      suggs.innerHTML = "";
      let reply;
      if (typeof window.AI_PROXY_URL === "string" && window.AI_PROXY_URL) {
        addMsg("bot", "\u2026");
        const typing = body.lastChild;
        reply = await answerRemote(history);
        typing.remove();
      } else {
        reply = answerLocal(q);
      }
      history.push({ role: "assistant", content: reply });
      addLinks(reply);
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value;
      input.value = "";
      handle(v);
    });

    function open() {
      panel.hidden = false;
      btn.hidden = true;
      if (body.childElementCount === 0) {
        addMsg("bot", GREETING);
        renderSuggs(SUGGESTIONS);
      }
      setTimeout(() => input.focus(), 30);
    }
    function close() {
      panel.hidden = true;
      btn.hidden = false;
    }

    btn.addEventListener("click", open);
    header.querySelector(".chat-close").addEventListener("click", close);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !panel.hidden) close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
