import { getSupabaseConfig, insertSupabaseRow } from "../../lib/supabaseAdmin";

export const runtime = "nodejs";

function cleanValue(value, fallback = "") {
  return String(value || fallback).trim();
}

function createReference() {
  const suffix = Math.random().toString(36).slice(2, 4).toUpperCase();

  return `CVX-${Date.now().toString().slice(-6)}${suffix}`;
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid appointment request body." }, { status: 400 });
  }

  const name = cleanValue(payload.name);
  const email = cleanValue(payload.email);
  const phone = cleanValue(payload.phone);
  const goal = cleanValue(payload.goal);

  if (!name || !email || !phone || !goal) {
    return Response.json(
      { error: "Name, email, phone, and project goal are required." },
      { status: 400 },
    );
  }

  const { bookingTable, isConfigured } = getSupabaseConfig();

  if (!isConfigured) {
    return Response.json({ error: "Appointment backend is not configured." }, { status: 503 });
  }

  const reference = cleanValue(payload.reference, createReference());
  const booking = {
    reference,
    name,
    email,
    phone,
    company: cleanValue(payload.company) || null,
    service: cleanValue(payload.service, "Website development"),
    preferred_date: cleanValue(payload.selectedDay) || null,
    preferred_day_label: cleanValue(payload.selectedDayLabel) || null,
    preferred_time: cleanValue(payload.selectedTime, "09:30 AM"),
    goal,
    source: cleanValue(payload.source, "corevix_booking_form"),
    status: "new",
    user_agent: cleanValue(request.headers.get("user-agent")) || null,
  };

  const result = await insertSupabaseRow(bookingTable, booking);

  if (!result.ok) {
    console.error("Supabase appointment insert failed:", result.error);
    return Response.json({ error: "Could not save appointment request." }, { status: 502 });
  }

  return Response.json({ booking: result.data?.[0] || booking, ok: true, reference });
}
