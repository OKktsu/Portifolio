# Portfólio — Marcelo Luan

Portfólio profissional de Marcelo Luan, desenvolvedor full-stack com foco em Angular, React, .NET, C# e SQL Server.

## Destaques

- Apresentação responsiva com identidade editorial e tema escuro
- Projetos com detalhes, tecnologias e links para demonstrações
- Currículo profissional disponível para download em PDF
- Navegação e modais acessíveis por teclado
- Metadados para SEO e compartilhamento em redes sociais
- Build otimizado com React e Vite

## Executar localmente

Requisitos: Node.js 20 ou superior.

```bash
pnpm install
pnpm run dev
```

Para validar a versão de produção:

```bash
pnpm run lint
pnpm run build
pnpm run preview
```

## Estrutura

```text
├── index.html          # Metadados e ponto de entrada
├── portfolio.jsx       # Conteúdo e componentes React
├── portfolio.css       # Design e responsividade
├── public/             # Imagens e arquivos públicos
└── vite.config.js      # Configuração do build
```

## Publicação

O projeto usa caminhos relativos para funcionar na Vercel, na Netlify e no GitHub Pages em `/Portifolio/`. O workflow em `.github/workflows/deploy.yml` publica automaticamente a versão de produção quando há um push na branch `main`.

## Contato

- [LinkedIn](https://www.linkedin.com/in/marcelo-luan/)
- [GitHub](https://github.com/OKktsu)
- [E-mail](mailto:marceloluan125@gmail.com)
