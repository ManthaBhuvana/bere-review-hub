import { RotateCcw } from "lucide-react";

// The eight stages of the Bere Professional Learning Framework, worded exactly
// as in the Founder & Editor's manuscript (Article 1, 19 October 2026).
// Do not rename a stage without the Editor's approval.
export const BERE_PLF_STAGES = [
  "School Vision",
  "Professional Learning Opportunities",
  "Classroom Implementation",
  "Observation & Instructional Coaching",
  "Reflective Practice",
  "Collaborative Professional Dialogue",
  "Evidence of Student Learning",
  "Continuous School Improvement",
] as const;

// Desktop: a 4 × 2 loop (top row left→right, bottom row right→left, back up to 1).
// Phone: one numbered column with a "cycle continues" return.
const DESKTOP_ORDER = [0, 1, 2, 3, 7, 6, 5, 4];

function Stage({
  n,
  label,
  arrow,
}: {
  n: number;
  label: string;
  arrow?: "right" | "left" | "down" | "up";
}) {
  return (
    <div className="relative flex h-full items-center gap-3 rounded-xl border border-primary/50 bg-white/[0.04] p-3 md:flex-col md:items-start md:p-4">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {n}
      </span>
      <span className="text-sm font-semibold leading-snug text-foreground">{label}</span>
      {arrow === "right" && (
        <span
          aria-hidden="true"
          className="absolute -right-[1.05rem] top-1/2 hidden -translate-y-1/2 text-lg text-primary md:block"
        >
          →
        </span>
      )}
      {arrow === "left" && (
        <span
          aria-hidden="true"
          className="absolute -left-[1.05rem] top-1/2 hidden -translate-y-1/2 text-lg text-primary md:block"
        >
          ←
        </span>
      )}
      {arrow === "up" && (
        <span
          aria-hidden="true"
          className="absolute -top-[1.15rem] left-1/2 hidden -translate-x-1/2 text-lg text-primary md:block"
        >
          ↑
        </span>
      )}
      {arrow === "down" && (
        <span
          aria-hidden="true"
          className="absolute -bottom-[1.15rem] left-1/2 hidden -translate-x-1/2 text-lg text-primary md:block"
        >
          ↓
        </span>
      )}
    </div>
  );
}

export function FrameworkCycle() {
  return (
    <figure className="px-4 py-6 md:px-6">
      <figcaption className="sr-only">
        The eight interconnected stages of the Bere Professional Learning Framework:{" "}
        {BERE_PLF_STAGES.join(", then ")}; the cycle then continues.
      </figcaption>

      {/* Phone */}
      <ol className="space-y-2 md:hidden" aria-hidden="true">
        {BERE_PLF_STAGES.map((s, i) => (
          <li key={s}>
            <Stage n={i + 1} label={s} />
            {i < BERE_PLF_STAGES.length - 1 && (
              <div className="py-0.5 text-center text-primary">↓</div>
            )}
          </li>
        ))}
      </ol>

      {/* Desktop */}
      <div className="hidden grid-cols-4 gap-x-6 gap-y-7 md:grid" aria-hidden="true">
        {DESKTOP_ORDER.map((stageIdx, pos) => {
          // top row flows right, stage 4 drops down, bottom row flows left, stage 8 returns up to stage 1
          const arrow = pos < 3 ? "right" : pos === 3 ? "down" : pos === 4 ? "up" : "left";
          return (
            <Stage
              key={stageIdx}
              n={stageIdx + 1}
              label={BERE_PLF_STAGES[stageIdx]}
              arrow={arrow}
            />
          );
        })}
      </div>

      <p
        className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary"
        aria-hidden="true"
      >
        <RotateCcw className="h-3.5 w-3.5" /> The cycle then continues
      </p>
    </figure>
  );
}
