// Troque pelo número real da Arche Labs (formato internacional, só dígitos)
export const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
export const EMAIL = "suporte@archelabs.vip";
export const INSTAGRAM_URL = "https://www.instagram.com/archelabs.br/";

export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const niches = [
  "Academias",
  "Clínicas médicas",
  "Odontologia",
  "Advocacia",
  "Restaurantes",
  "Estética",
  "Imobiliárias",
  "Contabilidade",
  "Psicologia",
  "Escolas e cursos",
  "Veterinárias",
  "Serviços residenciais",
];

export const differentials = [
  {
    title: "Estrutura profissional",
    text: "Etapas definidas, prazos comunicados e entregas organizadas. Você sabe o que acontece em cada fase, o que precisa enviar e quando recebe a próxima versão.",
    tag: "Processo",
  },
  {
    title: "Você é dono de tudo",
    text: "Domínio, código e hospedagem 100% no seu nome. Sem amarras, sem burocracia se um dia decidir trocar de fornecedor.",
    tag: "Propriedade",
  },
  {
    title: "Performance desde o primeiro acesso",
    text: "Carregamento rápido e navegação fluida. Cada projeto é otimizado para que seus visitantes encontrem o que precisam sem demora.",
    tag: "Velocidade",
  },
  {
    title: "Feito para converter, não só para existir",
    text: "Cada seção conduz o visitante à ação: WhatsApp sempre acessível, contato visível e conteúdo que responde dúvidas antes do clique.",
    tag: "Conversão",
  },
];

export const steps = [
  {
    title: "Descoberta",
    text: "Você responde um briefing objetivo e envia os materiais disponíveis. A partir disso, entendemos o negócio, o público e o que a página precisa comunicar.",
    you: "Responder o briefing e enviar logo, fotos e informações.",
    us: "Analisar o negócio, o público e a concorrência.",
  },
  {
    title: "Estratégia",
    text: "Definimos a estrutura de seções, a hierarquia de informações e a direção visual antes de construir. Isso evita retrabalho e mantém o foco.",
    you: "Validar a estrutura e a direção visual proposta.",
    us: "Desenhar o roteiro de seções e a narrativa de conversão.",
  },
  {
    title: "Construção",
    text: "Design e desenvolvimento acontecem juntos. Cada seção nasce com código limpo, responsivo e otimizado para performance.",
    you: "Acompanhar — nada a fazer nesta fase.",
    us: "Desenhar e programar a página, mobile primeiro.",
  },
  {
    title: "Revisão",
    text: "Você recebe a versão navegável para avaliar. As revisões incluídas no plano são aplicadas aqui, com prazo e escopo definidos.",
    you: "Navegar pela página e enviar os ajustes de uma vez.",
    us: "Aplicar as revisões incluídas no plano.",
  },
  {
    title: "Lançamento",
    text: "Configuração de domínio, SSL e publicação. O site vai ao ar com tudo verificado — links, formulários, responsividade e velocidade.",
    you: "Aprovar a versão final.",
    us: "Configurar domínio, SSL, testes e publicar.",
  },
  {
    title: "Continuidade",
    text: "Após a entrega, você escolhe: recebe os acessos completos para gerir por conta própria ou contrata o Arche Care para manutenção contínua.",
    you: "Escolher entre autonomia total ou Arche Care.",
    us: "Entregar acessos ou manter a página evoluindo.",
  },
];

export type Plan = {
  id: string;
  name: string;
  sections: string;
  price: number;
  priceLabel?: string;
  desc: string;
  deadline: string;
  revisions: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "start",
    name: "Arche Start",
    sections: "Até 6 seções",
    price: 997,
    desc: "Para negócios que precisam colocar uma presença profissional no ar rapidamente.",
    deadline: "3–5 dias úteis",
    revisions: "1 rodada",
    features: [
      "Landing page responsiva",
      "Até 6 seções",
      "Estruturas de alto resultado Arche Labs",
      "Adaptação de cores, textos, imagens e identidade",
      "Botão para WhatsApp",
    ],
  },
  {
    id: "pro",
    name: "Arche Pro",
    sections: "Até 10 seções",
    price: 1697,
    desc: "O melhor equilíbrio entre preço, personalização e recursos para a maioria dos negócios.",
    deadline: "5–7 dias úteis",
    revisions: "2 rodadas",
    featured: true,
    features: [
      "Tudo do Arche Start",
      "Até 10 seções",
      "Personalização avançada do layout",
      "Estrutura desenhada para gerar contatos",
      "Apoio na criação de textos persuasivos",
      "Preparação para Meta Pixel e Google Tag",
      "Otimização básica de performance",
    ],
  },
  {
    id: "custom",
    name: "Arche Custom",
    sections: "Conforme o projeto",
    price: 2997,
    priceLabel: "a partir de",
    desc: "Para projetos que exigem identidade visual e estrutura específicas.",
    deadline: "7–14 dias úteis",
    revisions: "3 rodadas",
    features: [
      "Layout 100% personalizado",
      "Estrutura definida pelo negócio",
      "Maior liberdade visual",
      "Copywriting estratégico completo",
      "Integrações específicas mediante análise",
    ],
  },
];

export const addons = [
  {
    id: "panel",
    name: "Painel de edição",
    desc: "Edite textos e imagens básicos sem depender de ninguém.",
    price: 300,
    recurring: false,
  },
  {
    id: "care",
    name: "Arche Care",
    desc: "Manutenção contínua, ajustes e monitoramento. Opcional.",
    price: 0,
    recurring: true,
  },
];

export const careItems = [
  {
    icon: "activity",
    title: "Monitoramento contínuo",
    detail: "Disponibilidade, velocidade e formulários verificados. Se algo sair do lugar, nós vemos antes do seu cliente.",
  },
  {
    icon: "shield",
    title: "Segurança e SSL",
    detail: "Certificado renovado, dependências atualizadas e domínio acompanhado — sem surpresas de vencimento.",
  },
  {
    icon: "database",
    title: "Backups e versões",
    detail: "Cópias regulares do site e histórico de versões. Qualquer alteração pode ser revertida com segurança.",
  },
  {
    icon: "wrench",
    title: "Pequenas alterações",
    detail: "Troca de textos, imagens, preços e horários. Você pede, nós ajustamos — sem abrir um novo projeto.",
  },
];

export const testimonials = [
  { q: "O processo foi muito claro do início ao fim. Eu sabia o que precisava enviar e o que aconteceria em cada etapa.", tag: "Processo", mono: "RS" },
  { q: "A página finalmente conseguiu explicar nosso serviço sem complicar. Ficou direta, profissional e fácil de apresentar.", tag: "Clareza", mono: "MC" },
  { q: "No celular ficou tão boa quanto no computador. A navegação é rápida e o contato pelo WhatsApp está sempre simples.", tag: "Mobile", mono: "AL" },
  { q: "Cheguei com as ideias soltas e saí com uma apresentação organizada, coerente e muito mais segura para divulgar.", tag: "Estratégia", mono: "JP" },
  { q: "A entrega foi objetiva e bem acompanhada. Cada decisão tinha um motivo e os ajustes ficaram fáceis de aprovar.", tag: "Entrega", mono: "FB" },
  { q: "Agora temos um link que representa melhor o negócio e conduz o visitante para a conversa certa sem distrações.", tag: "Conversão", mono: "CT" },
];

export const faqs = [
  {
    q: "Quanto tempo demora?",
    a: "Arche Start: 3 a 5 dias úteis. Arche Pro: 5 a 7 dias úteis. Arche Custom: 7 a 14 dias úteis, conforme a complexidade. O prazo conta apenas o desenvolvimento — espera por materiais, aprovações ou feedback não é contabilizada.",
  },
  {
    q: "Preciso ter domínio?",
    a: "Não precisa ter antes de começar. A Arche Labs auxilia na compra e configuração. O domínio é registrado em seu nome e a compra/renovação não está inclusa no preço padrão.",
  },
  {
    q: "Quem fornece os textos e imagens?",
    a: "O desenvolvimento começa após o briefing e o envio dos materiais. O Start inclui adaptação de textos e imagens, o Pro inclui apoio na criação e melhoria dos textos, e o Custom oferece copy e organização de conteúdo aprofundadas.",
  },
  {
    q: "O site fica no meu nome?",
    a: "Sim. Domínio, infraestrutura e código seguem princípios de portabilidade e ficam sob sua titularidade. Se um dia quiser mudar de fornecedor, leva tudo com você.",
  },
  {
    q: "Posso editar o conteúdo depois?",
    a: "Sim, com o Painel de edição opcional por R$ 300 (pagamento único). Ele permite editar conteúdos básicos do site e pode ser contratado com ou sem o Arche Care.",
  },
  {
    q: "Preciso contratar o Arche Care?",
    a: "Não. O Arche Care é um serviço recorrente e opcional de manutenção. Você pode receber todos os acessos e gerir a página por conta própria.",
  },
  {
    q: "Domínio e ferramentas de terceiros estão inclusos?",
    a: "Não. Domínio e serviços de terceiros (como hospedagens pagas ou ferramentas de automação) não fazem parte do preço padrão — mas orientamos na escolha e configuração.",
  },
];

