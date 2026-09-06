import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Play } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "../components/site/PageHeader";
import {
  BookOpen,
  ClipboardCheck,
  Compass,
  Download,
  FileSearch,
  FileText,
  Heart,
  Landmark,
  Lightbulb,
  ShieldCheck,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/resources")({
  component: Resources,
  head: () => ({
    meta: [
      { title: "School Leadership Resource Centre — The Educational Review" },
      {
        name: "description",
        content:
          "A growing library of guides, toolkits, rubrics, and videos for school leaders — organised by School Leadership, Teacher Development, Classroom Observation, Assessment & Rubrics, NEP/NCF, Competency-Based Education, Parent Engagement, School Audit, and Professional Learning.",
      },
      {
        name: "keywords",
        content:
          "school leadership resources, teacher development, classroom observation tools, assessment rubrics, NEP 2020, NCF, competency based education, parent engagement, school audit",
      },
      { property: "og:title", content: "School Leadership Resource Centre" },
      { property: "og:description", content: "Downloadable guides, toolkits, rubrics, and workshop videos." },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
});

// Each item's href points to a real file where one exists; items still on "#"
// don't have a matching file yet — swap in a real link (e.g. a Supabase
// Storage URL, same pattern as the ones already below) whenever you have one.
const CATEGORIES = [
  {
    icon: Compass,
    name: "School Leadership",
    desc: "Frameworks and tools for principals and academic leaders steering school-wide improvement.",
    items: [
      { label: "The Leader's Toolkit", href: "/articles/leaders-toolkit", internal: true },
      { label: "Volume 1 — Full Issue", href: "/articles/volume-1", internal: true },
    ],
  },
  {
    icon: Users,
    name: "Teacher Development",
    desc: "Materials to design and run high-impact professional learning for teachers.",
    items: [
      { label: "Editorial — Volume 1", href: "/articles/editorial", internal: true },
      { label: "Professional Learning Communities Guide", href: "#" },
    ],
  },
  {
    icon: FileSearch,
    name: "Classroom Observation",
    desc: "Protocols and look-fors for developmental, non-evaluative classroom visits.",
    items: [
      { label: "The Leader's Toolkit — Coaching Questions", href: "/articles/leaders-toolkit", internal: true },
      { label: "Classroom Observation Protocol (guide)", href: "#" },
    ],
  },
  {
    icon: ClipboardCheck,
    name: "Assessment & Rubrics",
    desc: "Rubrics and formative-assessment tools aligned to competency-based education.",
    items: [{ label: "Competency-Based Rubric Template", href: "#" }],
  },
  {
    icon: Landmark,
    name: "NEP / NCF",
    desc: "Practical translations of NEP 2020 and NCF-SE 2023 into classroom decisions.",
    items: [{ label: "Foreword — Volume 1", href: "/articles/foreword", internal: true }],
  },
  {
    icon: Lightbulb,
    name: "Competency-Based Education",
    desc: "Lesson-design and planning resources for shifting from content coverage to competencies.",
    items: [{ label: "Competency-Based Lesson Planner", href: "#" }],
  },
  {
    icon: Heart,
    name: "Parent Engagement",
    desc: "Tools and talking points for building genuine partnership with families.",
    items: [{ label: "Parent Engagement Starter Guide", href: "#" }],
  },
  {
    icon: ShieldCheck,
    name: "School Audit",
    desc: "Self-assessment instruments for school readiness and improvement planning.",
    items: [{ label: "School Readiness Self-Assessment", href: "/images/framework/school-readiness-self-assessment.png" }],
  },
  {
    icon: BookOpen,
    name: "Professional Learning",
    desc: "Planning calendars and dashboards to run a year-long professional learning cycle.",
    items: [
      { label: "Annual PL Calendar", href: "/images/framework/annual-pl-calendar.png" },
      { label: "Professional Learning Dashboard", href: "/images/framework/professional-learning-dashboard.png" },
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
        eyebrow="School Leadership Resource Centre"
        title="Resources for School Leaders"
        lead="A growing library of guides, toolkits, rubrics, dashboards, and workshop videos — organised for principals, coordinators, teachers, and teacher educators."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/speaking"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            Invite for a Workshop
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Collaborate
          </Link>
        </div>
      </PageHeader>

      <section className="container-editorial mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map(({ icon: I, name, desc, items }) => (
          <div key={name} className="flex flex-col rounded-2xl border border-border bg-card p-6 red-glow">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                <I className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg leading-tight">{name}</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{desc}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {items.map((it) => {
                const isComingSoon = it.href === "#";
                const content = (
                  <>
                    <span className="flex items-center gap-2 text-left">
                      <FileText className="h-4 w-4 shrink-0 text-primary" /> {it.label}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {isComingSoon ? "Coming soon" : "Open"}
                    </span>
                  </>
                );
                const className =
                  "flex items-center justify-between gap-2 rounded-md border border-transparent px-3 py-2 text-foreground/85 hover:border-primary/40 hover:bg-ink hover:text-primary";
                if (isComingSoon) {
                  return (
                    <li key={it.label}>
                      <span aria-disabled="true" className={`${className} cursor-not-allowed opacity-60`}>
                        {content}
                      </span>
                    </li>
                  );
                }
                if (it.internal) {
                  return (
                    <li key={it.label}>
                      <Link to={it.href} className={className}>
                        {content}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li key={it.label}>
                    <a href={it.href} target="_blank" rel="noreferrer" className={className}>
                      {content}
                    </a>
                  </li>
                );
              })}
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
                Download Toolkit
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

      {/* CTA banner */}
      <section className="container-editorial mb-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-primary/30 bg-ink p-8 sm:flex-row sm:items-center md:p-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Need something built for your school?
            </div>
            <h3 className="mt-2 font-serif text-2xl md:text-3xl">
              Bring these tools into your staff room.
            </h3>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              to="/speaking"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              Invite for a Workshop
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
