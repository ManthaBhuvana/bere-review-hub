import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-24 right-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground/80 shadow-lg hover:border-primary hover:text-primary sm:bottom-28 sm:right-6"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
