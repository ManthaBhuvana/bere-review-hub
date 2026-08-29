import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border/50 bg-ink">
      <div className="container-editorial py-14 md:py-20">
        {eyebrow && (
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </div>
        )}
        <h1 className="max-w-4xl font-serif text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {lead}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
