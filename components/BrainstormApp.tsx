"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are a senior product-minded hackathon buddy helping a participant in "Built with Opus 4.7", a Claude Code hackathon hosted by Cerebral Valley and Anthropic (Apr 21–27, 2026).

Your job:
1. Help the user find a project worth shipping by the deadline.
2. Be direct and specific. Avoid generic ideas. Avoid sugarcoating.
3. When you propose ideas, propose THREE concrete projects, each as:
   • Title (short, specific)
   • One-sentence pitch
   • What's hard / interesting technically
   • What a 1-person MVP looks like in 3–5 days

If the user's message is vague, ask ONE focused clarifying question (background, time budget, interests, stack) before brainstorming. Don't ask more than one.

The model the user will actually build on is Claude, via Claude Code or the Anthropic API. Favour ideas that benefit from long context, agentic tools, or strong reasoning.

Keep responses under 350 words unless the user asks for depth.`;

type Model = "claude-opus-4-7" | "claude-sonnet-4-6" | "claude-haiku-4-5";

const MODELS: { id: Model; label: string; note: string }[] = [
  { id: "claude-sonnet-4-6", label: "Sonnet 4.6", note: "fast, cheap, great for brainstorming" },
  { id: "claude-opus-4-7", label: "Opus 4.7", note: "best reasoning — the hackathon model" },
  { id: "claude-haiku-4-5", label: "Haiku 4.5", note: "fastest, cheapest" },
];

function useLocalSession() {
  const [key, setKey] = useState("");
  const [remember, setRemember] = useState(false);
  useEffect(() => {
    try {
      const s = sessionStorage.getItem("anthropic_key");
      if (s) {
        setKey(s);
        setRemember(true);
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      if (remember && key) sessionStorage.setItem("anthropic_key", key);
      else sessionStorage.removeItem("anthropic_key");
    } catch {}
  }, [key, remember]);
  return { key, setKey, remember, setRemember };
}

export function BrainstormApp() {
  const { key, setKey, remember, setRemember } = useLocalSession();
  const [model, setModel] = useState<Model>("claude-sonnet-4-6");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<HTMLDivElement | null>(null);

  const canSend = key.trim().length > 20 && input.trim().length > 1 && !loading;

  async function send() {
    if (!canSend) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": key.trim(),
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model,
          max_tokens: 1200,
          system: SYSTEM,
          messages: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${text.slice(0, 400)}`);
      }
      const data = await res.json();
      const out: string =
        (data?.content ?? [])
          .filter((b: { type: string }) => b.type === "text")
          .map((b: { text: string }) => b.text)
          .join("\n") || "";
      setMessages([...history, { role: "assistant", content: out }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
      setTimeout(() => streamRef.current?.scrollTo({ top: 9e9, behavior: "smooth" }), 50);
    }
  }

  function reset() {
    setMessages([]);
    setError(null);
  }

  const keyMasked = useMemo(() => {
    if (!key) return "";
    if (key.length <= 12) return key;
    return key.slice(0, 7) + "…" + key.slice(-4);
  }, [key]);

  return (
    <div className="space-y-5">
      {/* Privacy banner */}
      <div className="rounded-xl ring-1 ring-accent/30 bg-accent-soft p-4 text-[13px] text-text-soft leading-relaxed">
        <div className="text-[11px] uppercase tracking-[0.15em] text-accent font-mono mb-1">
          your key stays on your machine
        </div>
        The browser POSTs directly to{" "}
        <code className="font-mono text-[12px]">api.anthropic.com</code> with{" "}
        <code className="font-mono text-[12px]">x-api-key</code>. No backend here. If
        &ldquo;remember for this tab&rdquo; is off, the key is in React state only
        and gone on reload. If on, it&rsquo;s in{" "}
        <code className="font-mono text-[12px]">sessionStorage</code> (cleared on tab
        close — never{" "}
        <code className="font-mono text-[12px]">localStorage</code>). Still: use a
        scoped-down dev key, not your prod one.
      </div>

      {/* Config */}
      <div className="rounded-2xl ring-1 ring-border bg-surface p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="text-[11px] uppercase tracking-[0.15em] text-muted font-mono">
              Anthropic API key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="sk-ant-api03-…"
              autoComplete="off"
              spellCheck={false}
              className="mt-1 w-full rounded-lg bg-surface-2 ring-1 ring-border focus:ring-accent/60
                         transition outline-none px-3 py-2 text-[14px] font-mono placeholder:text-muted"
            />
            {key && (
              <div className="mt-1 text-[11px] font-mono text-muted">
                loaded · {keyMasked}
              </div>
            )}
          </div>
          <div className="sm:w-64">
            <label className="text-[11px] uppercase tracking-[0.15em] text-muted font-mono">
              Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as Model)}
              className="mt-1 w-full rounded-lg bg-surface-2 ring-1 ring-border focus:ring-accent/60
                         transition outline-none px-3 py-2 text-[13px] cursor-pointer"
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} — {m.note}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 text-[12px]">
          <label className="inline-flex items-center gap-2 cursor-pointer text-text-soft">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-accent"
            />
            Remember for this tab
          </label>
          <a
            href="https://console.anthropic.com/settings/keys"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline font-mono text-[11px]"
          >
            get a key ↗
          </a>
        </div>
      </div>

      {/* Conversation */}
      <div
        ref={streamRef}
        className="rounded-2xl ring-1 ring-border bg-surface-2 p-4 max-h-[55vh] overflow-y-auto space-y-3"
      >
        {messages.length === 0 && (
          <div className="py-6 text-[13px] text-text-soft leading-relaxed">
            <div className="text-[11px] uppercase tracking-[0.15em] text-muted font-mono mb-2">
              example prompts
            </div>
            <ul className="space-y-1.5 list-none">
              {[
                "I'm a backend dev, 3 days to build, love CLIs. What should I make?",
                "Show me 3 agentic project ideas that showcase Opus 4.7's long context.",
                "I want something with MCP. What's underexplored?",
                "Help me pick — I'm torn between a code-review agent and a research agent.",
              ].map((p) => (
                <li key={p}>
                  <button
                    onClick={() => setInput(p)}
                    className="text-left text-accent hover:underline"
                  >
                    → {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={
              "rounded-xl px-4 py-3 text-[13.5px] leading-relaxed whitespace-pre-wrap " +
              (m.role === "user"
                ? "bg-accent-soft text-foreground ring-1 ring-accent/20"
                : "bg-surface ring-1 ring-border text-text-soft")
            }
          >
            <div className="text-[10px] uppercase tracking-[0.15em] mb-1 font-mono opacity-70">
              {m.role === "user" ? "you" : "claude"}
            </div>
            {m.content}
          </div>
        ))}

        {loading && (
          <div className="rounded-xl bg-surface ring-1 ring-border px-4 py-3 text-[13px] text-muted">
            <span className="inline-flex gap-1">
              <span className="animate-pulse">thinking</span>
              <span className="animate-pulse" style={{ animationDelay: "100ms" }}>.</span>
              <span className="animate-pulse" style={{ animationDelay: "250ms" }}>.</span>
              <span className="animate-pulse" style={{ animationDelay: "400ms" }}>.</span>
            </span>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-surface ring-1 ring-accent/40 px-4 py-3 text-[12px] font-mono text-accent whitespace-pre-wrap">
            {error}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              send();
            }
          }}
          rows={3}
          placeholder={
            key
              ? "What are you thinking of building? (⌘/Ctrl + Enter to send)"
              : "Paste your API key above to start."
          }
          className="flex-1 rounded-xl bg-surface ring-1 ring-border focus:ring-accent/60
                     transition outline-none px-4 py-3 text-[14px] placeholder:text-muted resize-none"
        />
        <div className="flex flex-col gap-2">
          <button
            onClick={send}
            disabled={!canSend}
            className="rounded-xl bg-accent text-background px-4 py-2 text-[13px] font-semibold
                       hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? "…" : "Send"}
          </button>
          {messages.length > 0 && (
            <button
              onClick={reset}
              className="rounded-xl bg-surface ring-1 ring-border hover:ring-border-hover
                         px-4 py-2 text-[12px] text-muted hover:text-foreground transition"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
