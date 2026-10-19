// The Bere Professional Learning Framework — eight interconnected stages in a
// continuous cycle, with Continuous School Improvement feeding back into
// School Vision. Stage names are worded exactly as approved by the Founder &
// Editor (Article 1 manuscript and editorial reply, 19 October 2026).
// Do not rename a stage, or describe the framework as an empirically
// validated model, without the Editor's approval.
import { useId } from "react";
import { RotateCcw } from "lucide-react";

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

export const FRAMEWORK_DESCRIPTOR = "Practice-Informed Conceptual Framework";

// Line breaks used inside the diagram's boxes (same words, split for space).
const LINES: string[][] = [
  ["School Vision"],
  ["Professional Learning", "Opportunities"],
  ["Classroom", "Implementation"],
  ["Observation &", "Instructional Coaching"],
  ["Reflective Practice"],
  ["Collaborative", "Professional Dialogue"],
  ["Evidence of", "Student Learning"],
  ["Continuous School", "Improvement"],
];

// Colours from the site palette (Oxford Blue / Gold / White).
const INK = "oklch(0.20 0.07 255)";
const INK_DEEP = "oklch(0.16 0.05 255)";
const GOLD = "oklch(0.78 0.14 85)";
const WHITE = "oklch(0.97 0.005 90)";

// Geometry (viewBox units)
const SIZE = 900;
const C = SIZE / 2;
const R = 332; // radius of the stage centres
const BW = 200; // box width
const BH = 64; // box height
const rad = (deg: number) => (deg * Math.PI) / 180;
const angleOf = (i: number) => -90 + i * 45; // stage 1 at the top, clockwise

/** Half the box's extent along the circle's tangent at angle θ (support function). */
function halfExtentAlongTangent(theta: number) {
  const t = rad(theta);
  return (Math.abs(Math.sin(t)) * BW) / 2 + (Math.abs(Math.cos(t)) * BH) / 2;
}

function arcPath(fromIdx: number, toIdx: number) {
  const pad = 8;
  const a0 =
    angleOf(fromIdx) + ((halfExtentAlongTangent(angleOf(fromIdx)) + pad) / R) * (180 / Math.PI);
  const toAngle = toIdx === 0 ? 270 : angleOf(toIdx); // 8 → 1 continues clockwise past 360°
  const a1 = toAngle - ((halfExtentAlongTangent(toAngle) + pad + 4) / R) * (180 / Math.PI);
  const p = (a: number) =>
    `${(C + R * Math.cos(rad(a))).toFixed(1)} ${(C + R * Math.sin(rad(a))).toFixed(1)}`;
  return `M ${p(a0)} A ${R} ${R} 0 0 1 ${p(a1)}`;
}

/** The circular diagram. `id` lets a page find the <svg> for PNG download. */
export function FrameworkDiagram({ id, className = "" }: { id?: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const arrow = `plf-arrow-${uid}`;
  const arrowGold = `plf-arrow-gold-${uid}`;
  return (
    <svg
      id={id}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`The Bere Professional Learning Framework: a cycle of eight interconnected stages — ${BERE_PLF_STAGES.join(
        ", then ",
      )} — with Continuous School Improvement feeding back into School Vision.`}
      className={className}
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      <defs>
        <marker
          id={arrow}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={GOLD} fillOpacity="0.75" />
        </marker>
        <marker
          id={arrowGold}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={GOLD} />
        </marker>
      </defs>

      <rect width={SIZE} height={SIZE} rx="28" fill={INK_DEEP} />

      {/* faint orbit */}
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke={GOLD}
        strokeOpacity="0.15"
        strokeWidth="1.5"
      />

      {/* arrows between stages 1→2 … 7→8 */}
      {BERE_PLF_STAGES.slice(0, 7).map((_, i) => (
        <path
          key={i}
          d={arcPath(i, i + 1)}
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.75"
          strokeWidth="2.5"
          markerEnd={`url(#${arrow})`}
        />
      ))}
      {/* the feedback loop 8 → 1, emphasised */}
      <path
        d={arcPath(7, 0)}
        fill="none"
        stroke={GOLD}
        strokeWidth="5"
        markerEnd={`url(#${arrowGold})`}
      />

      {/* centre */}
      <circle
        cx={C}
        cy={C}
        r="165"
        fill={INK}
        stroke={GOLD}
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <text
        x={C}
        y={C - 52}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        letterSpacing="3"
        fill={GOLD}
      >
        THE BERE
      </text>
      <text x={C} y={C - 20} textAnchor="middle" fontSize="23" fontWeight="700" fill={WHITE}>
        Professional Learning
      </text>
      <text x={C} y={C + 10} textAnchor="middle" fontSize="23" fontWeight="700" fill={WHITE}>
        Framework
      </text>
      <text x={C} y={C + 44} textAnchor="middle" fontSize="12.5" fill={WHITE} fillOpacity="0.8">
        A {FRAMEWORK_DESCRIPTOR.toLowerCase()}
      </text>
      <text x={C} y={C + 64} textAnchor="middle" fontSize="12.5" fill={WHITE} fillOpacity="0.8">
        of eight interconnected stages
      </text>

      {/* stages */}
      {LINES.map((lines, i) => {
        const a = rad(angleOf(i));
        const x = C + R * Math.cos(a);
        const y = C + R * Math.sin(a);
        const loopEnds = i === 0 || i === 7;
        return (
          <g key={i}>
            <rect
              x={x - BW / 2}
              y={y - BH / 2}
              width={BW}
              height={BH}
              rx="12"
              fill={INK}
              stroke={GOLD}
              strokeWidth={loopEnds ? 2.5 : 1.5}
            />
            <circle cx={x - BW / 2 + 4} cy={y - BH / 2 + 4} r="15" fill={GOLD} />
            <text
              x={x - BW / 2 + 4}
              y={y - BH / 2 + 9}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={INK_DEEP}
            >
              {i + 1}
            </text>
            {lines.map((line, j) => (
              <text
                key={j}
                x={x + 4}
                y={y + 5 + (j - (lines.length - 1) / 2) * 18}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill={WHITE}
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* label on the feedback loop (between stage 8, upper-left, and stage 1, top) */}
      <text
        x={C + (R + 52) * Math.cos(rad(-112))}
        y={C + (R + 52) * Math.sin(rad(-112))}
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="700"
        fill={GOLD}
        transform={`rotate(-22 ${C + (R + 52) * Math.cos(rad(-112))} ${C + (R + 52) * Math.sin(rad(-112))})`}
      >
        feeds back into School Vision
      </text>
    </svg>
  );
}

/** Phone layout: numbered column with a visible loop back from 8 to 1. */
function FrameworkLoopList() {
  return (
    <div className="relative pl-6" aria-hidden="true">
      {/* the return rail on the left: from stage 8 back up to stage 1 */}
      <div className="absolute bottom-6 left-1.5 top-6 w-0.5 rounded bg-primary" />
      <div className="absolute left-0 top-4 text-sm leading-none text-primary">▲</div>
      <ol className="space-y-1.5">
        {BERE_PLF_STAGES.map((s, i) => (
          <li key={s}>
            <div className="flex items-center gap-3 rounded-xl border border-primary/50 bg-white/[0.04] p-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-sm font-semibold leading-snug text-foreground">{s}</span>
            </div>
            {i < BERE_PLF_STAGES.length - 1 && (
              <div className="text-center text-xs leading-4 text-primary">↓</div>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-primary">
        <RotateCcw className="h-3.5 w-3.5" /> Continuous School Improvement feeds back into School
        Vision
      </p>
    </div>
  );
}

/** Responsive figure: circular diagram from 640 px up, looped list below. */
export function FrameworkCycle({ svgId }: { svgId?: string }) {
  return (
    <figure className="px-4 py-6 md:px-6">
      <div className="hidden sm:block">
        <FrameworkDiagram id={svgId} className="mx-auto h-auto w-full max-w-[720px]" />
      </div>
      <div className="sm:hidden">
        <FrameworkLoopList />
      </div>
      <figcaption className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        The Bere Professional Learning Framework — a {FRAMEWORK_DESCRIPTOR.toLowerCase()} of eight
        interconnected stages, in which Continuous School Improvement feeds back into School Vision.
      </figcaption>
    </figure>
  );
}

/** Downloads the diagram (found by its id) as a 1680 × 1680 PNG. */
export async function downloadFrameworkPng(
  svgId: string,
  fileName = "bere-professional-learning-framework.png",
) {
  const svg = document.getElementById(svgId);
  if (!svg) return;
  const xml = new XMLSerializer().serializeToString(svg);
  const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("diagram could not be rendered"));
      img.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = SIZE * 2;
    canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = fileName;
    a.click();
  } finally {
    URL.revokeObjectURL(url);
  }
}
