export interface BuildWhatsAppLinkInput {
  plan: string;
  price: string;
  contentPanel: boolean;
  care: boolean;
  observation?: string;
  phoneNumber?: string;
}

export interface WhatsAppLinkResult {
  message: string;
  url: string;
}

const EMPTY_OBSERVATION = "Não informada.";

export function buildWhatsAppLink({
  plan,
  price,
  contentPanel,
  care,
  observation,
  phoneNumber,
}: BuildWhatsAppLinkInput): WhatsAppLinkResult {
  const normalizedObservation = observation?.trim() || EMPTY_OBSERVATION;
  const sanitizedPhoneNumber = (phoneNumber ?? "").replace(/\D/g, "");

  const message = [
    "Olá! Tenho interesse em um projeto da Arche Labs.",
    "",
    `Plano: ${plan.trim()}`,
    `Preço: ${price.trim()}`,
    `Painel de Conteúdo: ${contentPanel ? "Sim" : "Não"}`,
    `Arche Care: ${care ? "Sim" : "Não"}`,
    "",
    "Observação:",
    normalizedObservation,
  ].join("\n");

  const recipient = sanitizedPhoneNumber ? `/${sanitizedPhoneNumber}` : "/";

  return {
    message,
    url: `https://wa.me${recipient}?text=${encodeURIComponent(message)}`,
  };
}
