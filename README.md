# Arche Labs

Landing page institucional e comercial da Arche Labs, construída a partir dos documentos em `referencia/`.

## Stack

- React 19 e TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide
- Vitest e Playwright

## Desenvolvimento

```bash
npm install
npm run dev
```

Copie `.env.example` para `.env.local` e preencha `VITE_WHATSAPP_NUMBER` apenas com dígitos, incluindo o código do país. Sem essa variável, o botão abre o WhatsApp com a mensagem pronta e sem destinatário fixo.

## Verificação

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Para os testes de navegador, instale o Chromium do Playwright uma vez:

```bash
npx playwright install chromium
npm run test:e2e
```

## Assets de marca

- Original de referência: `referencia/logo.png`
- Variante otimizada usada no site: `public/assets/brand/arche-labs-logo-optimized.jpg`
