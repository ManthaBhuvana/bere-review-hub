import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  BookOpen,
  Check,
  ClipboardCheck,
  Compass,
  Download,
  FileSearch,
  FileText,
  Heart,
  Landmark,
  LayoutDashboard,
  Lightbulb,
  Play,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHeader } from "../components/site/PageHeader";
import { SITE_NAME, YOUTUBE_URL } from "@/lib/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/resources")({
  component: Resources,

  head: () =>
    seo({
      title: `School Leadership Resource Centre — ${SITE_NAME}`,
      ogTitle: "School Leadership Resource Centre",
      description:
        "A growing professional resource library for school leaders, teachers, teacher educators, and policy leaders — guides, toolkits, dashboards, and workshop videos.",
      keywords:
        "school leadership resources, teacher professional development, teacher educator resources, NEP 2020, NCF-SE 2023, competency based education, policy to practice, instructional leadership",
      path: "/resources",
    }),
});

/* -------------------------------------------------------------------------- */
/* Resource Categories                                                        */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  {
    icon: Compass,
    name: "For School Leaders",
    desc:
      "Frameworks and practical tools for principals, coordinators, and academic leaders steering school-wide improvement.",
    items: [
      {
        label: "The Leader's Toolkit",
        href: "/articles/leaders-toolkit",
        internal: true,
      },
      {
        label: "Volume 1, Issue 1 — Full Issue",
        href: "/articles/volume-1",
        internal: true,
      },
      {
        label: "School Readiness Self-Assessment",
        href: "/images/framework/school-readiness-self-assessment.webp",
      },
    ],
  },
  {
    icon: Users,
    name: "For Teachers",
    desc:
      "Materials to support reflective practice, professional learning, classroom improvement, and competency-based teaching.",
    items: [
      {
        label: "Editorial — Volume 1, Issue 1",
        href: "/articles/editorial",
        internal: true,
      },
      {
        label: "Professional Learning Communities Guide",
        href: "#",
      },
      {
        label: "Competency-Based Lesson Planner",
        href: "#",
      },
    ],
  },
  {
    icon: FileSearch,
    name: "For Teacher Educators",
    desc:
      "Resources for teacher educators, mentors, and facilitators designing meaningful professional learning experiences.",
    items: [
      {
        label: "The Leader's Toolkit — Coaching Questions",
        href: "/articles/leaders-toolkit",
        internal: true,
      },
      {
        label: "Professional Learning Dashboard",
        href: "/images/framework/professional-learning-dashboard.webp",
      },
      {
        label: "Annual Professional Learning Calendar",
        href: "/images/framework/annual-pl-calendar.webp",
      },
    ],
  },
  {
    icon: Landmark,
    name: "Policy to Practice",
    desc:
      "Practical translations of NEP 2020 and NCF-SE 2023 into school-level and classroom-level decisions.",
    items: [
      {
        label: "Foreword — Volume 1, Issue 1",
        href: "/articles/foreword",
        internal: true,
      },
      {
        label: "Bere Policy-to-Practice Bridge",
        href: "/images/framework/bere-policy-practice-bridge.webp",
      },
      {
        label: "Traditional Practice vs. NEP/NCF-Aligned Practice",
        href: "/images/framework/traditional-vs-nep-practice.webp",
      },
    ],
  },
  {
    icon: Play,
    name: "Videos & Talks",
    desc:
      "Selected talks, workshops, and professional-learning recordings covering school leadership and educational practice.",
    items: [
      {
        label: "Workshop & Training Videos",
        href: YOUTUBE_URL,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Visual Toolkit                                                             */
/* -------------------------------------------------------------------------- */

const VISUAL_TOOLS = [
  {
    icon: ClipboardCheck,
    title: "A Case-Study Visual Timeline",
    desc:
      "A one-year, month-by-month journey from compliance-driven PD to a collaborative learning culture — with leadership focus, teacher experience, and evidence of progress mapped at each stage.",
    img: "/images/framework/case-study-timeline.webp",
  },
  {
    icon: LayoutDashboard,
    title: "Professional Learning Dashboard",
    desc:
      "A sample live dashboard tracking teacher development participation, coaching conversations, PLC activity, and student learning impact against targets.",
    img: "/images/framework/professional-learning-dashboard.webp",
  },
];

/* -------------------------------------------------------------------------- */
/* Featured YouTube Videos                                                    */
/* -------------------------------------------------------------------------- */

// Hand-picked videos from the channel.
// Add/remove video IDs as needed.
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

/* -------------------------------------------------------------------------- */
/* YouTube Facade                                                             */
/* -------------------------------------------------------------------------- */

// The thumbnail is shown first so that the carousel remains swipe-friendly.
// The actual YouTube iframe is mounted only after the user clicks Play.

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
      aria-label="Play workshop video"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="Workshop video thumbnail"
        loading="lazy"
        draggable={false}
        className="h-full w-full object-cover"
      />

      <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Play
            className="h-6 w-6 translate-x-0.5"
            fill="currentColor"
          />
        </span>
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Resources Page                                                             */
/* -------------------------------------------------------------------------- */

function Resources() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        eyebrow="School Leadership Resource Centre"
        title="Resources for School Leaders"
        lead="A growing library of guides, toolkits, rubrics, dashboards, and workshop videos — organised for principals, coordinators, teachers, and teacher educators."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/speaking"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Invite for a Workshop
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Collaborate
          </Link>
        </div>
      </PageHeader>

      {/* Resource Library */}
      <section className="container-editorial mt-12">
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Resource Library
          </div>

          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Practical resources for educational practice
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Browse resources organised around school leadership, teaching,
            teacher education, policy implementation, and professional
            learning.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.name}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 red-glow"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-serif text-lg leading-tight text-foreground">
                    {category.name}
                  </h3>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {category.desc}
                </p>

                <ul className="mt-5 space-y-2">
                  {category.items.map((item) => {
                    const isComingSoon = item.href === "#";

                    const content = (
                      <>
                        <span className="flex min-w-0 items-center gap-2 text-left">
                          <FileText className="h-4 w-4 shrink-0 text-primary" />

                          <span className="truncate">
                            {item.label}
                          </span>
                        </span>

                        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          {isComingSoon ? "Coming soon" : "Open"}
                        </span>
                      </>
                    );

                    const className =
                      "flex items-center justify-between gap-2 rounded-md border border-transparent px-3 py-2 text-sm text-foreground/85 transition-colors hover:border-primary/40 hover:bg-ink hover:text-primary";

                    if (isComingSoon) {
                      return (
                        <li key={item.label}>
                          <span
                            aria-disabled="true"
                            className={`${className} cursor-not-allowed opacity-60`}
                          >
                            {content}
                          </span>
                        </li>
                      );
                    }

                    if ("internal" in item && item.internal) {
                      return (
                        <li key={item.label}>
                          <Link
                            to={item.href}
                            className={className}
                          >
                            {content}
                          </Link>
                        </li>
                      );
                    }

                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className={className}
                        >
                          {content}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      {/* Visual Toolkit */}
      <section className="container-editorial mt-16">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Visual Toolkit
          </div>

          <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
            Dashboards & case studies
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Download visual tools that support professional learning,
            leadership reflection, and school improvement planning.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {VISUAL_TOOLS.map((tool) => {
  const Icon = tool.icon;

  return (
    <article
      key={tool.title}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card red-glow"
    >
      <div className="flex flex-1 flex-col p-6">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="mt-4 font-serif text-xl text-foreground">
          {tool.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {tool.desc}
        </p>

        
          <a href={tool.img}
          download
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <Download className="h-3.5 w-3.5" />
          Download Toolkit
        </a>
      </div>
    </article>
  );
})}
        </div>
      </section>

      {/* Workshop Videos */}
      <section className="container-editorial mb-20 mt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Workshops & Talks
            </div>

            <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
              Training and workshop clips
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              A selection of talks and workshop recordings — swipe or use
              the arrows to browse.
            </p>
          </div>

          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Visit channel
          </a>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {FEATURED_VIDEOS.map((videoId) => (
              <CarouselItem
                key={videoId}
                className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
              >
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

      {/* CTA Banner */}
      <section className="container-editorial mb-20">
        <div className="on-ink flex flex-col items-start justify-between gap-6 rounded-2xl border border-primary/30 bg-ink p-8 sm:flex-row sm:items-center md:p-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Need something built for your school?
            </div>

            <h3 className="mt-2 font-serif text-2xl text-foreground md:text-3xl">
              Bring these tools into your staff room.
            </h3>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              to="/speaking"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Invite for a Workshop
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}