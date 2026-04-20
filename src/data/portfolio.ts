import type { Profile, Project, Stat, TechGroup } from "@/types/portfolio";

export const profile: Profile = {
  name: "Rafhael Hanry",
  role: "Desenvolvedor Frontend",
  headline:
    "Interfaces que as pessoas entendem na primeira vez — do design ao deploy.",
  description:
    "Sou estudante de ADS com foco em frontend e experiência de produto. Trabalho principalmente com React, Next.js, TypeScript, Prisma e Postgres, criando soluções para projetos reais, comunidades digitais e aplicações com base sólida para crescer.",
  email: "hanryrafhael@gmail.com",
  github: "https://github.com/MrRafha",
  linkedin: "https://www.linkedin.com/in/rafhael-hanry-1b998126b/",
};

export const stats: Stat[] = [
  { label: "Em produção", value: "2 projetos" },
  { label: "Formato", value: "Freela · CLT · PJ" },
  { label: "Disponibilidade", value: "Imediata" },
  { label: "Resposta", value: "< 24h" },
];

export const projects: Project[] = [
  {
    title: "Ultimate Tracker",
    category: "Projeto principal",
    description:
      "Ferramenta gratuita para gestão de comunidades de Albion Online — organização de membros, rastreamento de atividade e suporte contínuo. Construída com Next.js, Prisma e NeonDB, com roadmap ativo e em constante evolução.",
    stack: ["Next.js", "TypeScript", "Prisma", "NeonDB", "Tailwind CSS"],
    highlights: ["Arquitetura modular", "Evolução orientada por roadmap", "Base pronta para escala"],
    gallery: [
      {
        title: "Visão geral",
        caption: "Painel com foco em leitura rápida, status claros e navegação objetiva.",
        image: "/projects/ultimate-tracker/01.png",
      },
      {
        title: "Fluxo de comunidade",
        caption: "Jornada pensada para suporte contínuo e organização de informações.",
        image: "/projects/ultimate-tracker/02.png",
      },
      {
        title: "Escalabilidade",
        caption: "Estrutura preparada para novas features sem comprometer consistência visual.",
        image: "/projects/ultimate-tracker/03.png",
      },
    ],
    href: "https://www.ultimatetracker.xyz/",
    repo: "https://github.com/MrRafha",
    featured: true,
  },
  {
    title: "Projeto IFala",
    category: "Projeto colaborativo",
    description:
      "Projeto com foco em frontend e construção de interfaces, destacando colaboração em equipe, organização visual e desenvolvimento com propósito prático.",
    stack: ["React", "TypeScript", "CSS", "Frontend"],
    highlights: ["Colaboração em equipe", "Padrão visual consistente", "Entrega incremental"],
    gallery: [
      {
        title: "Interface principal",
        caption: "Tela principal com hierarquia visual e blocos de conteúdo bem definidos.",
        image: "/projects/ifala/01.png",
      },
      {
        title: "Componente colaborativo",
        caption: "Componentes reutilizáveis para acelerar iterações e manutenção.",
        image: "/projects/ifala/02.png",
      },
      {
        title: "Experiência final",
        caption: "Navegação fluida com foco em produtividade e clareza para o usuário.",
        image: "/projects/ifala/03.png",
      },
    ],
    href: "https://ifala.cacor.ifpi.edu.br/",
    repo: "https://github.com/MrRafha",
  },
  {
    title: "Hello Kitty Water Reminder",
    category: "Aplicativo mobile",
    description:
      "Aplicação mobile temática com foco em engajamento, consistência visual e experiência do usuário, mostrando versatilidade além do ecossistema web.",
    stack: ["Flutter", "Dart", "Mobile UI"],
    highlights: ["Design temático", "Experiência mobile", "Interação recorrente"],
    gallery: [
      {
        title: "Tela inicial",
        caption: "Apresentação visual marcante para reforçar identidade e carisma.",
        image: "/projects/hello-kitty/01.png",
      },
      {
        title: "Fluxo de lembrete",
        caption: "Interações simples e diretas para estimular uso diário.",
        image: "/projects/hello-kitty/02.png",
      },
      {
        title: "Componentes visuais",
        caption: "Biblioteca de elementos mobile com consistência de estilo.",
        image: "/projects/hello-kitty/03.png",
      },
    ],
    repo: "https://github.com/MrRafha/Hello-Kitty-Drink-Wather",
  },
  {
    title: "Automação para Discord",
    category: "Automação",
    description:
      "Bots e ferramentas para gestão de eventos, moderação e integrações com APIs externas em servidores Discord, com foco em confiabilidade e operação contínua.",
    stack: ["Python", "Discord", "SQLite", "APIs"],
    highlights: ["Automação útil", "Confiabilidade operacional", "Suporte à comunidade"],
    gallery: [
      {
        title: "Painel de comandos",
        caption: "Fluxo de comandos para rotina de moderação e gestão de eventos.",
        image: "/projects/bots/01.png",
      },
      {
        title: "Integrações",
        caption: "Conexão com APIs e rotinas automatizadas para operação contínua.",
        image: "/projects/bots/02.png",
      },
      {
        title: "Monitoramento",
        caption: "Visibilidade de status e resposta rápida para operações do dia a dia.",
        image: "/projects/bots/03.png",
      },
    ],
    repo: "https://github.com/MrRafha",
  },
];

export const techGroups: TechGroup[] = [
  {
    title: "Frontend",
    summary: "Interfaces performáticas com foco em clareza, consistência visual e experiência de uso.",
    focus: "Produto e UI",
    proficiency: 92,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend & Dados",
    summary: "Estruturas para autenticação, modelagem e persistência voltadas para evolução contínua.",
    focus: "Escalabilidade",
    proficiency: 72,
    items: ["Node.js", "Prisma", "NeonDB", "SQLite"],
  },
  {
    title: "Ferramentas",
    summary: "Fluxo de entrega com versionamento, deploy e empacotamento para ambientes reais.",
    focus: "Entrega contínua",
    proficiency: 85,
    items: ["Git", "GitHub", "Docker", "Vercel"],
  },
  {
    title: "Extras",
    summary: "Base complementar para projetos mobile, automação e lógica em diferentes contextos.",
    focus: "Versatilidade",
    proficiency: 58,
    items: ["Flutter", "Java", "Python"],
  },
];
