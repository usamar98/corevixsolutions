import {
  ChartLineUp,
  Clock,
  Database,
  EnvelopeSimple,
  Eye,
  UsersThree,
} from "@phosphor-icons/react/ssr";
import { cookies } from "next/headers";
import {
  adminCookieName,
  countSupabaseRows,
  getAdminPassword,
  getSupabaseConfig,
  isValidAdminSession,
  supabaseRequest,
} from "../lib/supabaseAdmin";
import AdminLogin from "./AdminLogin";
import AdminLogout from "./AdminLogout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDate(value) {
  if (!value) {
    return "No date";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Karachi",
  }).format(date);
}

function startOfTodayIso() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Karachi",
    year: "numeric",
  }).formatToParts(new Date());
  const dateParts = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${dateParts.year}-${dateParts.month}-${dateParts.day}T00:00:00+05:00`;
}

function summarizeTopPages(visitors) {
  const totals = visitors.reduce((current, visitor) => {
    const path = visitor.path || "/";
    current[path] = (current[path] || 0) + 1;
    return current;
  }, {});

  return Object.entries(totals)
    .sort((first, second) => second[1] - first[1])
    .slice(0, 5)
    .map(([path, count]) => ({ count, path }));
}

function uniqueVisitorCount(visitors) {
  return new Set(visitors.map((visitor) => visitor.visitor_id).filter(Boolean)).size;
}

function SetupPanel({ missing }) {
  return (
    <main className="admin-page admin-page--center">
      <section className="admin-setup">
        <Database size={30} weight="duotone" aria-hidden="true" />
        <p className="admin-kicker">Setup required</p>
        <h1>Admin dashboard is almost ready.</h1>
        <p>{missing}</p>
      </section>
    </main>
  );
}

function MetricCard({ icon: Icon, label, value, note }) {
  return (
    <article className="admin-metric">
      <Icon size={24} weight="duotone" aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{note}</em>
    </article>
  );
}

export default async function AdminDashboard() {
  const adminPassword = getAdminPassword();

  if (!adminPassword) {
    return <SetupPanel missing="Add ADMIN_DASHBOARD_PASSWORD in your environment variables before using /usama01." />;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(adminCookieName)?.value;

  if (!isValidAdminSession(sessionCookie)) {
    return <AdminLogin />;
  }

  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    return <SetupPanel missing="Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment variables." />;
  }

  const todayIso = startOfTodayIso();
  const [messagesResult, visitorsResult, todayVisitorsResult, totalMessages, totalViews, newMessages] =
    await Promise.all([
      supabaseRequest(config.contactTable, {
        limit: 40,
        order: "created_at.desc",
        select: "id,created_at,name,email,phone,company,service,message,status",
      }),
      supabaseRequest(config.visitorTable, {
        limit: 120,
        order: "created_at.desc",
        select:
          "id,created_at,visitor_id,session_id,path,referrer,language,timezone,screen_width,screen_height,source,user_agent",
      }),
      supabaseRequest(config.visitorTable, {
        created_at: `gte.${todayIso}`,
        limit: 1000,
        order: "created_at.desc",
        select: "id,created_at,visitor_id,path",
      }),
      countSupabaseRows(config.contactTable),
      countSupabaseRows(config.visitorTable),
      countSupabaseRows(config.contactTable, { status: "eq.new" }),
    ]);

  const messages = messagesResult.data || [];
  const visitors = visitorsResult.data || [];
  const todayVisitors = todayVisitorsResult.data || [];
  const topPages = summarizeTopPages(visitors);

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Corevix command desk</p>
          <h1>Visitors and contact messages</h1>
          <p>Live website activity from Supabase tables: contact messages and visitor events.</p>
        </div>
        <div className="admin-header__actions">
          <a href="/usama01">Refresh data</a>
          <AdminLogout />
        </div>
      </header>

      <section className="admin-metrics" aria-label="Admin dashboard metrics">
        <MetricCard icon={Eye} label="Page views" value={totalViews} note={`${todayVisitors.length} today`} />
        <MetricCard
          icon={UsersThree}
          label="Visitors today"
          value={uniqueVisitorCount(todayVisitors)}
          note={`${uniqueVisitorCount(visitors)} in recent log`}
        />
        <MetricCard icon={EnvelopeSimple} label="Messages" value={totalMessages} note={`${newMessages} new`} />
        <MetricCard icon={Clock} label="Latest visit" value={visitors[0] ? formatDate(visitors[0].created_at) : "None"} note="Most recent event" />
      </section>

      {(messagesResult.error || visitorsResult.error) && (
        <section className="admin-warning">
          <strong>Supabase data warning</strong>
          <p>
            If tables are missing, run the SQL files in the Supabase SQL editor:
            <code>contact_messages.sql</code> and <code>visitor_events.sql</code>.
          </p>
        </section>
      )}

      <section className="admin-grid">
        <div className="admin-panel admin-panel--messages">
          <div className="admin-panel__head">
            <div>
              <p className="admin-kicker">Contact inbox</p>
              <h2>Recent messages</h2>
            </div>
            <span>{messages.length} shown</span>
          </div>
          <div className="admin-message-list">
            {messages.length ? (
              messages.map((message) => (
                <article className="admin-message" key={message.id}>
                  <div>
                    <span>{formatDate(message.created_at)}</span>
                    <h3>{message.name || "Unknown contact"}</h3>
                    <p>{message.message || "No message body provided."}</p>
                  </div>
                  <dl>
                    <div>
                      <dt>Email</dt>
                      <dd>{message.email || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>{message.phone || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt>Service</dt>
                      <dd>{message.service}</dd>
                    </div>
                    <div>
                      <dt>Company</dt>
                      <dd>{message.company || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{message.status || "new"}</dd>
                    </div>
                  </dl>
                </article>
              ))
            ) : (
              <p className="admin-empty">No contact messages yet.</p>
            )}
          </div>
        </div>

        <aside className="admin-side">
          <section className="admin-panel">
            <div className="admin-panel__head">
              <div>
                <p className="admin-kicker">Traffic</p>
                <h2>Top pages</h2>
              </div>
              <ChartLineUp size={24} weight="duotone" aria-hidden="true" />
            </div>
            <div className="admin-top-pages">
              {topPages.length ? (
                topPages.map((page) => (
                  <div key={page.path}>
                    <span>{page.path}</span>
                    <strong>{page.count}</strong>
                  </div>
                ))
              ) : (
                <p className="admin-empty">No visitor data yet.</p>
              )}
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel__head">
              <div>
                <p className="admin-kicker">Visitor log</p>
                <h2>Recent visits</h2>
              </div>
              <span>{visitors.length} rows</span>
            </div>
            <div className="admin-visitor-list">
              {visitors.length ? (
                visitors.slice(0, 24).map((visitor) => {
                  const screenSize =
                    visitor.screen_width && visitor.screen_height
                      ? `${visitor.screen_width}x${visitor.screen_height}`
                      : "No screen size";

                  return (
                    <article key={visitor.id}>
                      <strong>{visitor.path || "/"}</strong>
                      <span>{formatDate(visitor.created_at)}</span>
                      <em>
                        {visitor.timezone || "Unknown zone"} | {visitor.language || "Unknown language"}
                      </em>
                      <small>{visitor.referrer ? `${screenSize} | ${visitor.referrer}` : screenSize}</small>
                    </article>
                  );
                })
              ) : (
                <p className="admin-empty">No visitors tracked yet.</p>
              )}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
