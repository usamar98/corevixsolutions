import { NextResponse } from "next/server";
import { adminCookieName } from "../../../lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    httpOnly: true,
    maxAge: 0,
    name: adminCookieName,
    path: "/usama01",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    value: "",
  });

  return response;
}
