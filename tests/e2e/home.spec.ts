import { expect, test } from "@playwright/test";

test("collections, live templates, Aura and contact links", async ({ page }) => {
  test.setTimeout(90_000);
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("response", response => { if (response.status() >= 400) errors.push(String(response.status()) + " " + response.url()); });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Toda venda");
  const works = page.locator("#trabalhos");
  await works.getByRole("button", { name: "Coleção Presença", exact: true }).click();
  await works.getByRole("button", { name: "Restaurante", exact: true }).click();
  await expect(works.locator("h3")).toHaveText("Restaurante");
  const message = new URL((await works.getByRole("link", { name: "Quero esse template" }).getAttribute("href"))!).searchParams.get("text")!;
  expect(message).toContain("Arche Start");
  expect(message).toContain("Presença Restaurante");
  await works.getByRole("button", { name: "Arche Pro", exact: true }).click();
  await expect(works.locator("[data-template]")).toHaveCount(1);
  await expect(works.locator("h3")).toHaveText("Spa");
  const aura = works.locator("iframe");
  await expect(aura).toHaveAttribute("src", "/previews/pro/aura/spa/");
  await expect(aura.contentFrame().locator("body")).toContainText("Spa");
  await aura.contentFrame().locator('a[href$="/blog"]:visible').first().click();
  await expect.poll(() => aura.contentFrame().locator("body").evaluate(() => location.pathname)).toMatch(/\/blog\/?$/);
  await expect(aura.contentFrame().locator("h1")).toBeVisible();
  await works.getByRole("button", { name: "Recarregar prévia" }).click();
  await expect(works.locator("iframe").contentFrame().locator("body")).toContainText("Spa");
  await works.getByRole("button", { name: "Arche Start", exact: true }).click();
  await expect(works.locator("h3")).toHaveText("Restaurante");
  test.setTimeout(90_000);
  for (const collection of ["Coleção Essencial", "Coleção Presença"]) {
    await works.getByRole("button", { name: collection, exact: true }).click();
    const buttons = works.locator("[data-template]");
    await expect(buttons).toHaveCount(12);
    for (let i = 0; i < 12; i++) {
      await buttons.nth(i).click();
      const preview = works.locator("iframe");
      await expect(preview).toBeVisible();
      await expect(preview.contentFrame().locator("body")).not.toBeEmpty();
      await expect(preview.contentFrame().locator("h1")).toBeVisible();
      await expect(preview.contentFrame().locator(".demo-notice")).toContainText("Modelo demonstrativo — dados, imagens e valores são ilustrativos.");
      const thumbnail = buttons.nth(i).locator("img");
      await thumbnail.evaluate(async (image: HTMLImageElement) => { await image.decode(); });
    }
  }
  await works.getByRole("button", { name: "Próximo template" }).click();
  await expect(works.locator("h3")).toHaveText("Academia");
  await works.getByRole("button", { name: "Template anterior" }).click();
  await expect(works.locator("h3")).toHaveText("Clínica Veterinária");
  await expect(page.locator("footer").getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://www.instagram.com/archelabs.br/");
  await works.getByRole("button", { name: "Celular", exact: true }).click();
  await expect.poll(() => works.locator("iframe").contentFrame().locator("body").evaluate(() => innerWidth)).toBe(390);
  await works.getByRole("button", { name: "Tablet", exact: true }).click();
  await expect.poll(() => works.locator("iframe").contentFrame().locator("body").evaluate(() => innerWidth)).toBe(768);
  await works.getByRole("button", { name: "Desktop", exact: true }).click();
  await expect.poll(() => works.locator("iframe").contentFrame().locator("body").evaluate(() => innerWidth)).toBe(1440);
  await works.locator("iframe").contentFrame().locator("body").evaluate(() => scrollTo(0, 600));
  await expect.poll(() => works.locator("iframe").contentFrame().locator("body").evaluate(() => scrollY)).toBeGreaterThan(0);
  await works.getByRole("button", { name: "Recarregar prévia" }).click();
  await expect.poll(() => works.locator("iframe").contentFrame().locator("body").evaluate(() => scrollY)).toBe(0);
  expect(errors).toEqual([]);
});

test("quote totals, recurring care, notes and Custom estimate", async ({ page }) => {
  await page.goto("/");
  const pricing = page.locator("#planos");
  await pricing.getByRole("button", { name: /^Arche Start/ }).click();
  await pricing.getByRole("button", { name: /Painel de edição/ }).click();
  await pricing.getByRole("button", { name: /Arche Care/ }).click();
  await pricing.getByLabel("Conte um pouco sobre o projeto (opcional)").fill("Loja de São Paulo & catálogo");
  const link = pricing.getByRole("link", { name: "Continuar no WhatsApp" });
  const message = async () => new URL((await link.getAttribute("href"))!).searchParams.get("text")!;
  expect(await message()).toContain("Arche Start");
  expect(await message()).toMatch(/1\.297/);
  expect(await message()).toContain("mensal, sob consulta");
  expect(await message()).toContain("Loja de São Paulo & catálogo");
  await pricing.getByRole("button", { name: /^Arche Custom/ }).click();
  expect(await message()).toMatch(/a partir de R\$\s*3\.297/);
  await pricing.getByRole("button", { name: /Painel de edição/ }).click();
  expect(await message()).toMatch(/2\.997/);
  await pricing.getByRole("button", { name: /Arche Care/ }).click();
  expect(await message()).not.toContain("mensal, sob consulta");
});

test("small screens, hidden menu focus, Escape, FAQ and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  await expect(page.locator('#top div[style*="clip-path"]')).toHaveAttribute("style", /inset\(0(px)? 0(px)? 0%/);
  const menu = page.locator("#mobile-navigation");
  await expect(menu).toHaveAttribute("inert", "");
  const closedLink = menu.locator("a").first();
  await closedLink.evaluate((element: HTMLElement) => element.focus());
  expect(await closedLink.evaluate(element => document.activeElement === element)).toBe(false);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(menu).not.toHaveAttribute("inert", "");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await menu.getByRole("link", { name: "Projetos" }).click();
  await expect(menu).toHaveAttribute("inert", "");
  const question = page.locator("#faq").getByRole("button", { name: /Preciso ter domínio/ });
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  const answer = page.locator("#" + await question.getAttribute("aria-controls"));
  await expect(answer).toHaveAttribute("aria-hidden", "false");
  await question.click();
  await expect(answer).toHaveAttribute("aria-hidden", "true");
  for (const width of [320, 360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.getByRole("link", { name: "Tirar meu projeto do papel" }).click();
  await expect(page).toHaveURL(/#planos$/);
});
