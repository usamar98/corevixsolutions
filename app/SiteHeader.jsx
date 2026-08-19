"use client";

import { List, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Growth", "#growth"],
  ["Process", "#process"],
  ["Book", "#booking"],
  ["Contact", "#contact"],
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className={`site-header${isOpen ? " is-open" : ""}`}>
      <a className="brand" href="#top" aria-label="Corevix Solutions home" onClick={() => setIsOpen(false)}>
        <span className="logo" aria-hidden="true">
          <Image src="/corevix-logo.png" alt="" width={54} height={54} priority />
        </span>
        <span>
          <strong>Corevix</strong>
          <small>Solutions</small>
        </span>
      </a>

      <button
        className="mobile-nav-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={22} weight="bold" aria-hidden="true" /> : <List size={22} weight="bold" aria-hidden="true" />}
        <span>{isOpen ? "Close" : "Menu"}</span>
      </button>

      <nav id="primary-navigation" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setIsOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
