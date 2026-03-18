import { SectionTitle } from "@/components/sections/SectionTitle";
import { techGroups } from "@/data/portfolio";

export function StackSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
      <SectionTitle
        eyebrow="Stack"
        title="Base tecnica completa"
        description="Uma organizacao clara das tecnologias que sustentam meus projetos atuais e a direcao que quero fortalecer no meu portfolio."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-12">
        {techGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-[24px] border border-white/10 bg-gradient-to-b from-indigo-500/10 via-[#101018]/85 to-white/5 p-4 backdrop-blur md:col-span-1 xl:col-span-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-white">{group.title}</h3>
              <span className="rounded-full border border-indigo-400/25 bg-indigo-400/10 px-2.5 py-0.5 text-xs font-medium text-indigo-100">
                {group.focus}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-300">{group.summary}</p>

            <div className="mt-4 h-px w-full bg-white/10" />

            <div className="mt-4 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-indigo-400/25 bg-indigo-500/10 px-2.5 py-0.5 text-xs text-indigo-100"
                >
                  {item}
                </span>
              ))}
            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.14em] text-slate-400">Competencias ativas</p>
          </div>
        ))}
      </div>
    </section>
  );
}
