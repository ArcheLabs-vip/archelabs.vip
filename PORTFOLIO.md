# Catálogo de templates

A fonte única é `src/content/portfolio.ts`.

## Planos e coleções

- `collectionPlans` relaciona o ID do plano aos IDs das coleções.
- `projectCollections` define os nomes públicos de cada coleção.
- `portfolioProjects` contém os templates, imagens e descrições.

Start inclui `essencial` e `presenca`. Pro inclui `aura` e pode receber novas coleções. Coleções sem templates exibem o estado “Em breve”, sem imagens fictícias.

## Adicionar um template

1. Prepare o WebP principal e, quando disponíveis, suas variantes de 480 e 960 px em `public/assets/projects/<colecao>/`.
2. Cadastre um ID único, `collectionId`, nome, categoria, descrição e texto alternativo.
3. Informe `image`, `imageWidth` e `imageHeight` reais.
4. Informe `thumbnail` explicitamente. Sem ela, a galeria usa a imagem principal. Se a miniatura falhar, a interface tenta a principal uma vez.
5. Informe `imageSrcSet` com URLs e larguras reais para as imagens responsivas.
6. Informe `previewUrl` apontando para a página inicial do template compilado em `public/previews/`. A galeria carrega essa URL em um iframe interativo; as imagens são usadas apenas nas miniaturas.

Para sincronizar os 25 templates atuais, compile o projeto irmão `../templates` e execute `node scripts/sync-template-previews.mjs` neste projeto. O script utiliza os prints originais, gera os WebPs e copia apenas as prévias compiladas. Cores e coleção Natural são excluídos, assim como os arquivos e páginas de consulta de código da biblioteca.

Exemplo de atributos de imagem:

`thumbnail: "/assets/projects/aura/aura-academias-480.webp"`  
`imageSrcSet: "/assets/projects/aura/aura-academias-480.webp 480w, /assets/projects/aura/aura-academias-960.webp 960w, /assets/projects/aura/aura-academias.webp 1400w"`

Não cadastrar um caminho sem o arquivo correspondente. Os testes verificam a existência das imagens do catálogo.

`status: "published"` neste catálogo indica um template disponível, não prova de um case real de cliente. O campo opcional `href` é metadado e não abre uma demonstração na galeria atual. O CTA envia o plano, a coleção e o template para o WhatsApp.

## Adicionar uma coleção

Adicione seu ID/nome em `projectCollections` e o ID em `collectionPlans`. Depois inclua os templates com esse `collectionId`. Não é necessário editar o componente da galeria.

## Hero e validação

O hero utiliza uma cena própria de academia em `src/redesign/components/Hero.tsx`; não depende de um catálogo separado de previews.

Execute `npm run lint`, `npm test`, `npm run test:e2e` e `npm run build` após alterar o catálogo.
