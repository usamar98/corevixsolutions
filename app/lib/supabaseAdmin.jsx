import { createHmac, timingSafeEqual } from "node:crypto";

export const adminCookieName = "corevix_admin_session";

function cleanUrl(url) {
  return String(url || "").replace(/\/+$/, "");
}

export function getSupabaseConfig() {
  const url = cleanUrl(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL);
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return {
    bookingTable: process.env.SUPABASE_BOOKING_TABLE || "appointment_bookings",
    contactTable: process.env.SUPABASE_CONTACT_TABLE || "contact_messages",
    isConfigured: Boolean(url && serviceRoleKey),
    serviceRoleKey,
    url,
    visitorTable: process.env.SUPABASE_VISITOR_TABLE || "visitor_events",
  };
}

export function getAdminPassword() {
  return String(process.env.ADMIN_DASHBOARD_PASSWORD || "").trim();
}

export function signAdminSession() {
  const password = getAdminPassword();
  const secret = process.env.ADMIN_DASHBOARD_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || password;

  if (!password || !secret) {
    return "";
  }

  return createHmac("sha256", secret).update(`corevix-admin:${password}`).digest("hex");
}

export function isValidAdminSession(value) {
  const expected = signAdminSession();

  if (!value || !expected || value.length !== expected.length) {
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
  } catch {
    return false;
  }
}

function buildQuery(params = {}) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  });

  return search.toString();
}

export async function supabaseRequest(table, params = {}, options = {}) {
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    return {
      data: options.fallback || [],
      error: "Supabase environment variables are not configured.",
      ok: false,
      total: 0,
    };
  }

  const query = buildQuery(params);
  const response = await fetch(`${config.url}/rest/v1/${encodeURIComponent(table)}${query ? `?${query}` : ""}`, {
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
      ...(options.headers || {}),
    },
    method: options.method || "GET",
  });

  const total = Number(response.headers.get("content-range")?.split("/")?.[1] || 0);

  if (!response.ok) {
    return {
      data: options.fallback || [],
      error: await response.text(),
      ok: false,
      total,
    };
  }

  return {
    data: await response.json().catch(() => options.fallback || []),
    error: "",
    ok: true,
    total,
  };
}

export async function insertSupabaseRow(table, row) {
  return supabaseRequest(table, {}, {
    body: row,
    method: "POST",
    prefer: "return=representation",
  });
}

export async function countSupabaseRows(table, params = {}) {
  const result = await supabaseRequest(
    table,
    {
      select: "id",
      ...params,
    },
    {
      fallback: [],
      headers: {
        Range: "0-0",
        "Range-Unit": "items",
      },
      prefer: "count=exact",
    },
  );

  return result.ok ? result.total : 0;
}
