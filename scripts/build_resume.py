from pathlib import Path
from shutil import copy2
from reportlab.platypus import SimpleDocTemplate, Paragraph, HRFlowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor

ROOT = Path(__file__).resolve().parents[1]
out = ROOT / 'output/pdf/Curriculo_Marcelo_Luan_Atualizado.pdf'
out.parent.mkdir(parents=True, exist_ok=True)
backup = ROOT / 'output/pdf/Curriculo_antes_AgendaPro.pdf'
previous = ROOT / 'output/pdf/Curriculo_antes_atualizacao_outubro.pdf'
if not previous.exists() and out.exists():
    copy2(out, previous)
if not backup.exists():
    copy2(ROOT / 'public/curriculo-marcelo-luan.pdf', backup)
body = ParagraphStyle('body', fontName='Helvetica', fontSize=9, leading=12, textColor=HexColor('#25282c'), spaceAfter=4)
heading = ParagraphStyle('heading', parent=body, fontName='Helvetica-Bold', fontSize=10, spaceBefore=10, spaceAfter=4)
small = ParagraphStyle('small', parent=body, fontSize=8, leading=10, textColor=HexColor('#555b62'))
title = ParagraphStyle('title', parent=body, fontName='Helvetica-Bold', fontSize=19, leading=23)
story = []
def p(text, style=body): story.append(Paragraph(text, style))
def section(text):
    p(text, heading)
    story.append(HRFlowable(width='100%', thickness=.4, color=HexColor('#c6cbd1'), spaceAfter=5))
def link(url, label): return f'<link href="{url}" color="#333333">{label}</link>'
p('Marcelo Luan Pinheiro de Mello', title)
p('DESENVOLVEDOR FULL STACK', heading)
p('Curitiba, PR | (41) 98482-1419 | marcelo.luan.dev@gmail.com', small)
p(' | '.join([link('https://www.linkedin.com/in/marcelo-luan/', 'LinkedIn'), link('https://github.com/OKktsu', 'GitHub'), link('https://portifolio-two-delta-16.vercel.app', 'Portfólio')]), small)
section('RESUMO PROFISSIONAL')
p('Desenvolvedor Full Stack Júnior com atuação na evolução de sistemas e na transformação de fluxos dispersos em componentes reutilizáveis. Experiência em refatoração de alertas, integração de notificações e melhoria de consultas. Em projetos próprios, aprofundo isolamento entre empresas, processamento assíncrono e testes de integração com infraestrutura real.')
section('EXPERIÊNCIA PROFISSIONAL')
p('<b>Faso | Desenvolvedor Full Stack Júnior</b><br/>fev. 2025 - atual | Curitiba, PR')
for text in [
'Consolidei cerca de 7 a 8 fluxos de alertas em C#/.NET, substituindo lógicas duplicadas por métodos curtos, descritivos e reutilizáveis.',
'Centralizei a preparação e o envio de mensagens via WhatsApp, padronizando notificações e facilitando a inclusão de novos alertas.',
'Otimizei consultas em MongoDB ao revisar o fluxo de busca e limitar o retorno aos dados necessários, reduzindo processamento desnecessário.',
'Participei da concepção e implementação de funcionalidades, contribuindo com requisitos, proposta técnica e desenho de soluções.',
'Atuação com Scrum, Kanban, GitFlow e acompanhamento de entregas no Azure DevOps.'
]: p('• ' + text)
section('PROJETOS EM DESTAQUE')
p('<b>AgendaPro | Agendamento e qualidade automatizada</b><br/>Node.js, TypeScript, Fastify, React, PostgreSQL, Prisma, Redis, BullMQ e Vitest')
p('Implementei autenticação JWT, permissões por empresa, bancos dedicados e proteção contra reservas sobrepostas no PostgreSQL. Lembretes com outbox transacional, dispatcher e worker separados em Redis/BullMQ; processamento simulado e idempotente no banco. CI no GitHub Actions com lint, testes, build e integração com PostgreSQL e Redis reais, incluindo isolamento e recuperação de falhas.')
p(link('https://github.com/OKktsu/AgendaPro', 'Repositório e documentação técnica'), small)
p('<b>Mensagens | Comunicação em tempo real</b><br/>React, TypeScript, Node.js, Express, PostgreSQL e Prisma')
p('Aplicação de mensagens com autenticação JWT, comunicação em tempo real via Socket.IO e chamadas via WebRTC; estudo de integração entre interface, API e persistência.')
p(link('https://frontend-beta-kohl-59.vercel.app/', 'Demonstração') + ' | ' + link('https://github.com/OKktsu/Mensagens', 'Repositório'), small)
p('<b>MenuBuilder | Cardápios digitais</b><br/>Angular, C#/.NET e SQL Server. Desenvolvimento e manutenção de funcionalidades para gestão de cardápios.')
p(link('https://github.com/OKktsu/MenuBuilderBack', 'Repositório'), small)
section('COMPETÊNCIAS TÉCNICAS')
p('<b>Front-end:</b> Angular, React, TypeScript, JavaScript, HTML e CSS.<br/><b>Back-end e dados:</b> C#, .NET, Node.js, Fastify, Express, APIs REST, Prisma, SQL Server, PostgreSQL, MongoDB, Redis e BullMQ.<br/><b>Qualidade e entrega:</b> Vitest, testes de integração, GitHub Actions (CI), Docker, Git, GitFlow, Azure DevOps, Clean Code e SOLID.')
section('FORMAÇÃO')
p('Análise e Desenvolvimento de Sistemas - PUCPR | 2024 - 2026 (em andamento)<br/>Técnico em Mecatrônica - SENAI | concluído')
SimpleDocTemplate(str(out), pagesize=(595.28,841.89), leftMargin=50,rightMargin=50,topMargin=38,bottomMargin=35).build(story)
copy2(out, ROOT / 'public/curriculo-marcelo-luan.pdf')
print(out)
