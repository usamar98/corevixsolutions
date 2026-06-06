"use client";

import { useState } from "react";
import { LockKey, SignIn } from "@phosphor-icons/react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function submitLogin(event) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Could not open dashboard.");
      }

      window.location.reload();
    } catch (loginError) {
      setStatus("error");
      setError(loginError.message || "Could not open dashboard.");
    }
  }

  return (
    <main className="admin-page admin-page--center">
      <form className="admin-login" onSubmit={submitLogin}>
        <span className="admin-login__icon">
          <LockKey size={26} weight="duotone" aria-hidden="true" />
        </span>
        <p className="admin-kicker">Corevix admin</p>
        <h1>Open dashboard</h1>
        <p>Enter the private admin password to view visitors and contact messages.</p>
        <label>
          <span>Password</span>
          <input
            autoComplete="current-password"
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
              setStatus("idle");
            }}
            placeholder="Admin password"
            type="password"
            value={password}
          />
        </label>
        {error ? (
          <p className="admin-login__error" role="alert">
            {error}
          </p>
        ) : null}
        <button disabled={status === "submitting"} type="submit">
          {status === "submitting" ? "Checking" : "Enter dashboard"}
          <SignIn size={18} weight="bold" aria-hidden="true" />
        </button>
      </form>
    </main>
  );
}
