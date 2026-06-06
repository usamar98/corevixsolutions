"use client";

import { useEffect } from "react";

function getStoredId(storage, key) {
  const existing = storage.getItem(key);

  if (existing) {
    return existing;
  }

  const next = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  storage.setItem(key, next);
  return next;
}

function sendVisitorEvent() {
  if (window.location.pathname.startsWith("/usama01")) {
    return;
  }

  const visitorId = getStoredId(window.localStorage, "corevix_visitor_id");
  const sessionId = getStoredId(window.sessionStorage, "corevix_session_id");
  const payload = {
    language: navigator.language,
    path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    referrer: document.referrer,
    screenHeight: window.screen?.height,
    screenWidth: window.screen?.width,
    sessionId,
    source: "corevix_site",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    visitorId,
  };

  fetch("/api/visitors", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true,
    method: "POST",
  }).catch(() => {});
}

export default function VisitorTracker() {
  useEffect(() => {
    sendVisitorEvent();
  }, []);

  return null;
}
