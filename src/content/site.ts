export type PlanId = "start" | "pro" | "custom";

export interface NavItem {
  label: string;
  href: string;
}

export interface Pillar {
  number: string;
  title: string;
  description: string;
}

export interface Service {
  id: "landing-pages" | "content-panel" | "arche-care";
  number: string;
  name: string;
  description: string;
  price: string;
  highlights: string[];
}

export interface Differential {
  number: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  label: string;
  title: string;
  description: string;
}

export interface Plan {
  id: PlanId;
  name: string;
  price: string;
  description: string;
  deadline: string;
  deadlineNote?: string;
  revisions: number;
  revisionsLabel: string;
  sections: string;
  featured: boolean;
  badge?: string;
  includesFrom?: PlanId;
  includes: string[];
  idealFor: string[];
  ctaLabel: string;
}

export interface CarePlan {
  id: "arche-care";
  name: string;
  price: string;
  cadence: string;
  positioning: string;
  description: string;
  includes: string[];
  smallChangesDefinition: string;
  ctaLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RevisionPolicy {
  simple: {
    name: string;
    deadline: string;
    additionalPrice: string;
    description: string;
  };
  major: {
    name: string;
    deadline: string;
    price: string;
    description: string;
  };
  scopeChange: string;
}

export interface ProjectPreview {
  name: string;
  category: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}

export const navItems: NavItem[] = [
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
];

export const projectPreviews: ProjectPreview[] = [
  {
    name: "Arche Labs",
    category: "Landing page comercial",
    image: "/assets/projects/arche-hero.png",
    imageAlt: "Hero da landing page da Arche Labs em tela desktop",
  },
  {
    name: "Arche Pro",
    category: "Apresentação de oferta",
    image: "/assets/projects/arche-offer.png",
    imageAlt: "Seção de planos da Arche Labs em tela desktop",
  },
  {
    name: "Arche Mobile",
    category: "Experiência responsiva",
    image: "/assets/projects/arche-mobile.png",
    imageAlt: "Landing page completa da Arche Labs em tela mobile",
    imagePosition: "top center",
  },
];

export const pillars: Pillar[] = [
  {
    number: "01",
    title: "Presença",
    description: "Apresente sua empresa de forma profissional.",
  },
  {
    number: "02",
    title: "Conversão",
    description:
      "Direcione visitantes para contato, orçamento ou WhatsApp.",
  },
  {
    number: "03",
    title: "Performance",
    description: "Experiência rápida, responsiva e preparada para crescer.",
  },
];

export const services: Service[] = [
  {
    id: "landing-pages",
    number: "01",
    name: "Landing Pages",
    description:
      "Landing Pages profissionais para apresentar serviços, gerar contatos, receber pedidos de orçamento e converter visitantes em clientes.",
    price: "A partir de R$ 697",
    highlights: [
      "Página responsiva",
      "Integração com WhatsApp",
      "Estrutura preparada para campanhas futuras",
    ],
  },
  {
    id: "content-panel",
    number: "02",
    name: "Painel de edição de conteúdo",
    description:
      "Edite conteúdos básicos do site sem precisar solicitar cada alteração à Arche Labs.",
    price: "R$ 300",
    highlights: [
      "Setup e integração inicial",
      "Textos e imagens editáveis",
      "Contratação independente do Arche Care",
    ],
  },
  {
    id: "arche-care",
    number: "03",
    name: "Arche Care",
    description: "Gestão e manutenção contínua do site.",
    price: "R$ 99/mês",
    highlights: ["Hospedagem e SSL", "Monitoramento básico", "Suporte"],
  },
];

export const differentials: Differential[] = [
  {
    number: "01",
    title: "Estrutura profissional",
    description: "Processo definido do onboarding à publicação.",
  },
  {
    number: "02",
    title: "O cliente continua dono dos ativos",
    description:
      "Domínio, infraestrutura e código seguem princípios de portabilidade.",
  },
  {
    number: "03",
    title: "Performance",
    description: "Infraestrutura moderna e enxuta.",
  },
  {
    number: "04",
    title: "Conversão",
    description:
      "Estrutura orientada para CTA, WhatsApp e geração de contatos.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    label: "DISCOVERY",
    title: "Descoberta",
    description: "Briefing e materiais",
  },
  {
    number: "02",
    label: "STRATEGY",
    title: "Estratégia",
    description: "Estrutura e direção",
  },
  {
    number: "03",
    label: "BUILD",
    title: "Construção",
    description: "Design e desenvolvimento",
  },
  {
    number: "04",
    label: "REVIEW",
    title: "Revisão",
    description: "Apresentação e ajustes",
  },
  {
    number: "05",
    label: "LAUNCH",
    title: "Lançamento",
    description: "Publicação",
  },
  {
    number: "06",
    label: "CONTINUITY",
    title: "Continuidade",
    description: "Handoff ou Arche Care",
  },
];

export const plans: Plan[] = [
  {
    id: "start",
    name: "Arche Start",
    price: "R$ 697",
    description:
      "Plano de entrada para negócios que precisam colocar uma presença profissional no ar rapidamente.",
    deadline: "3 a 5 dias úteis",
    deadlineNote:
      "Contados após o recebimento de todas as informações e materiais necessários.",
    revisions: 1,
    revisionsLabel: "1 rodada de revisão simples incluída",
    sections: "Até 6 seções",
    featured: false,
    includes: [
      "Landing Page responsiva",
      "Até 6 seções",
      "Personalização de template Arche Labs",
      "Adaptação de cores, textos, imagens e identidade visual",
      "Botão para WhatsApp",
      "Formulário de contato",
      "CTA principal",
      "SEO básico",
      "Configuração básica para publicação",
      "1 rodada de revisões",
    ],
    idealFor: [
      "Pequenos negócios",
      "Profissionais autônomos",
      "Negócios locais",
      "Empresas que ainda não possuem site",
      "Clientes com necessidade simples de divulgação e captação",
    ],
    ctaLabel: "Iniciar projeto",
  },
  {
    id: "pro",
    name: "Arche Pro",
    price: "R$ 1.197",
    description:
      "O melhor equilíbrio entre preço, personalização e recursos para a maioria dos clientes.",
    deadline: "5 a 7 dias úteis",
    revisions: 2,
    revisionsLabel: "2 rodadas de revisão simples incluídas",
    sections: "Até 10 seções",
    featured: true,
    badge: "Recomendado",
    includesFrom: "start",
    includes: [
      "Tudo do Arche Start",
      "Até 10 seções",
      "Personalização mais avançada do layout",
      "Estrutura pensada para conversão",
      "Apoio na criação e melhoria dos textos",
      "Uso de IA como ferramenta interna para estrutura, copy e otimização",
      "Integração com Google Analytics",
      "Preparação para Meta Pixel, Google Tag ou ferramentas semelhantes",
      "Otimização básica de performance",
      "2 rodadas de revisões",
    ],
    idealFor: [
      "Empresas que pretendem anunciar futuramente",
      "Negócios que precisam de uma apresentação mais completa",
      "Clientes que desejam mais personalização",
      "Empresas que querem medir acessos e conversões",
    ],
    ctaLabel: "Iniciar projeto",
  },
  {
    id: "custom",
    name: "Arche Custom",
    price: "A partir de R$ 1.997",
    description:
      "Plano para projetos que exigem identidade visual e estrutura específicas. O valor final depende da complexidade do projeto.",
    deadline: "7 a 14 dias úteis",
    deadlineNote: "O prazo depende da complexidade do projeto.",
    revisions: 3,
    revisionsLabel: "3 rodadas de revisão simples incluídas",
    sections: "Conforme o projeto",
    featured: false,
    includes: [
      "Layout personalizado",
      "Estrutura definida de acordo com o negócio",
      "Maior liberdade visual",
      "Copy e organização de conteúdo mais aprofundadas",
      "Integrações específicas mediante análise",
      "Google Analytics",
      "Estrutura para tracking",
      "Otimização de performance",
      "3 rodadas de revisões",
      "Suporte prioritário durante o desenvolvimento",
    ],
    idealFor: [
      "Empresas com identidade visual mais consolidada",
      "Negócios que não querem utilizar estruturas previamente desenvolvidas",
      "Projetos com necessidades específicas",
      "Empresas que exigem maior nível de personalização",
    ],
    ctaLabel: "Iniciar projeto",
  },
];

export const archeCare: CarePlan = {
  id: "arche-care",
  name: "Arche Care",
  price: "R$ 99",
  cadence: "/mês",
  positioning: "Gestão e manutenção contínua do site.",
  description:
    "O plano padrão oferecido após a entrega para manter o site acompanhado pela Arche Labs.",
  includes: [
    "Hospedagem",
    "SSL",
    "Monitoramento básico",
    "Backup",
    "Manutenção técnica",
    "Atualizações necessárias",
    "Pequenas alterações de conteúdo",
    "Suporte",
  ],
  smallChangesDefinition:
    "Ajustes simples em textos, imagens, links e informações existentes, sem criação de novas páginas, seções ou funcionalidades.",
  ctaLabel: "Adicionar Arche Care",
};

export const revisionPolicy: RevisionPolicy = {
  simple: {
    name: "Alteração simples",
    deadline: "1 a 2 dias úteis",
    additionalPrice: "R$ 150 por rodada",
    description:
      "Ajustes que não alteram de forma relevante a estrutura principal da Landing Page. Cada rodada corresponde a um conjunto consolidado de alterações enviado após a apresentação de uma versão do projeto.",
  },
  major: {
    name: "Alteração maior",
    deadline: "3 a 5 dias úteis",
    price: "R$ 300 por rodada",
    description:
      "Mudanças mais extensas que exigem retrabalho relevante, mas ainda permanecem dentro do escopo originalmente contratado. São cobradas separadamente, mesmo quando ainda existem revisões simples disponíveis.",
  },
  scopeChange:
    "Novas páginas, funcionalidades, integrações ou requisitos não previstos no escopo aprovado exigem novo orçamento e novo prazo.",
};

export const faqItems: FaqItem[] = [
  {
    question: "Quanto tempo demora?",
    answer:
      "O Arche Start tem prazo estimado de 3 a 5 dias úteis, o Arche Pro de 5 a 7 dias úteis e o Arche Custom de 7 a 14 dias úteis, dependendo da complexidade. O prazo considera apenas o período de desenvolvimento. O tempo de espera por materiais, informações, aprovação ou feedback não é contabilizado.",
  },
  {
    question: "Preciso ter domínio?",
    answer:
      "A Arche Labs pode auxiliar na compra e configuração. O domínio deve ser registrado em nome do cliente e sua compra ou renovação não está incluída no preço padrão.",
  },
  {
    question: "Quem fornece os textos e imagens?",
    answer:
      "O desenvolvimento começa após o envio do briefing e dos materiais necessários. O Arche Start inclui adaptação de textos e imagens, o Arche Pro inclui apoio na criação e melhoria dos textos e o Arche Custom oferece copy e organização de conteúdo mais aprofundadas.",
  },
  {
    question: "O site fica no meu nome?",
    answer:
      "Sim. O domínio deve ser registrado em nome do cliente, e domínio, infraestrutura e código seguem princípios de portabilidade.",
  },
  {
    question: "Posso editar o conteúdo?",
    answer:
      "Sim, com o Painel de edição de conteúdo opcional por R$ 300. Ele permite editar conteúdos básicos do site e pode ser contratado com ou sem Arche Care.",
  },
  {
    question: "Preciso contratar o Arche Care?",
    answer:
      "Não. O Arche Care é um serviço recorrente oferecido após a entrega por R$ 99/mês para hospedagem, SSL, monitoramento básico, backup, manutenção técnica, atualizações necessárias, pequenas alterações de conteúdo e suporte.",
  },
  {
    question: "Quantas revisões estão incluídas?",
    answer:
      "O Arche Start inclui 1 rodada, o Arche Pro inclui 2 e o Arche Custom inclui 3. As rodadas incluídas cobrem somente alterações simples, enviadas como um conjunto consolidado após a apresentação de uma versão do projeto.",
  },
  {
    question: "Posso solicitar alterações futuras?",
    answer:
      "Sim. Depois das rodadas incluídas, uma revisão simples adicional custa R$ 150 e leva de 1 a 2 dias úteis. Uma alteração maior custa R$ 300 e leva de 3 a 5 dias úteis. Mudanças de escopo recebem orçamento e prazo próprios.",
  },
];

export const siteContent = {
  nav: navItems,
  projects: projectPreviews,
  pillars,
  services,
  differentials,
  process: processSteps,
  plans,
  care: archeCare,
  faq: faqItems,
  revisions: revisionPolicy,
};

export default siteContent;
