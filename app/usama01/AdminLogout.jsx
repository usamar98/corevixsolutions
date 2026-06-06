"use client";

import { SignOut } from "@phosphor-icons/react";

export default function AdminLogout() {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <button className="admin-logout" type="button" onClick={logout}>
      Sign out
      <SignOut size={17} weight="bold" aria-hidden="true" />
    </button>
  );
}
