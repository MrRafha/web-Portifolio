type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
        {eyebrow}
      </p>
      <h2 className="mt-2.5 text-2xl font-semibold text-white sm:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}
