import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    {
      role: "bot",
      text: "Hello! I'm the Review's assistant. Ask me about articles, frameworks, or resources.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const t = input.trim();
    if (!t || loading) return;

    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ask-review", {
        body: { question: t },
      });

      if (error) throw error;

      setMessages((m) => [
        ...m,
        { role: "bot", text: data?.answer ?? "Sorry, I couldn't generate a response." },
      ]);
    } catch (err) {
      console.error("ask-review error:", err);
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Something went wrong reaching the assistant. Please try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="flex h-[70vh] max-h-130 w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border bg-ink px-4 py-3">
            <div>
              <div className="font-serif text-sm font-semibold text-foreground">
                Ask the Review
              </div>
              <div className="text-[10px] uppercase tracking-widest text-primary">
                Online · typically replies quickly
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-8 w-8 place-items-center rounded-full text-foreground/70 hover:bg-secondary hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-background p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "bot"
                    ? "card-ash mr-auto rounded-bl-sm"
                    : "ml-auto rounded-br-sm bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="card-ash mr-auto max-w-[85%] rounded-2xl rounded-bl-sm px-3 py-2 text-sm leading-relaxed text-muted-foreground">
                Thinking…
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-border bg-ink p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              disabled={loading}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={loading}
              className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-crimson-glow disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="group flex items-center gap-2 rounded-full border border-primary/40 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-xl transition-all hover:bg-crimson-glow hover:shadow-2xl"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Ask the Review</span>
        </button>
      )}
    </div>
  );
}