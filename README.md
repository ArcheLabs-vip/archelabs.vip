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

A seleção usa prints atuais e exibe os templates funcionando em desktop (1440 px), tablet (768 px) e celular (390 px). São 12 templates Essencial, 12 Presença e o Spa Aura. Cores e coleção Natural ficam fora do site. Apenas arquivos compilados das prévias são publicados; as páginas e exportações de código da biblioteca não são copiadas.

Para atualizar as prévias e miniaturas, primeiro execute `npm run build` no projeto irmão `../templates`, depois execute `node scripts/sync-template-previews.mjs` neste projeto. O script exige a biblioteca e suas dependências locais, mas o site publicado funciona sozinho. `public/previews/` contém as páginas e assets de cada template; mantenha a resolução de `index.html` por diretório na hospedagem para os links internos funcionarem.

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

## Deploy na Cloudflare Workers

O projeto usa Workers Static Assets. O `wrangler.jsonc` publica somente `dist/`, compila o site antes do deploy e preserva a resolução das páginas em `/previews/`.

No Workers Builds, conecte `ArcheLabs-vip/archelabs.vip`, branch `main`, com raiz do repositório, build `npm run build` e deploy `npm run deploy`. O nome do Worker deve ser `archelabs-vip`, igual ao arquivo de configuração. Configure `VITE_WHATSAPP_NUMBER` nas variáveis de build quando necessário.

Para publicar pelo terminal já autenticado na Cloudflare:

```sh
npm ci
npm run deploy
```

Para validar a configuração e o build sem publicar:

```sh
npx wrangler deploy --dry-run
```
