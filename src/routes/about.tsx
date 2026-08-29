import { createFileRoute } from "@tanstack/react-router";
import { Award, BookOpen, Building2, GraduationCap, Search, Target, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About the Author — Venugopal Bere | The Educational Review" },
      {
        name: "description",
        content:
          "Academic Director, Teacher Educator, and CBSE Resource Person with 30+ years bridging educational research, leadership, and classroom practice.",
      },
      { property: "og:title", content: "About Venugopal Bere" },
      {
        property: "og:description",
        content:
          "Bridging educational research with school leadership and classroom practice.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const CREDENTIALS = [
  { icon: Award, label: "30+ Years", sub: "in Education" },
  { icon: Building2, label: "Academic Director", sub: "Multiple Campuses" },
  { icon: Users, label: "CBSE Resource Person", sub: "Capacity Building" },
  { icon: BookOpen, label: "Teacher Educator", sub: "Professional Learning" },
  { icon: GraduationCap, label: "Leadership Practitioner", sub: "School Improvement" },
];

const INTERESTS = [
  "Teacher Professional Development",
  "Instructional Leadership",
  "Competency-Based Education",
  "Assessment for Learning",
  "School Improvement & Organisational Learning",
  "Professional Learning Communities",
  "Artificial Intelligence in Education",
  "Future-Ready School Transformation",
  "Educational Policy Implementation",
  "Leadership Mentoring & Capacity Building",
];

function About() {
  return (
    <>
      <div className="container-editorial grid gap-10 py-12 md:py-16 lg:grid-cols-[320px_1fr] lg:gap-16">
        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
<div className="relative aspect-3/4 w-full overflow-hidden bg-linear-to-br from-primary/40 via-primary/20 to-background">
  <img
    src="/author.jpg"
    alt="Venugopal Bere"
    className="absolute inset-0 h-full w-full object-cover"
  />
  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/95 to-transparent p-5">
    <div className="font-serif text-lg text-foreground">Venugopal Bere</div>
    <div className="text-[11px] uppercase tracking-widest text-primary">
      Academic Director
    </div>
  </div>
</div>
          </div>

          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {CREDENTIALS.map(({ icon: I, label, sub }) => (
              <li key={label} className="flex items-center gap-4 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                  <I className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">{label}</div>
                  <div className="truncate text-xs text-muted-foreground">{sub}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl border border-primary/40 bg-ink p-5 text-center">
  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
    Connect With Me
  </div>
  <p className="mt-2 text-xs text-muted-foreground">
    View my professional profile, publications, and educational initiatives on LinkedIn.
  </p>
  
    <a href="https://www.linkedin.com/in/bere-venu-gopal-lordven111"
    target="_blank"
    rel="noreferrer"
    className="mt-4 inline-block break-all rounded-full bg-primary px-3 py-2 text-[11px] font-semibold text-primary-foreground hover:bg-crimson-glow"
  >
    linkedin.com/in/bere-venu-gopal-lordven111
  </a>
</div>

                    

          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Full Profile
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Download a printable one-page summary of credentials, philosophy, and contact details.
            </p>
            
              <a href="https://zcgjgcncubxujgwtbkqo.supabase.co/storage/v1/object/public/publications/about-the-author.pdf"
              download
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-crimson-glow"
            >
              Download PDF Profile
            </a>
          </div>
        </aside>
          

        {/* Bio */}
        <article className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            About the Author
          </div>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground md:text-6xl">
            Venugopal Bere
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Academic Director &nbsp;|&nbsp; Teacher Educator &nbsp;|&nbsp; CBSE Resource Person
            &nbsp;|&nbsp; Educational Leadership Practitioner
          </p>

          <h2 className="mt-10 font-serif text-2xl text-primary md:text-3xl">
            Bridging Educational Research with School Leadership and Classroom Practice
          </h2>

          <div className="prose-lg mt-6 space-y-5 text-base leading-relaxed text-foreground/90">
            <p>
              <strong className="font-semibold text-foreground">Venugopal Bere</strong> is an
              educational leader with more than three decades of experience in school education,
              teacher development, academic leadership, and instructional improvement. Throughout
              his professional journey as a teacher, principal, academic administrator, and
              teacher educator, he has remained committed to strengthening the quality of teaching
              and learning through evidence-informed educational practice.
            </p>
            <p>
              He currently serves as Academic Director, providing academic leadership across
              multiple school campuses. In this role, he works closely with principals,
              coordinators, and teachers to enhance instructional quality, promote
              competency-based education, strengthen assessment practices, and cultivate
              professional learning cultures aligned with the vision of the National Education
              Policy (NEP) 2020 and the National Curriculum Framework for School Education
              (NCF-SE 2023).
            </p>
            <p>
              As a CBSE Resource Person, he has facilitated Capacity Building Programmes for
              school leaders and teachers on themes including instructional leadership, learning
              outcomes, competency-based education, assessment reform, cyber safety, digital
              citizenship, and teacher professional development. His workshops emphasise the
              practical application of educational research within authentic classroom and school
              contexts.
            </p>
            <p>
              A strong advocate of lifelong learning, Venugopal Bere believes that sustainable
              school improvement begins with the continuous professional growth of educators. His
              leadership philosophy is grounded in three interconnected principles:
            </p>
          </div>

          {/* Principles */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Search, t: "Evidence should inform educational practice." },
              { icon: Users, t: "Leadership should develop people before programmes." },
              { icon: Target, t: "Professional learning should ultimately improve student learning." },
            ].map(({ icon: I, t }) => (
              <div key={t} className="rounded-xl card-ash p-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-ink text-primary">
                  <I className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-medium leading-relaxed text-ash-foreground">
                  {t}
                </p>
              </div>
            ))}
          </div>

          <div className="prose-lg mt-8 space-y-5 text-base leading-relaxed text-foreground/90">
            <p>
              These principles have shaped both his leadership practice and the development of the{" "}
              <strong className="font-semibold text-primary">
                Bere Professional Learning Framework
              </strong>
              , a practice-informed conceptual framework presented in this inaugural issue. The
              framework integrates insights from educational research, national policy,
              instructional leadership, and classroom practice into a coherent model for
              continuous school improvement.
            </p>
            <p>
              Beyond institutional leadership, Venugopal Bere actively contributes to teacher
              education through professional learning programmes, leadership mentoring,
              educational writing, and the development of practical tools that support teachers
              and school leaders in translating research into action.
            </p>
          </div>

          {/* Interests */}
          <div className="mt-12">
            <h3 className="font-serif text-xl uppercase tracking-widest text-primary">
              Professional Interests
            </h3>
            <div className="mt-5 h-px w-16 bg-primary" />
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {INTERESTS.map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="prose-lg mt-10 space-y-5 text-base leading-relaxed text-foreground/90">
            <p>
              He is also pursuing advanced scholarly work in educational leadership and teacher
              professional development, with a long-term focus on contributing to
              evidence-informed educational practice and policy through research and publication.
            </p>
            <p>
              Through <em>The Venugopal Bere Educational Review</em>, he seeks to create a
              platform where educational research, policy, leadership, and classroom practice
              converge to support meaningful dialogue and continuous improvement within schools.
            </p>
          </div>

          {/* Pull quote */}
          <figure className="mt-12 overflow-hidden rounded-2xl border border-primary/30 card-ash p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Professional Philosophy
            </div>
            <blockquote className="mt-5 font-serif text-2xl italic leading-relaxed text-ash-foreground md:text-3xl">
              <span className="mr-1 font-serif text-4xl text-primary">“</span>
              Educational excellence is not achieved through isolated initiatives. It is built
              when schools create cultures where teachers continue to learn, leaders continue to
              support, and students continue to thrive.
              <span className="ml-1 font-serif text-4xl text-primary">”</span>
            </blockquote>
            <figcaption className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-ash-foreground/15 pt-5 sm:flex-row sm:items-center">
              <div>
                <div className="font-serif text-lg text-ash-foreground">Venugopal Bere</div>
                <div className="text-xs text-ash-foreground/70">
                  Academic Director | Teacher Educator | Educational Leadership Practitioner
                </div>
              </div>
              <div
                className="font-serif text-3xl italic text-primary"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Venugopal Bere
              </div>
            </figcaption>
          </figure>
        </article>
      </div>
    </>
  );
}
