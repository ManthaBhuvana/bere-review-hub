import { useState } from "react";
import {
  Check,
  Facebook,
  Link2,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import { trackShare } from "@/lib/analytics";

const btn =
  "grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/80 transition-colors hover:border-primary hover:text-primary";

export function ShareButtons({ url, title, slug }: { url: string; title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    {
      method: "linkedin",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icon: Linkedin,
    },
    {
      method: "whatsapp",
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
      Icon: MessageCircle,
    },
    {
      method: "facebook",
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: Facebook,
    },
    {
      method: "x",
      label: "Share on X",
      href: `https://x.com/intent/post?text=${t}&url=${u}`,
      Icon: Twitter,
    },
    {
      method: "email",
      label: "Share by email",
      href: `mailto:?subject=${t}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
      Icon: Mail,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackShare({ method: "copy_link", slug });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const native = async () => {
    if (!navigator.share) return copy();
    try {
      await navigator.share({ title, url });
      trackShare({ method: "native", slug });
    } catch {
      /* cancelled */
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ method, label, href, Icon }) => (
        <a
          key={method}
          href={href}
          target={method === "email" ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={label}
          title={label}
          onClick={() => trackShare({ method, slug })}
          className={btn}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" title="Copy link" className={btn}>
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
      <button
        type="button"
        onClick={native}
        aria-label="More sharing options"
        title="More options"
        className={`${btn} sm:hidden`}
      >
        <Share2 className="h-4 w-4" />
      </button>
    </div>
  );
}
