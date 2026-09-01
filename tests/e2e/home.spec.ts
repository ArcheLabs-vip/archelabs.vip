import { expect, test } from "@playwright/test";

async function revealPage(page: import("@playwright/test").Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let position = 0; position < height; position += 650) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), position);
    await page.waitForTimeout(45);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
}

test.describe("Arche Labs home", () => {
  test("desktop layout and conversion flow", async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("requestfailed", (request) => {
      failedRequests.push(`${request.method()} ${request.url()}`);
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });

    const heroHeading = page.getByRole("heading", { level: 1 });
    await expect(heroHeading).toContainText("Landing pages criadas");
    await expect(page.getByRole("navigation", { name: "Navegação principal" })).toBeVisible();
    const headingLines = await heroHeading.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return element.getBoundingClientRect().height / Number.parseFloat(style.lineHeight);
    });
    expect(headingLines).toBeLessThanOrEqual(2.1);
    await page.screenshot({ path: "artifacts/hero-desktop.png" });

    const primaryCta = page.getByRole("button", { name: "Iniciar projeto" }).first();
    const ctaBox = await primaryCta.boundingBox();
    expect(ctaBox).not.toBeNull();
    expect((ctaBox?.y ?? 900) + (ctaBox?.height ?? 0)).toBeLessThan(900);

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);

    await primaryCta.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading", { name: "Arche Pro" })).toBeVisible();

    const checkboxes = dialog.getByRole("checkbox");
    await checkboxes.nth(0).check();
    await checkboxes.nth(1).check();
    await dialog.getByLabel("Conte um pouco sobre o projeto").fill("Preciso gerar contatos pelo WhatsApp.");

    const whatsappLink = dialog.getByRole("link", { name: /Continuar pelo WhatsApp/ });
    await expect(whatsappLink).toHaveAttribute("href", /Painel%20de%20Conte%C3%BAdo%3A%20Sim/);
    await expect(whatsappLink).toHaveAttribute("href", /Arche%20Care%3A%20Sim/);

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();

    await page.getByText("Quanto tempo demora?").click();
    await expect(page.getByText(/O Arche Start tem prazo estimado/)).toBeVisible();

    await page.locator("#planos").scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await page.screenshot({ path: "artifacts/plans-desktop.png" });

    await revealPage(page);
    await page.screenshot({ path: "artifacts/home-desktop.png", fullPage: true });
    expect(consoleErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });

  test("mobile navigation and responsive layout", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.screenshot({ path: "artifacts/hero-mobile.png" });

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);

    const menuButton = page.getByRole("button", { name: "Abrir menu" });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.getByRole("navigation", { name: "Navegação móvel" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Projetos" }).last()).toBeVisible();

    await page
      .getByRole("navigation", { name: "Navegação móvel" })
      .getByRole("link", { name: "Serviços" })
      .click();
    await expect(page.getByRole("button", { name: "Abrir menu" })).toBeVisible();

    await page.locator("#planos").scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await page.screenshot({ path: "artifacts/plans-mobile.png" });

    await revealPage(page);
    await page.screenshot({ path: "artifacts/home-mobile.png", fullPage: true });
  });
});
