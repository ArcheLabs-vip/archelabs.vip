# Arche Labs

Landing page da Arche Labs em React, TypeScript, Vite e Tailwind CSS.

## Desenvolvimento

1. Execute `npm install`.
2. Copie `.env.example` para `.env.local` e configure `VITE_WHATSAPP_NUMBER` com país e DDD, somente dígitos.
3. Execute `npm run dev`.

Sem número configurado, o WhatsApp recebe a mensagem sem destinatário fixo. O build usa o valor da variável no momento da compilação. O Instagram oficial é https://www.instagram.com/archelabs.br/.

## Estrutura ativa

- `src/main.tsx`: inicialização, fontes e CSS.
- `src/redesign/App.tsx`: composição da página.
- `src/redesign/components/`: componentes em produção.
- `src/redesign/data.ts`: planos, adicionais, conteúdo e contatos.
- `src/content/portfolio.ts`: planos da galeria, coleções e templates.
- `src/components/Brand.tsx`: marca compartilhada.
- `src/redesign/hooks/`: entrada em tela e pausa de animações.
- `src/hooks/useMotionPrefs.ts`: preferência de movimento reduzido, inclusive alterações durante a visita.
- `src/lib/whatsapp.ts`: montagem e codificação da mensagem do configurador.

A galeria envia plano, coleção e template diretamente ao WhatsApp. O configurador de planos permite escolher adicionais e observações; é um fluxo independente.

## Verificação

`npm run lint` — ESLint.  
`npm run typecheck` — TypeScript.  
`npm test` — catálogo, imagens e mensagem de WhatsApp.  
`npm run test:e2e` — galeria, configurador, acessibilidade e responsividade.  
`npm run build` — publicação em `dist/`.

Instale o navegador dos testes uma vez com `npx playwright install chromium`.

## Imagens e conteúdo

Os assets publicados estão em `public/assets/`. O logo da interface usa `brand/arche-labs-logo-128.webp`; o JPEG permanece para favicon e compartilhamento. As prévias usam WebP completo e variantes de 480/960 px. Consulte `PORTFOLIO.md` para cadastrar templates.

As métricas visuais fixas e os relatos são identificados na interface como ilustrativos. Para publicar depoimentos reais, substituir os exemplos e a identificação somente após validar a origem.

## Arquivos locais preservados

A limpeza de setembro/2026 moveu os componentes antigos para `referencia/legado/` e os PNGs originais para `referencia/originais-assets/`. Essas pastas não são publicadas e são ignoradas pelo Git: são cópias locais, não um backup remoto.

`dist/`, `artifacts/` e `test-results/` são saídas regeneráveis. O histórico da auditoria está em `ANALISE_PROJETO.md`.
