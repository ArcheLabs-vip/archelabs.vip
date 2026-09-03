export type PlanId = "start" | "pro" | "custom";

export interface NavItem {
  label: string;
  href: string;
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

export interface CareFeature {
  icon: string;
  title: string;
  detail: string;
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

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  context: string;
  initials: string;
}

export const navItems: NavItem[] = [
  { label: "Projetos", href: "#projetos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Processo", href: "#processo" },
  { label: "Planos", href: "#planos" },
];

// Substitua pelos depoimentos aprovados dos clientes antes da publicação.
export const testimonials: Testimonial[] = [
  {
    id: "clareza",
    quote: "O processo foi muito claro do início ao fim. Eu sabia o que precisava enviar e o que aconteceria em cada etapa.",
    name: "Cliente Arche",
    context: "Serviços profissionais",
    initials: "CA",
  },
  {
    id: "mensagem",
    quote: "A página finalmente conseguiu explicar nosso serviço sem complicar. Ficou direta, profissional e fácil de apresentar.",
    name: "Cliente Arche",
    context: "Consultoria",
    initials: "CA",
  },
  {
    id: "mobile",
    quote: "No celular ficou tão boa quanto no computador. A navegação é rápida e o contato pelo WhatsApp está sempre simples.",
    name: "Cliente Arche",
    context: "Negócio local",
    initials: "CA",
  },
  {
    id: "direcao",
    quote: "Cheguei com as ideias soltas e saí com uma apresentação organizada, coerente e muito mais segura para divulgar.",
    name: "Cliente Arche",
    context: "Profissional autônomo",
    initials: "CA",
  },
  {
    id: "entrega",
    quote: "A entrega foi objetiva e bem acompanhada. Cada decisão tinha um motivo e os ajustes ficaram fáceis de aprovar.",
    name: "Cliente Arche",
    context: "Pequena empresa",
    initials: "CA",
  },
  {
    id: "resultado",
    quote: "Agora temos um link que representa melhor o negócio e conduz o visitante para a conversa certa sem distrações.",
    name: "Cliente Arche",
    context: "Prestação de serviços",
    initials: "CA",
  },
];

export const differentials: Differential[] = [
  {
    number: "01",
    title: "Estrutura profissional",
    description:
      "Cada projeto segue um processo claro com etapas definidas, prazos comunicados e entregas organizadas. Você sabe o que acontece em cada fase, o que precisa enviar e quando receberá a próxima versão.",
  },
  {
    number: "02",
    title: "Você é dono de tudo",
    description:
      "O endereço do site, o código e a conta de hospedagem ficam 100% no seu nome. Sem amarras, sem burocracia se um dia decidir trocar de fornecedor.",
  },
  {
    number: "03",
    title: "Performance desde o primeiro acesso",
    description:
      "Páginas construídas com código enxuto, imagens otimizadas e carregamento rápido. Um site lento perde visitas antes mesmo de mostrar sua oferta — aqui isso não acontece.",
  },
  {
    number: "04",
    title: "Feito para converter, não só para existir",
    description:
      "Cada seção é pensada para conduzir o visitante à ação: botão de WhatsApp acessível, formulário de contato visível e estrutura de conteúdo que reduz dúvidas antes do clique.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    label: "DISCOVERY",
    title: "Descoberta",
    description:
      "Você responde um briefing objetivo e envia os materiais disponíveis. A partir disso, entendemos o negócio, o público e o que a página precisa comunicar.",
  },
  {
    number: "02",
    label: "STRATEGY",
    title: "Estratégia",
    description:
      "Definimos a estrutura de seções, a hierarquia de informações e a direção visual antes de começar a construir. Isso evita retrabalho e mantém o projeto focado.",
  },
  {
    number: "03",
    label: "BUILD",
    title: "Construção",
    description:
      "Design e desenvolvimento acontecem juntos. Cada seção é construída com código limpo, responsivo e otimizado para performance desde o início.",
  },
  {
    number: "04",
    label: "REVIEW",
    title: "Revisão",
    description:
      "Você recebe a versão navegável para avaliar. As revisões incluídas no plano são aplicadas nesta etapa, com prazo e escopo definidos.",
  },
  {
    number: "05",
    label: "LAUNCH",
    title: "Lançamento",
    description:
      "Configuração de domínio, SSL e publicação. O site vai ao ar com tudo verificado — links, formulários, responsividade e velocidade.",
  },
  {
    number: "06",
    label: "CONTINUITY",
    title: "Continuidade",
    description:
      "Após a entrega, você escolhe: recebe os acessos completos para gerir por conta própria ou contrata o Arche Care para manutenção contínua.",
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
      "Design baseado em estruturas de alto resultado da Arche Labs",
      "Adaptação de cores, textos, imagens e identidade visual",
      "Botão para WhatsApp",
      "Formulário de contato",
      "Botões estratégicos de ação (ex: 'Fale Conosco')",
      "SEO básico (para facilitar ser encontrado no Google)",
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
      "Páginas desenhadas estrategicamente para transformar visitantes em contatos",
      "Apoio na criação de textos persuasivos focados em vendas",
      "Uso de IA como ferramenta interna para estrutura, criação e otimização",
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
      "Criação estratégica de textos (Copywriting) para convencer o visitante",
      "Integrações específicas mediante análise",
      "Preparação para Meta Pixel, Google Tag ou ferramentas semelhantes",
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
  positioning:
    "Após a entrega, seu site segue acompanhado: hospedagem, segurança, backups e manutenção técnica por apenas R$ 99/mês.",
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
  ctaLabel: "Incluir ao escolher um plano",
};

export const careFeatures: CareFeature[] = [
  {
    icon: "activity",
    title: "Uptime 24/7",
    detail: "Monitoramento contínuo para garantir que seu site esteja sempre no ar.",
  },
  {
    icon: "shield",
    title: "SSL & Segurança",
    detail: "Certificado SSL ativo e atualizações de segurança aplicadas.",
  },
  {
    icon: "database",
    title: "Backup automático",
    detail: "Cópias de segurança para restaurar o site a qualquer momento.",
  },
  {
    icon: "wrench",
    title: "Manutenção técnica",
    detail: "Atualizações, correções e ajustes técnicos sem você se preocupar.",
  },
];

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
