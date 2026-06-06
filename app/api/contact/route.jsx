export const runtime = "nodejs";

const requiredFields = ["name", "email", "message"];

function jsonResponse(body, status = 200) {
  return Response.json(body, { status });
}

function cleanValue(value, fallback = "") {
  return String(value || fallback).trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const table = process.env.SUPABASE_CONTACT_TABLE || "contact_messages";

  return {
    serviceRoleKey,
    table,
    url: url?.replace(/\/+$/, ""),
  };
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid contact request body." }, 400);
  }

  if (cleanValue(payload.website)) {
    return jsonResponse({ ok: true, skipped: true });
  }

  const contact = {
    company: cleanValue(payload.company) || null,
    email: cleanValue(payload.email).toLowerCase(),
    message: cleanValue(payload.message),
    name: cleanValue(payload.name),
    phone: cleanValue(payload.phone) || null,
    service: cleanValue(payload.service, "General enquiry"),
    source: "corevix_contact_form",
    status: "new",
    user_agent: cleanValue(request.headers.get("user-agent")) || null,
  };

  const missingField = requiredFields.find((field) => !contact[field]);

  if (missingField) {
    return jsonResponse({ error: `Missing required field: ${missingField}.` }, 400);
  }

  if (!isEmail(contact.email)) {
    return jsonResponse({ error: "Enter a valid email address." }, 400);
  }

  if (contact.message.length < 12) {
    return jsonResponse({ error: "Add a little more detail to the message." }, 400);
  }

  const { serviceRoleKey, table, url } = getSupabaseConfig();

  if (!url || !serviceRoleKey) {
    return jsonResponse(
      {
        error: "Supabase is not configured yet. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      },
      503,
    );
  }

  try {
    const response = await fetch(`${url}/rest/v1/${encodeURIComponent(table)}`, {
      body: JSON.stringify(contact),
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      method: "POST",
    });

    if (!response.ok) {
      const message = await response.text();
      console.error("Supabase contact insert failed:", message);
      return jsonResponse({ error: "Could not save the contact message." }, 502);
    }

    const data = await response.json().catch(() => []);

    return jsonResponse({
      id: Array.isArray(data) ? data[0]?.id : data?.id,
      ok: true,
    });
  } catch (error) {
    console.error("Contact route failed:", error);
    return jsonResponse({ error: "Could not reach the contact backend." }, 502);
  }
}
