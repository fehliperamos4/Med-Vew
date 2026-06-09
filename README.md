# MedVew

Projeto de portal médico com navegação entre telas, formulários e painel de exames. O projeto usa Bootstrap 5 com CSS customizado para responsividade e experiência mobile.

## Checklist implementado

- **ID 02**: Layout responsivo com Bootstrap + grid e componentes.
- **ID 03**: Página `app/pages/login/login.html` com layout responsivo em CSS puro (Grid + relative units).
- **ID 04**: Uso de componentes Bootstrap como `card`, `btn`, `modal` e `form-select`.
- **ID 05**: Layout fluido com unidades relativas (`rem`, `clamp`, `%`).
- **ID 07**: Sass configurado no projeto com variáveis e mixins.
- **ID 08**: Tipografia responsiva usando `clamp()` e breakpoints mobile-first.
- **ID 09**: Imagens responsivas com `.img-fluid`, `object-fit` e `picture`/`source` adaptativos.
- **ID 10**: Exemplo de imagem otimizada com `webp` no componente `picture`.
- **ID 15**: `package.json` preparado para Node.js/NPM com scripts de build e lint.
- **ID 16**: `gitignore` incluído para boas práticas de versionamento.
- **ID 17**: README padronizado com instruções de uso.
- **ID 18**: Organização modular de páginas e assets.
- **ID 19**: ESLint e Prettier configurados para manter qualidade de código.

## Como usar

1. Instale dependências:
   ```bash
   npm install
   ```

2. Gere o CSS global a partir do Sass:
   ```bash
   npm run sass
   ```

3. Abra as páginas HTML no navegador ou use um servidor local.

## Estrutura de pastas

- `app/pages/` — arquivos HTML das páginas.
- `assets/resources/styles/` — estilos globais e por página.
- `assets/resources/scripts/` — scripts JavaScript da página.
