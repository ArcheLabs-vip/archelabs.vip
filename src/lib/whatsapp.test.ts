import { describe, expect, it } from "vitest";

import { buildWhatsAppLink } from "./whatsapp";

describe("buildWhatsAppLink", () => {
  it("preserva acentos na mensagem e os codifica na URL", () => {
    const result = buildWhatsAppLink({
      plan: "Arche Pró",
      price: "R$ 1.197",
      contentPanel: true,
      care: false,
      observation: "Preciso de uma página rápida para São Paulo.",
    });

    expect(result.message).toBe(
      [
        "Olá! Tenho interesse em um projeto da Arche Labs.",
        "",
        "Plano: Arche Pró",
        "Preço: R$ 1.197",
        "Painel de Conteúdo: Sim",
        "Arche Care: Não",
        "",
        "Observação:",
        "Preciso de uma página rápida para São Paulo.",
      ].join("\n"),
    );
    expect(result.url).toBe(
      `https://wa.me/?text=${encodeURIComponent(result.message)}`,
    );
    expect(new URL(result.url).searchParams.get("text")).toBe(result.message);
  });

  it("converte as opções booleanas para Sim e Não", () => {
    const result = buildWhatsAppLink({
      plan: "Arche Start",
      price: "R$ 697",
      contentPanel: false,
      care: true,
      observation: "Enviar proposta.",
    });

    expect(result.message).toContain("Painel de Conteúdo: Não");
    expect(result.message).toContain("Arche Care: Sim");
  });

  it("usa um texto explícito quando a observação está vazia", () => {
    const result = buildWhatsAppLink({
      plan: "Arche Custom",
      price: "A partir de R$ 1.997",
      contentPanel: false,
      care: false,
      observation: "   ",
    });

    expect(result.message).toContain("Observação:\nNão informada.");
    expect(result.url).toBe(
      `https://wa.me/?text=${encodeURIComponent(result.message)}`,
    );
  });

  it("remove todos os caracteres não numéricos do telefone", () => {
    const result = buildWhatsAppLink({
      plan: "Arche Pro",
      price: "R$ 1.197",
      contentPanel: true,
      care: true,
      observation: "Quero começar.",
      phoneNumber: "+55 (11) 98765-4321",
    });

    expect(result.url).toBe(
      `https://wa.me/5511987654321?text=${encodeURIComponent(result.message)}`,
    );
  });
});
