# Portfólio da Arche Labs

Os itens temporários permanecem publicados com `status: "demo"` até serem
substituídos por cases reais. O componente não gera projetos automaticamente:
`portfolioProjects`, em `src/content/portfolio.ts`, é a fonte única da coleção.

## Substituir uma demonstração por um projeto real

1. Crie `public/assets/projects/nome-do-projeto/`.
2. Adicione a imagem de capa em WebP ou AVIF.
3. Substitua uma entrada de `portfolioProjects`, preservando um `id` único.
4. Altere `status` de `"demo"` para `"published"`.
5. Informe as dimensões reais em `imageWidth` e `imageHeight`.
6. Escreva um `imageAlt` que descreva o que a imagem comprova.
7. Se houver um destino público, adicione `href` com uma URL HTTPS.

Exemplo:

```ts
{
  id: "cliente-projeto",
  status: "published",
  name: "Nome do projeto",
  category: "Landing page",
  description: "O problema resolvido e o resultado principal.",
  image: "/assets/projects/cliente-projeto/cover.webp",
  imageAlt: "Página inicial do projeto Nome do projeto",
  imageWidth: 1440,
  imageHeight: 900,
  href: "https://projeto-do-cliente.com/",
}
```

## Hero

As três cenas do hero ficam em `heroProjectPreviews`. Elas são independentes da
coleção completa; adicionar cases ao portfólio não altera o primeiro viewport.

## Verificação antes de publicar

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```
