# Portfólio — Marcelo Luan

Portfólio profissional de Marcelo Luan, desenvolvedor full-stack com foco em Angular, React, .NET, C# e SQL Server.

## Destaques

- Apresentação responsiva com identidade editorial e tema escuro
- Projetos com detalhes, tecnologias e links para demonstrações
- Currículo profissional disponível para download em PDF
- Navegação e modais acessíveis por teclado
- Metadados para SEO e compartilhamento em redes sociais
- Build otimizado com React e Vite
- AgendaPro com multitenancy, lembretes em Redis/BullMQ e testes com infraestrutura real
- Menu móvel, controles de projetos por toque e download do currículo atualizado
- Contato principal direto pelo WhatsApp, com e-mail como alternativa

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

O site principal é https://portifolio-two-delta-16.vercel.app/ e a integração da Vercel publica os pushes na branch `main`.

O projeto usa caminhos relativos, compatíveis também com Netlify e GitHub Pages em `/Portifolio/`. O workflow em `.github/workflows/deploy.yml` é uma alternativa para Pages e exige que esse serviço esteja habilitado e configurado para GitHub Actions no repositório. Uma falha nessa alternativa não impede o deploy independente na Vercel.

## Contato

- [LinkedIn](https://www.linkedin.com/in/marcelo-luan/)
- [GitHub](https://github.com/OKktsu)
- [WhatsApp](https://wa.me/5541984821419)
- [E-mail](mailto:marcelo.luan.dev@gmail.com)

## Atualizar o currículo

Com Python e ReportLab disponíveis, execute `python scripts/build_resume.py`.
O script gera o PDF em `output/pdf/` e atualiza a cópia pública usada no download.
As versões anteriores, relatórios e capturas locais em `output/` e `tmp/` não são publicados pelo Git.
