import { getSupabaseConfig, insertSupabaseRow } from "../../lib/supabaseAdmin";

export const runtime = "nodejs";

function cleanValue(value, fallback = "") {
  return String(value || fallback).trim();
}

function cleanNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid visitor request body." }, { status: 400 });
  }

  const { isConfigured, visitorTable } = getSupabaseConfig();

  if (!isConfigured) {
    return Response.json({ configured: false, ok: true });
  }

  const event = {
    visitor_id: cleanValue(payload.visitorId) || null,
    session_id: cleanValue(payload.sessionId) || null,
    path: cleanValue(payload.path, "/"),
    referrer: cleanValue(payload.referrer) || null,
    language: cleanValue(payload.language) || null,
    timezone: cleanValue(payload.timezone) || null,
    screen_width: cleanNumber(payload.screenWidth),
    screen_height: cleanNumber(payload.screenHeight),
    source: cleanValue(payload.source, "website"),
    user_agent: cleanValue(request.headers.get("user-agent")) || null,
  };

  const result = await insertSupabaseRow(visitorTable, event);

  if (!result.ok) {
    console.error("Supabase visitor insert failed:", result.error);
    return Response.json({ error: "Could not save visitor event." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
