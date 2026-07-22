import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./portfolio.css";

const CV_URL = `${import.meta.env.BASE_URL}curriculo-marcelo-luan.pdf`;

// ---------- DATA ----------
const PROJECTS = [
  {
    id: "menubuilder",
    num: "01",
    title: "MenuBuilder",
    subtitle: "Cardápios QR inteligentes",
    desc: "Plataforma SaaS para restaurantes gerenciarem cardápios digitais em tempo real. Painel administrativo, geração de QR único e pedidos sem contato.",
    tags: ["Angular", "TypeScript", "C#", ".NET", "SQL Server"],
    status: "Em desenvolvimento",
    img: "img/MenuBuilder.webp",
    link: "https://menu-builder-front.vercel.app/login",
    role: "Full-stack",
    year: "2025—"
  },
  {
    id: "infra",
    num: "02",
    title: "Projeto Infra",
    subtitle: "Estudo de arquitetura Angular",
    desc: "Aplicação para estudo aprofundado de componentes, rotas, guards e serviços. Foco em estrutura modular e padrões de comunicação.",
    tags: ["Angular", "TypeScript"],
    status: "Live",
    img: "img/projeto-infra.webp",
    link: "https://infraprojeto.netlify.app/login",
    role: "Frontend",
    year: "2024"
  },
  {
    id: "sidebar",
    num: "03",
    title: "Sidebar",
    subtitle: "DOM e interatividade",
    desc: "Componente de navegação lateral construído do zero. Estudo de manipulação direta do DOM, transições e estados.",
    tags: ["JavaScript", "CSS"],
    status: "Live",
    img: "img/sidebar.webp",
    link: "https://okktsu.github.io/Sidebar/",
    role: "Frontend",
    year: "2024"
  },
  {
    id: "netflix",
    num: "04",
    title: "Netflix Login Clone",
    subtitle: "Recriação fiel de UI",
    desc: "Recriação da tela de login da Netflix com foco em estruturação semântica e estilização precisa.",
    tags: ["HTML", "CSS"],
    status: "Live",
    img: "img/projeto-netflix.webp",
    link: "https://okktsu.github.io/Projeto_NetflixLogin/",
    role: "Frontend",
    year: "2023"
  },
  {
    id: "mensagens",
    num: "05",
    title: "Mensagens",
    subtitle: "Chat full-stack em tempo real",
    desc: "Aplicação de mensagens criada para estudar arquitetura full-stack. Reúne autenticação JWT, API REST organizada em controllers e services, conversas persistidas e entrega de novas mensagens em tempo real com Socket.IO.",
    tags: ["React", "TypeScript", "Node.js", "Express", "SQLite", "Prisma", "Socket.IO"],
    status: "Em desenvolvimento",
    cover: "radial-gradient(circle at 22% 28%, rgba(255,255,255,.96) 0 7%, transparent 7.5%), linear-gradient(135deg, transparent 0 18%, rgba(255,255,255,.2) 18% 42%, transparent 42%), radial-gradient(circle at 70% 65%, rgba(255,255,255,.9) 0 12%, transparent 12.5%), linear-gradient(135deg, #16213e, #5b4bdb 55%, #16a085)",
    link: null,
    role: "Full-stack",
    year: "2026—"
  }
];

const EXPERIENCE = [
  {
    role: "Desenvolvedor Full-stack",
    org: "Projetos PJ",
    period: "2025 — atual",
    desc: "Atuo na criação de funcionalidades e sustentação de plataformas com Angular e .NET. Refatoro módulos legados com Clean Code e SOLID, otimizo consultas SQL Server e melhoro a performance do front-end com Lazy Loading e Change Detection.",
    stack: ["Angular", "TypeScript", ".NET", "C#", "SQL Server", "Clean Code"]
  },
  {
    role: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    org: "PUCPR",
    period: "2023 — 2026",
    desc: "Formação em desenvolvimento de software, banco de dados e engenharia de sistemas, com conclusão prevista para 2026.",
    stack: ["Engenharia de Software", "Banco de Dados", "Metodologias Ágeis"]
  },
  {
    role: "Técnico em Mecatrônica",
    org: "SENAI",
    period: "concluído em 2022",
    desc: "Formação técnica que fortaleceu minha base em lógica, automação, análise de sistemas e resolução estruturada de problemas.",
    stack: ["Automação", "Lógica", "Resolução de Problemas"]
  }
];

const SKILLS = [
  { group: "Frontend", items: ["Angular 14+", "React", "TypeScript", "Tailwind CSS", "Bootstrap"] },
  { group: "Backend", items: ["C#", ".NET Core / Framework", "Node.js", "Express"] },
  { group: "Dados", items: ["SQL Server", "MongoDB", "SQLite", "Prisma"] },
  { group: "DevOps & entrega", items: ["Git / GitFlow", "Docker", "Azure DevOps", "Vercel"] },
  { group: "Métodos", items: ["Scrum", "Kanban"] }
];

// ---------- UTIL HOOKS ----------
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100, hover: false });
  useEffect(() => {
    const onMove = (e) => {
      setPos((p) => ({ ...p, x: e.clientX, y: e.clientY }));
    };
    const onOver = (e) => {
      const tag = e.target.closest("a,button,[data-cursor]");
      setPos((p) => ({ ...p, hover: !!tag }));
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);
  return pos;
}

// ---------- COMPONENTS ----------
function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms cubic-bezier(.2,.8,.2,1) ${delay}ms, transform 700ms cubic-bezier(.2,.8,.2,1) ${delay}ms`
      }}
    >
      {children}
    </Tag>
  );
}

function Cursor() {
  const { x, y, hover } = useCursor();
  return (
    <div
      aria-hidden
      className="cursor-dot"
      style={{
        transform: `translate(${x}px, ${y}px) scale(${hover ? 2.2 : 1})`,
        opacity: x < 0 ? 0 : 1
      }}
    />
  );
}

function Nav({ onContact }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const linkCls = "nav-link";
  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a href="#top" className="nav__brand">
        <span className="nav__mark">ML</span>
        <span className="nav__name">Marcelo Luan</span>
        <span className="nav__status"><i /> Curitiba, PR</span>
      </a>
      <nav className="nav__links">
        <a className={linkCls} href="#work"><span className="nav__num">01</span>Trabalho</a>
        <a className={linkCls} href="#about"><span className="nav__num">02</span>Sobre</a>
        <a className={linkCls} href="#stack"><span className="nav__num">03</span>Stack</a>
        <a className={linkCls} href="#contact"><span className="nav__num">04</span>Contato</a>
      </nav>
      <button className="nav__cta" onClick={onContact}>
        <span>Fale comigo</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </header>
  );
}

function Hero({ variant, showMarquee = true }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const tz = time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  if (variant === "terminal") return <HeroTerminal tz={tz} />;
  if (variant === "compact") return <HeroCompact tz={tz} />;
  return <HeroEditorial showMarquee={showMarquee} />;
}

function HeroEditorial({ showMarquee }) {
  return (
    <section id="top" className="hero">
      <h1 className="hero__title hero__title--xl">
        <span className="hero__line">Construo</span>
        <span className="hero__line hero__line--accent">
          software
          <span className="hero__cursor" />
        </span>
        <span className="hero__line">do banco</span>
        <span className="hero__line hero__line--accent">ao botão.</span>
      </h1>

      <div className="hero__bottom hero__bottom--big">
        <p className="hero__lede hero__lede--big">
          Marcelo Luan — desenvolvedor full-stack em Curitiba. Angular, .NET e experiência modernizando sistemas para ganhar performance, escala e manutenção.
        </p>
        <div className="hero__actions">
          <a href="#work" className="btn btn--primary btn--lg">
            Ver projetos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="#contact" className="btn btn--ghost btn--lg">Conversar</a>
          <a href={CV_URL} download className="btn btn--ghost btn--lg">Baixar currículo</a>
        </div>
      </div>

      {showMarquee && <div className="hero__marquee" aria-hidden="true">
        <div className="marquee__track">
          {Array(3).fill(0).map((_, i) => (
            <span key={i}>
              Angular <i className="dot" /> .NET <i className="dot" /> TypeScript <i className="dot" /> SQL Server <i className="dot" /> C# <i className="dot" /> Docker <i className="dot" /> Git <i className="dot" /> MongoDB <i className="dot" />{" "}
            </span>
          ))}
        </div>
      </div>}
    </section>
  );
}

function HeroTerminal({ tz }) {
  const lines = [
    { p: "marcelo@portfolio", c: "~", cmd: "whoami" },
    { out: "Marcelo Luan — Desenvolvedor Full-stack" },
    { p: "marcelo@portfolio", c: "~", cmd: "cat stack.txt" },
    { out: "Angular · TypeScript · .NET · C# · SQL Server" },
    { p: "marcelo@portfolio", c: "~", cmd: "status --now" },
    { out: "Curitiba, PR · " + tz }
  ];
  return (
    <section id="top" className="hero hero--term">
      <div className="term">
        <div className="term__bar">
          <i style={{ background: "#ff5f57" }} />
          <i style={{ background: "#febc2e" }} />
          <i style={{ background: "#28c840" }} />
          <span>~/marcelo-luan — zsh</span>
        </div>
        <div className="term__body">
          {lines.map((l, i) => l.cmd ? (
            <div key={i} className="term__line">
              <span className="term__p">{l.p}</span><span className="term__c">{l.c}</span><span className="term__prompt">$</span>
              <span className="term__cmd">{l.cmd}</span>
            </div>
          ) : (
            <div key={i} className="term__out">{l.out}</div>
          ))}
          <div className="term__line">
            <span className="term__p">marcelo@portfolio</span><span className="term__c">~</span><span className="term__prompt">$</span>
            <span className="term__caret" />
          </div>
        </div>
      </div>
      <h1 className="hero__title hero__title--term">
        <span className="hero__line">Desenvolvedor</span>
        <span className="hero__line hero__line--accent">full-stack.</span>
      </h1>
      <p className="hero__lede">Banco ao botão. Arquitetura limpa, performance honesta, interfaces que respeitam quem usa.</p>
    </section>
  );
}

function HeroCompact({ tz }) {
  return (
    <section id="top" className="hero hero--compact">
      <div className="hero__compact-grid">
        <div>
          <span className="eyebrow"><i className="pulse" /> Curitiba, PR · {tz}</span>
          <h1 className="hero__title hero__title--compact">
            Marcelo Luan,<br/>
            <span className="hero__line--accent">desenvolvedor full-stack</span> em Curitiba.
          </h1>
          <p className="hero__lede">Construindo aplicações web do banco ao botão — Angular, .NET, e detalhes que importam.</p>
          <div className="hero__actions">
            <a href="#work" className="btn btn--primary">Ver projetos</a>
            <a href="#contact" className="btn btn--ghost">Conversar</a>
          </div>
        </div>
        <div className="hero__placeholder" data-cursor>
          <div className="ph-stripes" />
          <span className="ph-label">[ retrato — substituir ]</span>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ num, title, kicker }) {
  return (
    <Reveal className="section-label">
      <div className="section-label__num">{num}</div>
      <div>
        <span className="kicker">{kicker}</span>
        <h2 className="section-label__title">{title}</h2>
      </div>
    </Reveal>
  );
}

function ProjectsGrid({ onOpen, density }) {
  return (
    <section id="work" className="section">
      <SectionLabel num="01" kicker="Selected work" title="Projetos em destaque" />
      <ul className={`projects projects--${density}`}>
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.id} p={p} i={i} onOpen={onOpen} />
        ))}
      </ul>
    </section>
  );
}

function ProjectRow({ p, i, onOpen }) {
  const [ref, shown] = useReveal();
  const [hover, setHover] = useState(false);
  return (
    <li
      ref={ref}
      className={`project ${hover ? "project--hover" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(p)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(p);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Abrir detalhes do projeto ${p.title}`}
      data-cursor
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 700ms cubic-bezier(.2,.8,.2,1) ${i * 80}ms, transform 700ms cubic-bezier(.2,.8,.2,1) ${i * 80}ms`
      }}
    >
      <div className="project__num">{p.num}</div>
      <div className="project__main">
        <div className="project__head">
          <h3 className="project__title">{p.title}</h3>
          <span className={`status status--${p.status === "Live" ? "live" : "dev"}`}>
            <i /> {p.status}
          </span>
        </div>
        <p className="project__sub">{p.subtitle}</p>
      </div>
      <div className="project__meta">
        <div><span className="meta-key">role</span><span>{p.role}</span></div>
        <div><span className="meta-key">yr</span><span>{p.year}</span></div>
      </div>
      <div className="project__stack">
        {p.tags.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}
        {p.tags.length > 3 && <span className="tag tag--ghost">+{p.tags.length - 3}</span>}
      </div>
      <div className="project__arrow">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div
        className="project__preview"
        style={{
          backgroundImage: p.img ? `url(${p.img})` : p.cover,
          opacity: hover ? 1 : 0,
          transform: hover ? "translate(-50%, -50%) scale(1) rotate(0deg)" : "translate(-50%, -45%) scale(.92) rotate(-2deg)"
        }}
      />
    </li>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <SectionLabel num="02" kicker="About" title="Currículo, em prosa." />
      <div className="about">
        <Reveal className="about__lede" delay={80}>
          <p>
            Sou desenvolvedor full-stack com atuação no ecossistema Angular e .NET. Trabalho tanto na entrega de novas funcionalidades quanto na sustentação técnica e modernização de sistemas legados.
          </p>
          <p>
            Aplico Clean Code e SOLID para tornar módulos mais fáceis de manter, otimizo consultas em SQL Server e busco performance no front-end. Curso ADS na PUCPR e também sou técnico em Mecatrônica pelo SENAI.
          </p>
        </Reveal>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} className="tl-item" delay={120 + i * 100}>
              <div className="tl-item__dot" />
              <div className="tl-item__head">
                <span className="tl-item__period">{e.period}</span>
                <span className="tl-item__org">{e.org}</span>
              </div>
              <h3 className="tl-item__role">{e.role}</h3>
              <p className="tl-item__desc">{e.desc}</p>
              <div className="tl-item__stack">
                {e.stack.map((s) => <span key={s} className="tag tag--soft">{s}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="section">
      <SectionLabel num="03" kicker="Tech stack" title="Ferramentas em rotação." />
      <div className="stack">
        {SKILLS.map((skillGroup, gi) => (
          <Reveal key={skillGroup.group} className="stack__group" delay={gi * 100}>
            <h3 className="stack__group-title"><span className="meta-key">{String(gi + 1).padStart(2, "0")}</span>{skillGroup.group}</h3>
            <ul className="stack__list">
              {skillGroup.items.map((skill) => (
                <li key={skill} className="skill">
                  <span className="skill__mark" aria-hidden="true">→</span>
                  <span className="skill__name">{skill}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState("");
  const copy = (label, value) => {
    navigator.clipboard?.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(""), 1800);
  };
  const items = [
    { label: "Email", value: "marceloluan125@gmail.com", href: "mailto:marceloluan125@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/marcelo-luan", href: "https://www.linkedin.com/in/marcelo-luan/" },
    { label: "GitHub", value: "github.com/OKktsu", href: "https://github.com/OKktsu" },
    { label: "WhatsApp", value: "+55 (41) 98482-1419", href: "https://wa.me/5541984821419" }
  ];
  return (
    <section id="contact" className="section section--contact">
      <SectionLabel num="04" kicker="Contact" title="Vamos construir alguma coisa." />
      <div className="contact">
        <Reveal className="contact__intro" delay={80}>
          <p className="contact__big">
            Vamos conversar sobre <span className="hi">software bem construído</span>, modernização de sistemas, .NET ou Angular.
          </p>
          <a className="btn btn--primary btn--lg" href="mailto:marceloluan125@gmail.com">
            marceloluan125@gmail.com
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a className="btn btn--ghost btn--lg contact__cv" href={CV_URL} download>
            Baixar currículo em PDF
          </a>
        </Reveal>
        <ul className="contact__list">
          {items.map((c, i) => (
            <Reveal as="li" key={c.label} className="contact__row" delay={120 + i * 80}>
              <span className="meta-key">{String(i + 1).padStart(2, "0")}</span>
              <span className="contact__label">{c.label}</span>
              <span className="contact__val">{c.value}</span>
              <div className="contact__acts">
                <button onClick={() => copy(c.label, c.value)} className="contact__btn" title="Copiar">
                  {copied === c.label ? "copiado ✓" : "copiar"}
                </button>
                <a href={c.href} target="_blank" rel="noreferrer" className="contact__btn contact__btn--primary">abrir →</a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="foot__big">Marcelo&nbsp;Luan</div>
      <div className="foot__bottom">
        <span>© 2026 — feito à mão com HTML, CSS e café.</span>
        <a href="#top">voltar ao topo ↑</a>
      </div>
    </footer>
  );
}

function Modal({ project, onClose }) {
  const closeRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const dialog = closeRef.current?.closest("[role='dialog']");
      const focusable = [...(dialog?.querySelectorAll("a[href], button:not([disabled])") || [])];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previousFocusRef.current?.focus?.();
    };
  }, [project, onClose]);
  if (!project) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__sheet" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={(e) => e.stopPropagation()}>
        <div className="modal__media" style={{ backgroundImage: project.img ? `url(${project.img})` : project.cover }}>
          <button ref={closeRef} className="modal__close" onClick={onClose} aria-label="Fechar detalhes do projeto">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <div className="modal__num">{project.num}</div>
        </div>
        <div className="modal__body">
          <div className="modal__head">
            <div>
              <span className="kicker">{project.subtitle}</span>
              <h3 id="project-modal-title" className="modal__title">{project.title}</h3>
            </div>
            <span className={`status status--${project.status === "Live" ? "live" : "dev"}`}><i />{project.status}</span>
          </div>
          <p className="modal__desc">{project.desc}</p>
          <div className="modal__meta">
            <div><span className="meta-key">role</span>{project.role}</div>
            <div><span className="meta-key">year</span>{project.year}</div>
            <div><span className="meta-key">stack</span>{project.tags.join(" · ")}</div>
          </div>
          <div className="modal__actions">
            {project.link ? (
              <a href={project.link} target="_blank" rel="noreferrer" className="btn btn--primary">Ver demonstração →</a>
            ) : (
              <span className="tag tag--soft">Repositório privado</span>
            )}
            <button onClick={onClose} className="btn btn--ghost">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- APP ----------
function App() {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-cursor", "custom");
    return () => document.documentElement.removeAttribute("data-cursor");
  }, []);

  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Cursor />
      <Nav onContact={scrollToContact} />
      <main>
        <Hero variant="editorial" showMarquee />
        <ProjectsGrid onOpen={setModal} density="comfy" />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Modal project={modal} onClose={() => setModal(null)} />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
