import { NextResponse } from "next/server";
import { getAdminPassword, signAdminSession, adminCookieName } from "../../../lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid login request." }, { status: 400 });
  }

  const password = getAdminPassword();

  if (!password) {
    return NextResponse.json({ error: "Admin password is not configured." }, { status: 503 });
  }

  if (String(payload.password || "") !== password) {
    return NextResponse.json({ error: "Wrong admin password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    name: adminCookieName,
    path: "/usama01",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    value: signAdminSession(),
  });

  return response;
}
