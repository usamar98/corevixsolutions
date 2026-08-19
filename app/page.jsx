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
import Image from "next/image";
import BookingSystem from "./BookingSystem";
import ContactForm from "./ContactForm";
import SiteHeader from "./SiteHeader";

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

const projectCatalog = [
  {
    category: "SaaS products",
    projects: [
      {
        title: "Editing App",
        image: "/projects/editing-app.png",
        url: "https://www.editingapp.live/",
        text: "A private, multi-model creative workspace for clipping long videos, generating video and images, building performance ads, and removing backgrounds.",
        specs: [
          "AI clipper with editable captions",
          "Multi-model video and image generation",
          "Product URL and long-video ad workflows",
        ],
      },
      {
        title: "Hirevate",
        image: "/projects/hirevate.png",
        url: "https://www.hirevate.com/",
        text: "A career workflow SaaS for finding fresh roles, creating job-tailored resumes and cover letters, and managing every application from interest to decision.",
        specs: [
          "Fresh and verified job discovery",
          "Job-tailored resume and cover letter tools",
          "Application pipeline and follow-up tracking",
        ],
      },
    ],
  },
  {
    category: "Healthcare and dental websites",
    projects: [
      {
        title: "Macarthur Podiatry Group",
        image: "/projects/podiatrists-au.png",
        url: "https://podiatrists-au.vercel.app/",
        text: "A podiatry clinic website for foot and ankle care, built around fast booking, treatment education, and patient trust.",
        specs: ["Podiatry service architecture", "Booking and call CTAs", "Treatment education sections"],
      },
      {
        title: "Bula Dental Care",
        image: "/projects/bula-dental.png",
        url: "https://bula-dental.vercel.app/",
        text: "A family dental clinic website for Suva, Fiji with friendly service explanations and direct clinic contact routes.",
        specs: ["Local dental SEO structure", "WhatsApp and call actions", "Patient information blocks"],
      },
      {
        title: "SmileCraft Dental Fiji",
        image: "/projects/dentists-app.png",
        url: "https://dentists-app.vercel.app/",
        text: "A Fiji dental clinic demo focused on family dental care, emergency enquiries, maps, calling, and WhatsApp conversion.",
        specs: ["Hero-led clinic positioning", "Emergency enquiry flow", "Maps and contact prompts"],
      },
      {
        title: "International Dental Clinic Demo",
        image: "/projects/dentist-app-nine.png",
        url: "https://dentist-app-nine.vercel.app/",
        text: "A clean clinic template that can be adapted to different markets with service pages, doctor content, and location details.",
        specs: ["Configurable clinic story", "Doctor profile space", "Opening hours and directions"],
      },
    ],
  },
  {
    category: "Care and NDIS support platforms",
    projects: [
      {
        title: "Your Care Support",
        image: "/projects/ndis-app-three.png",
        url: "https://ndis-app-three.vercel.app/",
        text: "An Australian NDIS provider website with service clarity, trust-building copy, and consultation paths for participants.",
        specs: ["NDIS service catalogue", "Support journey CTAs", "Accessible care messaging"],
      },
      {
        title: "Your NDIS Provider",
        image: "/projects/ndis-ecru.png",
        url: "https://ndis-ecru.vercel.app/",
        text: "A support provider template with participant-focused services, booking prompts, and a dashboard-style hero preview.",
        specs: ["Support snapshot interface", "Consultation booking flow", "Participant goal framing"],
      },
      {
        title: "EverKind Home Care",
        image: "/projects/ever-kind.png",
        url: "https://ever-kind-fnkf.vercel.app/",
        text: "A private home care website for families comparing senior care, companionship, dementia support, and live-in care.",
        specs: ["Family-first care copy", "Care service segmentation", "Arrange-care conversion path"],
      },
    ],
  },
  {
    category: "Property, repair, and home services",
    projects: [
      {
        title: "NorthStar Property Maintenance",
        image: "/projects/northstar-rho-beryl.png",
        url: "https://northstar-rho-beryl.vercel.app/",
        text: "A Manchester property maintenance website for landlords who need urgent repair enquiries and visible job proof.",
        specs: ["Landlord repair funnel", "Photo-led service proof", "Phone and request CTAs"],
      },
      {
        title: "Hister Property Maintenance",
        image: "/projects/hister.png",
        url: "https://hister.vercel.app/",
        text: "A bold repair website for landlords, HMOs, and letting agents with a live docket concept and urgent request flow.",
        specs: ["HMO repair positioning", "Live repair docket preview", "WhatsApp and request actions"],
      },
      {
        title: "Pak Solar Supply",
        image: "/projects/solar-bay.png",
        url: "https://solar-bay.vercel.app/",
        text: "A solar supplier and installation site for Pakistan, built to explain panels, inverters, batteries, and quote packages.",
        specs: ["Solar product catalogue", "Quote-ready package logic", "Installation and net-metering flow"],
      },
    ],
  },
  {
    category: "Weddings, beauty, and lifestyle booking",
    projects: [
      {
        title: "Aurelia Wedding Atelier",
        image: "/projects/wedding-planner-seven.png",
        url: "https://wedding-planner-seven-eta.vercel.app/",
        text: "A luxury wedding planner website with cinematic visuals, service positioning, investment content, and inquiry paths.",
        specs: ["Luxury planner portfolio", "Inquiry-led navigation", "Service and investment sections"],
      },
      {
        title: "Maison Vow Studio",
        image: "/projects/wedding-plan-tau.png",
        url: "https://wedding-plan-tau.vercel.app/",
        text: "A destination wedding planning site that sells the mood of each location through stories, portfolios, and planning prompts.",
        specs: ["Destination story catalogue", "Event estimator concept", "Portfolio and inquiry flow"],
      },
      {
        title: "Veloura Salon and Skin Studio",
        image: "/projects/beautyparlour-eosin.png",
        url: "https://beautyparlour-eosin.vercel.app/",
        text: "A salon and skin studio website with service planning, gallery content, booking actions, and an AI concierge panel.",
        specs: ["AI concierge interface", "Service recommendation prompts", "Booking and visit flow"],
      },
      {
        title: "Luxe Beauty Studio",
        image: "/projects/beauty-therapist.png",
        url: "https://beauty-therapist.vercel.app/",
        text: "A beauty therapist landing page with premium appointment booking, service discovery, and a visual booking panel.",
        specs: ["Live booking slot preview", "Service-first hero layout", "Gallery and appointment CTAs"],
      },
    ],
  },
  {
    category: "Restaurant and hospitality websites",
    projects: [
      {
        title: "Fresh Table",
        image: "/projects/resturant-six-sigma.png",
        url: "https://resturant-six-sigma.vercel.app/",
        text: "A bright restaurant website for cafes and local food businesses, built around menus, reservations, and WhatsApp orders.",
        specs: ["Menu category system", "Reservation and order CTAs", "Gallery and location sections"],
      },
      {
        title: "Noir and Ember",
        image: "/projects/resturant-app-seven.png",
        url: "https://resturant-app-seven-mocha.vercel.app/",
        text: "A premium restaurant website with a cinematic dining hero, dish highlights, menu browsing, and table booking.",
        specs: ["Fine dining visual system", "Menu and dish showcase", "Booking and opening-hours blocks"],
      },
    ],
  },
  {
    category: "Marketing and business systems",
    projects: [
      {
        title: "Corevix Marketing",
        image: "/projects/marketing-beta.png",
        url: "https://marketing-beta-lyart.vercel.app/",
        text: "A campaign architecture website for turning attention into revenue through strategy, paid ads, creative, and proof.",
        specs: ["Campaign strategy positioning", "Work and proof sections", "Project-start conversion path"],
      },
    ],
  },
];

function CorevixLogo() {
  return (
    <span className="logo" aria-hidden="true">
      <Image src="/corevix-logo.png" alt="" width={54} height={54} />
    </span>
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

function ProjectCatalog() {
  return (
    <section className="projects section-shell" id="projects">
      <div className="section-heading section-heading--split">
        <div>
          <p className="eyebrow">Project catalog</p>
          <h2>Live products and websites across SaaS, clinics, care, home services, hospitality, beauty, and growth.</h2>
        </div>
        <p>
          Each project below includes a captured hero preview, the business problem it
          solves, and the key specifications a client can quickly understand.
        </p>
      </div>

      <div className="catalog-groups">
        {projectCatalog.map((group) => {
          const groupId = `${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`;

          return (
            <section className="catalog-group" key={group.category} aria-labelledby={groupId}>
              <div className="catalog-group__head">
                <h3 id={groupId}>{group.category}</h3>
                <span>{String(group.projects.length).padStart(2, "0")} builds</span>
              </div>
              <div className="project-grid">
                {group.projects.map((project) => (
                  <article className="project-card" key={project.title}>
                    <a className="project-shot" href={project.url} target="_blank" rel="noreferrer">
                      <Image
                        src={project.image}
                        alt={`${project.title} hero section screenshot`}
                        fill
                        sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </a>
                    <div className="project-card__body">
                      <div className="project-card__top">
                        <h4>{project.title}</h4>
                        <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                          Link
                          <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                        </a>
                      </div>
                      <p>{project.text}</p>
                      <ul className="project-specs">
                        {project.specs.map((spec) => (
                          <li key={spec}>{spec}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
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
      <SiteHeader />

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
            <a className="primary-action" href="#booking">
              Book an appointment
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

      <ProjectCatalog />

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

      <BookingSystem />

      <section className="contact section-shell" id="contact">
        <div className="contact__inner">
          <div className="contact__copy">
            <CorevixLogo />
            <p className="eyebrow">Start with a growth audit</p>
            <h2>Tell Corevix what is slowing your website, workflow, AI idea, or dashboard.</h2>
            <p>
              We will turn the problem into a clear build plan and show what should
              be fixed, automated, or measured first.
            </p>
            <a className="contact-link" href="mailto:hello@corevixsolutions.com">
              hello@corevixsolutions.com
              <EnvelopeSimple size={20} weight="bold" aria-hidden="true" />
            </a>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="site-footer section-shell">
        <span>Corevix Solutions</span>
        <span>Websites, website fixing, AI automation, AI systems, and smart dashboards.</span>
      </footer>
    </main>
  );
}
