import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Play } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";
import { BookOpen, Compass, Download, FileText, ShieldCheck, Target, Users } from "lucide-react";

export const Route = createFileRoute("/resources")({
  component: Resources,
  head: () => ({
    meta: [
      { title: "Resources for School Leaders — The Educational Review" },
      {
        name: "description",
        content:
          "Guides, toolkits, and workshop videos for instructional leadership, assessment reform, digital citizenship, and teacher development.",
      },
      { property: "og:title", content: "Resources for School Leaders" },
      { property: "og:description", content: "Downloadable guides, toolkits, and workshop videos." },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
});

// Each item's href points to a real file where one exists; items still on "#"
// don't have a matching PDF yet — swap in a real link whenever you have one.
const CATEGORIES = [
  {
    icon: Compass,
    name: "Instructional Leadership",
    items: [
      { label: "The Leader's Toolkit", href: "https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/leaders-toolkit.pdf" },
    ],
  },
  {
    icon: Users,
    name: "Teacher Professional Development",
    items: [
      { label: "Editorial — Volume 1", href: "https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/editorial.pdf" },
      { label: "Foreword — Volume 1", href: "https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/foreword.pdf" },
    ],
  },
];

const VISUAL_TOOLS = [
  {
    title: "A Case-Study Visual Timeline",
    desc: "A one-year, month-by-month journey from compliance-driven PD to a collaborative learning culture — with leadership focus, teacher experience, and evidence of progress mapped at each stage.",
    img: "/images/framework/case-study-timeline.png",
  },
  {
    title: "Professional Learning Dashboard",
    desc: "A sample live dashboard tracking teacher development participation, coaching conversations, PLC activity, and student learning impact against targets.",
    img: "/images/framework/professional-learning-dashboard.png",
  },
];

// Hand-picked videos from the channel.
// To add/remove one: paste the link, keep only the ID after "youtu.be/" or "v=".
const FEATURED_VIDEOS = [
  "nSaGKpQcAr4",
  "ydjjqApXAqo",
  "pi4PzE2HIQA",
  "5_18kZaWoY8",
  "kDAjUK-QXw4",
  "qUW890YxPpk",
  "39tXFSNcaBk",
  "4ACDZU45zMg",
  "8euC4YABHDE",
  "LXjNxT0KzUg",
  "YDyh4suGpu0",
  "8knsR2xWaPM",
  "NJSz7d58T5I",
  "lzpw8LAuHs4",
  "UOZJgU8CRtY",
  "ruXMak2U1Zg",
  "YeYTT4mF14w",
  "UAsa4HInrO4",
  "HBvCZTJrl5c",
  "7yI43LhXEA4",
];

// Shows a thumbnail + play button first so swipe gestures land on a plain
// <img> (draggable) instead of a live YouTube <iframe> (which captures touch
// events for itself). The real player only mounts after the user taps play.
function YoutubeFacade({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="Workshop video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative h-full w-full"
      aria-label="Play video"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}

function Resources() {
  return (
    <>
      <PageHeader
        eyebrow="Resource Library"
        title="Resources for School Leaders"
        lead="Practical guides, toolkits, and workshop videos to support instructional leadership, assessment reform, digital citizenship, and teacher development."
      />

      <section className="container-editorial mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map(({ icon: I, name, items }) => (
          <div key={name} className="flex flex-col rounded-2xl border border-border bg-card p-6 red-glow">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <I className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg leading-tight">{name}</h3>
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {items.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.href}
                    target={it.href !== "#" ? "_blank" : undefined}
                    rel={it.href !== "#" ? "noreferrer" : undefined}
                    className="flex items-center justify-between rounded-md border border-transparent px-3 py-2 text-foreground/85 hover:border-primary/40 hover:bg-ink hover:text-primary"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" /> {it.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {it.href === "#" ? "Coming soon" : "PDF"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Visual toolkit */}
      <section className="container-editorial mt-16">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Visual Toolkit
          </div>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">Dashboards & case studies</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {VISUAL_TOOLS.map((v) => (
            <div
              key={v.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 red-glow"
            >
              <div className="flex-1">
                <h3 className="font-serif text-xl">{v.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {v.desc}
                </p>
              </div>

              <a
                href={v.img}
                download
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop videos */}
      <section className="container-editorial mt-16 mb-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Workshops & Talks
            </div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Training and workshop clips</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              A few selected talks and workshop recordings — swipe or use the arrows to browse.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@EdWise.Politent"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            Visit channel
          </a>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {FEATURED_VIDEOS.map((videoId) => (
              <CarouselItem key={videoId} className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3">
                <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-card red-glow">
                  <YoutubeFacade videoId={videoId} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </section>
    </>
  );
}