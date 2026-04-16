type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      <p
        className="text-xs font-medium uppercase tracking-[0.24em]"
        style={{ color: "var(--accent-soft)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="mt-2.5 text-2xl font-bold sm:text-3xl"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-6" style={{ color: "var(--foreground-muted)" }}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
