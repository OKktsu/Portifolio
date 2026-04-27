/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo } = React;

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
    img: "img/MenuBuilder.png",
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
    img: "img/projeto-infra.png",
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
    img: "img/sidebar.png",
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
    img: "img/projeto-netflix.png",
    link: "https://okktsu.github.io/Projeto_NetflixLogin/",
    role: "Frontend",
    year: "2023"
  }
];

const EXPERIENCE = [
  {
    role: "Desenvolvedor Full-stack Junior",
    org: "PJ",
    period: "2025 — atual",
    desc: "Comecei como front-end construindo interfaces responsivas com Angular e React. Hoje atuo full-stack desenvolvendo soluções com .NET e SQL Server, conectando o front à camada de negócio.",
    stack: ["Angular", "React", ".NET", "C#", "SQL Server"]
  },
  {
    role: "Análise e Desenvolvimento de Sistemas",
    org: "Faculdade",
    period: "2023 — 2026",
    desc: "Formação acadêmica em lógica, banco de dados, engenharia de software e desenvolvimento web full-stack.",
    stack: ["Algoritmos", "DB", "Engenharia de Software"]
  }
];

const SKILLS = [
  { name: "Angular", level: 85, group: "Frontend" },
  { name: "TypeScript", level: 80, group: "Frontend" },
  { name: "React", level: 70, group: "Frontend" },
  { name: "HTML / CSS", level: 90, group: "Frontend" },
  { name: "JavaScript", level: 85, group: "Frontend" },
  { name: "Tailwind", level: 75, group: "Frontend" },
  { name: "C#", level: 75, group: "Backend" },
  { name: ".NET", level: 70, group: "Backend" },
  { name: "Node.js", level: 60, group: "Backend" },
  { name: "Python", level: 55, group: "Backend" },
  { name: "SQL Server", level: 75, group: "Data" },
  { name: "MongoDB", level: 60, group: "Data" }
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
        <span className="nav__status"><i /> disponível</span>
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

function Hero({ variant }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const tz = time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  if (variant === "terminal") return <HeroTerminal tz={tz} />;
  if (variant === "compact") return <HeroCompact tz={tz} />;
  return <HeroEditorial tz={tz} />;
}

function HeroEditorial({ tz }) {
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
          Marcelo Luan — desenvolvedor full-stack. Angular, .NET, e o cuidado de quem trata cada detalhe como se importasse.
        </p>
        <div className="hero__actions">
          <a href="#work" className="btn btn--primary btn--lg">
            Ver projetos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="#contact" className="btn btn--ghost btn--lg">Conversar</a>
        </div>
      </div>

      <div className="hero__marquee" aria-hidden>
        <div className="marquee__track">
          {Array(3).fill(0).map((_, i) => (
            <span key={i}>
              Angular <i className="dot" /> .NET <i className="dot" /> TypeScript <i className="dot" /> SQL <i className="dot" /> React <i className="dot" /> C# <i className="dot" /> Node <i className="dot" /> MongoDB <i className="dot" />{" "}
            </span>
          ))}
        </div>
      </div>
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
    { out: "Disponível para projetos · São Paulo, BR · " + tz }
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
              <span className="term__p">{l.p}</span><span className="term__c">{l.c}</span><span className="term__$">$</span>
              <span className="term__cmd">{l.cmd}</span>
            </div>
          ) : (
            <div key={i} className="term__out">{l.out}</div>
          ))}
          <div className="term__line">
            <span className="term__p">marcelo@portfolio</span><span className="term__c">~</span><span className="term__$">$</span>
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
          <span className="eyebrow"><i className="pulse" /> Disponível para projetos · {tz}</span>
          <h1 className="hero__title hero__title--compact">
            Marcelo Luan,<br/>
            <span className="hero__line--accent">desenvolvedor full-stack</span> em São Paulo.
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
          backgroundImage: `url(${p.img})`,
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
            Sou desenvolvedor full-stack, hoje atuando como PJ. Comecei pelo front-end — pixel pushing, browsers chatos, formulários que insistem em quebrar — e fui descendo a pilha até encontrar SQL e a alegria de uma query bem escrita.
          </p>
          <p>
            Estudo Análise e Desenvolvimento de Sistemas e estou prestes a me formar. Curto problemas que misturam regras de negócio densas com interfaces que precisam ser leves de usar.
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
  const groups = useMemo(() => {
    const m = {};
    SKILLS.forEach((s) => { (m[s.group] = m[s.group] || []).push(s); });
    return m;
  }, []);
  return (
    <section id="stack" className="section">
      <SectionLabel num="03" kicker="Tech stack" title="Ferramentas em rotação." />
      <div className="stack">
        {Object.entries(groups).map(([g, items], gi) => (
          <Reveal key={g} className="stack__group" delay={gi * 100}>
            <h3 className="stack__group-title"><span className="meta-key">{String(gi + 1).padStart(2, "0")}</span>{g}</h3>
            <ul className="stack__list">
              {items.map((s) => (
                <li key={s.name} className="skill">
                  <div className="skill__head">
                    <span className="skill__name">{s.name}</span>
                    <span className="skill__lvl">{s.level}</span>
                  </div>
                  <div className="skill__bar"><i style={{ width: s.level + "%" }} /></div>
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
    { label: "WhatsApp", value: "+55 (41) 99419-8421", href: "https://wa.me/5541994198421" }
  ];
  return (
    <section id="contact" className="section section--contact">
      <SectionLabel num="04" kicker="Contact" title="Vamos construir alguma coisa." />
      <div className="contact">
        <Reveal className="contact__intro" delay={80}>
          <p className="contact__big">
            Estou aceitando <span className="hi">projetos novos</span>, freelas pontuais e papos sobre arquitetura, .NET ou Angular.
          </p>
          <a className="btn btn--primary btn--lg" href="mailto:marceloluan125@gmail.com">
            marceloluan125@gmail.com
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);
  if (!project) return null;
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal__media" style={{ backgroundImage: `url(${project.img})` }}>
          <button className="modal__close" onClick={onClose} aria-label="fechar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <div className="modal__num">{project.num}</div>
        </div>
        <div className="modal__body">
          <div className="modal__head">
            <div>
              <span className="kicker">{project.subtitle}</span>
              <h3 className="modal__title">{project.title}</h3>
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
            <a href={project.link} target="_blank" rel="noreferrer" className="btn btn--primary">Ver demonstração →</a>
            <button onClick={onClose} className="btn btn--ghost">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- TWEAKS WIRING ----------
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "accent": "#7c28f0",
  "hero": "editorial",
  "density": "comfy",
  "showCursor": true,
  "showMarquee": true
}/*EDITMODE-END*/;

function applyTheme(theme, accent) {
  const r = document.documentElement;
  r.setAttribute("data-theme", theme);
  r.style.setProperty("--accent", accent);
}

// ---------- APP ----------
function App() {
  const [tweaks, setTweak] = window.useTweaks(DEFAULTS);
  const [modal, setModal] = useState(null);

  useEffect(() => { applyTheme(tweaks.theme, tweaks.accent); }, [tweaks.theme, tweaks.accent]);

  useEffect(() => {
    document.documentElement.setAttribute("data-cursor", tweaks.showCursor ? "custom" : "native");
    return () => document.documentElement.removeAttribute("data-cursor");
  }, [tweaks.showCursor]);

  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const accentSwatches = ["#7c28f0", "#E0533D", "#1F6FEB", "#16A34A", "#0F172A"];

  return (
    <>
      {tweaks.showCursor && <Cursor />}
      <Nav onContact={scrollToContact} />
      <main>
        <Hero variant={tweaks.hero} />
        <ProjectsGrid onOpen={setModal} density={tweaks.density} />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <Modal project={modal} onClose={() => setModal(null)} />

      {(
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Theme">
            <window.TweakRadio label="Mode" value={tweaks.theme} onChange={(v) => setTweak("theme", v)}
              options={[{ value: "light", label: "Light" }, { value: "dark", label: "Dark" }]} />
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginTop: 6 }}>
              <span style={{ fontSize: 11, opacity: 0.6, textTransform: "uppercase", letterSpacing: 0.5 }}>Accent</span>
              {accentSwatches.map((c) => (
                <button key={c} onClick={() => setTweak("accent", c)}
                  style={{
                    width: 22, height: 22, borderRadius: 999, background: c,
                    border: tweaks.accent === c ? "2px solid #fff" : "1px solid rgba(0,0,0,.1)",
                    boxShadow: tweaks.accent === c ? `0 0 0 2px ${c}` : "none",
                    cursor: "pointer"
                  }} />
              ))}
            </div>
          </window.TweakSection>
          <window.TweakSection title="Layout">
            <window.TweakSelect label="Hero variant" value={tweaks.hero} onChange={(v) => setTweak("hero", v)}
              options={[
                { value: "editorial", label: "Editorial (default)" },
                { value: "terminal", label: "Terminal" },
                { value: "compact", label: "Compact w/ portrait" }
              ]} />
            <window.TweakRadio label="Density" value={tweaks.density} onChange={(v) => setTweak("density", v)}
              options={[{ value: "comfy", label: "Comfy" }, { value: "compact", label: "Compact" }]} />
          </window.TweakSection>
          <window.TweakSection title="Effects">
            <window.TweakToggle label="Custom cursor" value={tweaks.showCursor} onChange={(v) => setTweak("showCursor", v)} />
            <window.TweakToggle label="Tech marquee" value={tweaks.showMarquee} onChange={(v) => setTweak("showMarquee", v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
