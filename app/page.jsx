import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Browsers,
  ChartLineUp,
  CheckCircle,
  Code,
  Command,
  Database,
  EnvelopeSimple,
  Gauge,
  PlugsConnected,
  Pulse,
  Robot,
  ShieldCheck,
  TerminalWindow,
  Wrench,
} from "@phosphor-icons/react/ssr";

const navItems = [
  ["Services", "#services"],
  ["Growth", "#growth"],
  ["Process", "#process"],
  ["Contact", "#contact"],
];

const services = [
  {
    title: "Website Development",
    text: "Conversion-focused business websites with clear messaging, fast pages, and clean admin-ready structure.",
    icon: Browsers,
  },
  {
    title: "Website Fixing",
    text: "Repair broken layouts, slow pages, confusing funnels, SEO issues, and technical bugs that block sales.",
    icon: Wrench,
  },
  {
    title: "AI Automation",
    text: "Automate repetitive operations across leads, support, reporting, onboarding, and internal admin work.",
    icon: Robot,
  },
  {
    title: "AI Systems",
    text: "Build AI tools with prompts, data, retrieval, approvals, logging, and workflow logic that teams can trust.",
    icon: Brain,
  },
  {
    title: "Smart Dashboards",
    text: "Turn scattered business data into readable dashboards for decisions, forecasts, alerts, and performance tracking.",
    icon: ChartLineUp,
  },
];

const outcomes = [
  ["Broken funnel repaired", "18 days"],
  ["Manual reports automated", "12 workflows"],
  ["Lead response time cut", "42.6%"],
  ["Dashboard sources unified", "9 systems"],
];

const growthTracks = [
  {
    title: "Acquire better customers",
    text: "A sharper website explains the offer, removes friction, and guides visitors toward action.",
    icon: Pulse,
  },
  {
    title: "Run with fewer bottlenecks",
    text: "AI automations handle repetitive steps while your team keeps control of critical decisions.",
    icon: Command,
  },
  {
    title: "See the business clearly",
    text: "Dashboards bring sales, service, operations, and finance into one operating rhythm.",
    icon: Gauge,
  },
];

const process = [
  {
    title: "Audit the growth blockers",
    text: "Corevix reviews the website, workflow, data sources, and team process to find what is slowing revenue or execution.",
  },
  {
    title: "Design the operating system",
    text: "The solution is mapped as pages, automations, AI steps, dashboard views, integrations, and approval points.",
  },
  {
    title: "Build and stabilize",
    text: "The team ships the system, tests the important paths, fixes edge cases, and leaves the business with a maintainable setup.",
  },
];

function CorevixLogo() {
  return (
    <span className="logo" aria-hidden="true">
      <img src="/corevix-logo.png" alt="" />
    </span>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Corevix Solutions home">
        <CorevixLogo />
        <span>
          <strong>Corevix</strong>
          <small>Solutions</small>
        </span>
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function ServiceCard({ service, index }) {
  const Icon = service.icon;

  return (
    <article className="service-card" style={{ "--index": index }}>
      <div className="service-card__icon">
        <Icon size={24} weight="duotone" aria-hidden="true" />
      </div>
      <h3>{service.title}</h3>
      <p>{service.text}</p>
      <span>
        Build path
        <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
      </span>
    </article>
  );
}

function GrowthCard({ track }) {
  const Icon = track.icon;

  return (
    <article className="growth-card">
      <Icon size={25} weight="duotone" aria-hidden="true" />
      <h3>{track.title}</h3>
      <p>{track.text}</p>
    </article>
  );
}

function AgencySystem() {
  return (
    <div className="agency-system" aria-label="Corevix business growth system">
      <div className="system-bar">
        <TerminalWindow size={20} weight="duotone" aria-hidden="true" />
        <span>Corevix growth engine</span>
      </div>
      <div className="system-grid">
        <div className="system-node node-site">
          <Browsers size={26} weight="duotone" aria-hidden="true" />
          <strong>Website</strong>
          <span>Offer, pages, traffic, conversion</span>
        </div>
        <div className="system-node node-ai">
          <Brain size={26} weight="duotone" aria-hidden="true" />
          <strong>AI System</strong>
          <span>Reasoning, data, actions, review</span>
        </div>
        <div className="system-node node-data">
          <Database size={26} weight="duotone" aria-hidden="true" />
          <strong>Dashboard</strong>
          <span>KPIs, signals, alerts, decisions</span>
        </div>
        <div className="system-core">
          <CorevixLogo />
          <span>Growth Core</span>
        </div>
      </div>
      <div className="system-footer">
        <span>Fix</span>
        <span>Build</span>
        <span>Automate</span>
        <span>Measure</span>
      </div>
    </div>
  );
}

function DashboardPanel() {
  const rows = [
    ["Website health", "82.4", "active"],
    ["Automation queue", "36", "running"],
    ["AI checks", "119", "logged"],
    ["Growth tasks", "14", "ready"],
  ];

  return (
    <div className="dashboard-panel" aria-label="Smart dashboard preview">
      <div className="dashboard-panel__head">
        <div>
          <span>Smart dashboard</span>
          <strong>Business growth view</strong>
        </div>
        <Gauge size={25} weight="duotone" aria-hidden="true" />
      </div>
      <div className="dashboard-panel__chart">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="dashboard-panel__rows">
        {rows.map(([label, value, state]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <em>{state}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <Header />

      <section className="hero section-shell">
        <div className="hero__copy">
          <p className="eyebrow">Websites, AI systems, automations, dashboards</p>
          <h1>Corevix Solutions grows companies with smarter digital systems.</h1>
          <p>
            We build and fix business websites, automate repetitive work, design AI
            systems, and create smart dashboards so teams can sell, operate, and
            decide with more clarity.
          </p>
          <div className="hero__actions">
            <a className="primary-action" href="#contact">
              Book a growth audit
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </a>
            <a className="secondary-action" href="#services">
              Explore services
              <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
        <AgencySystem />
      </section>

      <section className="proof-strip section-shell" aria-label="Business outcomes">
        {outcomes.map(([label, value]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="services section-shell" id="services">
        <div className="section-heading">
          <p className="eyebrow">Core services</p>
          <h2>One agency for the systems that actually move business growth.</h2>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </section>

      <section className="growth section-shell" id="growth">
        <div className="growth__copy">
          <p className="eyebrow">How Corevix helps</p>
          <h2>We connect your website, operations, AI, and numbers into one growth loop.</h2>
          <p>
            Most companies do not need more disconnected tools. They need a clear
            digital system where the website captures demand, automation removes
            busywork, AI supports execution, and dashboards show what to do next.
          </p>
        </div>
        <div className="growth__cards">
          {growthTracks.map((track) => (
            <GrowthCard key={track.title} track={track} />
          ))}
        </div>
      </section>

      <section className="fix-build section-shell">
        <div className="fix-build__panel">
          <div>
            <p className="eyebrow">Website fixing plus build work</p>
            <h2>From broken pages to a stronger business website.</h2>
            <p>
              Corevix can repair an existing website or rebuild the full experience.
              The focus stays practical: speed, clarity, trust, mobile polish, and
              pages that support sales.
            </p>
          </div>
          <div className="check-list">
            {[
              "Fix layout and mobile issues",
              "Improve page speed and structure",
              "Rewrite service pages for clarity",
              "Connect forms, CRM, analytics, and automations",
            ].map((item) => (
              <span key={item}>
                <CheckCircle size={18} weight="fill" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="systems section-shell">
        <div className="systems__content">
          <p className="eyebrow">AI and dashboard systems</p>
          <h2>AI should reduce work. Dashboards should reduce guesswork.</h2>
          <p>
            We build controlled AI flows with data, review gates, and tool
            integrations, then pair them with dashboards that show performance,
            exceptions, and the next best action.
          </p>
          <div className="systems__steps">
            <span>
              <Code size={18} weight="duotone" aria-hidden="true" />
              Integrate tools
            </span>
            <span>
              <ShieldCheck size={18} weight="duotone" aria-hidden="true" />
              Add guardrails
            </span>
            <span>
              <PlugsConnected size={18} weight="duotone" aria-hidden="true" />
              Automate actions
            </span>
          </div>
        </div>
        <DashboardPanel />
      </section>

      <section className="process section-shell" id="process">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Process</p>
            <h2>A clean build process for busy companies.</h2>
          </div>
          <p>
            Corevix keeps the engagement simple: diagnose what slows growth, build
            the system, and make sure the team can use it without friction.
          </p>
        </div>
        <div className="process-list">
          {process.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <div className="contact__inner">
          <CorevixLogo />
          <div>
            <p className="eyebrow">Start with a growth audit</p>
            <h2>Tell Corevix what is slowing your website, workflow, AI idea, or dashboard.</h2>
            <p>
              We will turn the problem into a clear build plan and show what should
              be fixed, automated, or measured first.
            </p>
          </div>
          <a className="contact-link" href="mailto:hello@corevixsolutions.com">
            hello@corevixsolutions.com
            <EnvelopeSimple size={20} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <span>Corevix Solutions</span>
        <span>Websites, website fixing, AI automation, AI systems, and smart dashboards.</span>
      </footer>
    </main>
  );
}
