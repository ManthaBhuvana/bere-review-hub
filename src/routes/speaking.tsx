import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  Camera,
  Handshake,
  Mic,
  School,
  Sparkles,
  Users,
} from "lucide-react";
import { PageHeader } from "../components/site/PageHeader";

export const Route = createFileRoute("/speaking")({
  component: Speaking,
  head: () => ({
    meta: [
      { title: "Speaking & Training — Venugopal Bere | The Educational Review" },
      {
        name: "description",
        content:
          "Keynote speaking, CBSE Capacity Building Programmes, teacher training, school leadership workshops, and parent education sessions with Venugopal Bere.",
      },
      {
        name: "keywords",
        content:
          "keynote speaker education, CBSE capacity building programme, teacher training, school leadership workshop, parent education session, invite speaker",
      },
      { property: "og:title", content: "Speaking & Training — Venugopal Bere" },
      {
        property: "og:description",
        content: "Keynotes, capacity building programmes, and workshops for schools and school systems.",
      },
      { property: "og:url", content: "/speaking" },
    ],
    links: [{ rel: "canonical", href: "/speaking" }],
  }),
});

const GALLERY_PHOTOS = [
  { src: "/images/training/photo-1.jpeg", alt: "Group discussion at a training session" },
  { src: "/images/training/photo-2.jpeg", alt: "Keynote address at an educators' conference" },
  { src: "/images/training/photo-3.jpeg", alt: "Presenting NEP 2020 aims during a workshop" },
  { src: "/images/training/photo-4.jpeg", alt: "Facilitating a school leadership workshop" },
  { src: "/images/training/photo-5.jpeg", alt: "WorkShop on Bloom's Taxonomy"},
  { src: "/images/training/photo-6.jpeg", alt: "WorkShop on pedagogical shifts"},
];

const ENGAGEMENTS = [
  {
    icon: Mic,
    title: "Keynote Speaking",
    desc: "Conference and convocation keynotes on instructional leadership, teacher professional growth, and school improvement in the NEP 2020 era.",
  },
  {
    icon: Award,
    title: "CBSE Capacity Building Programmes",
    desc: "Facilitation of CBSE-affiliated capacity building sessions for principals, coordinators, and teachers on learning outcomes, competency-based education, and assessment reform.",
  },
  {
    icon: Users,
    title: "Teacher Training",
    desc: "Multi-day or single-session training on instructional strategies, formative assessment, classroom management, and professional learning community design.",
  },
  {
    icon: School,
    title: "School Leadership Workshops",
    desc: "Workshops for principals and academic leaders on instructional leadership, classroom observation, coaching coordinators, and building a culture of continuous improvement.",
  },
  {
    icon: Handshake,
    title: "Parent Education",
    desc: "Sessions that help parents understand competency-based education, assessment reform, and how to partner effectively with schools in a child's learning journey.",
  },
  {
    icon: Sparkles,
    title: "Other Professional Engagements",
    desc: "Panel discussions, curriculum review consultations, school audits, and bespoke professional learning design for school systems and education trusts.",
  },
];

const AREAS = [
  "Instructional Leadership",
  "NEP 2020 & NCF-SE Implementation",
  "Competency-Based Education",
  "Assessment for Learning",
  "Professional Learning Communities",
  "Classroom Observation & Coaching",
  "Digital Citizenship & Cyber Safety",
  "School Improvement Planning",
];

function Speaking() {
  return (
    <>
      <PageHeader
        eyebrow="Speaking & Training"
        title="Keynotes, Capacity Building & Workshops"
        lead="Venugopal Bere works with schools, school systems, and CBSE regions to design and deliver keynotes, capacity building programmes, and hands-on workshops for leaders, teachers, and parents."
      >
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Invite for a Programme
          </Link>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Explore Resources
          </Link>
        </div>
      </PageHeader>

      {/* Engagement types */}
      <section className="container-editorial mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ENGAGEMENTS.map(({ icon: I, title, desc }) => (
          <div key={title} className="flex flex-col rounded-2xl border border-border bg-card p-6 red-glow">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
              <I className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-serif text-lg leading-tight text-foreground">{title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </section>

      {/* Areas of expertise */}
      <section className="container-editorial mt-16">
        <div className="rounded-2xl border border-border bg-ink p-8 md:p-12">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Areas of Expertise
          </div>
          <h2 className="mt-2 font-serif text-2xl md:text-3xl">Themes for a session or series</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {AREAS.map((a) => (
              <span
                key={a}
                className="rounded-full border border-primary/30 bg-background/60 px-4 py-2 text-xs font-semibold text-foreground/85"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — sourced from GALLERY_PHOTOS above. Add more files to
          public/images/training/ and list them there; this grid updates
          automatically. */}
      <section className="container-editorial mt-16">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Gallery
          </div>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">From workshops & sessions</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Photographs from keynotes, capacity building programmes, and school workshops —
            added as sessions are documented.
          </p>
        </div>
        {GALLERY_PHOTOS.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.src}
                className="aspect-4/3 overflow-hidden rounded-xl border border-border bg-card"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card text-center text-muted-foreground"
                >
                  <Camera className="h-5 w-5" />
                  <span className="px-2 text-[10px] leading-tight">Coming soon</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Add photographs to <code>public/images/training/</code> and swap in the tiles above.
            </p>
          </>
        )}
      </section>

      {/* How it works */}
      <section className="container-editorial mt-16 mb-20">
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            How a Programme Comes Together
          </div>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">From enquiry to delivery</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Share your context",
              desc: "Tell us about your school or system, the audience, and the outcome you're aiming for.",
            },
            {
              step: "2",
              title: "Design together",
              desc: "The session is shaped around your context — a keynote, a full-day workshop, or a multi-session capacity building programme.",
            },
            {
              step: "3",
              title: "Deliver & follow up",
              desc: "Delivery is followed by practical takeaways and, where useful, a short follow-up check-in with participants.",
            },
          ].map((s) => (
            <div key={s.step} className="rounded-xl border border-border bg-card p-6">
              <div className="font-serif text-3xl text-primary">{s.step}</div>
              <h3 className="mt-3 font-serif text-lg text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Invite for a Programme
          </Link>
        </div>
      </section>
    </>
  );
}