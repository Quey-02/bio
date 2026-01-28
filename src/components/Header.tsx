"use client";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Top" },
    { href: "/techstack", label: "Technology" },
    { href: "/apps", label: "Apps" },
    { href: "/games", label: "Games" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className={clsx(styles["header"])}>
      <div className={clsx(styles["container"])}>
        <h1 className={clsx(styles["site-title"])}>bio</h1>

        {/* Desktop Navigation */}
        <nav
          className={clsx(styles["tabs-container"])}
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <div key={item.href} className={clsx(styles["tab"])}>
              <Link
                href={item.href}
                className={clsx(
                  styles["tab-link"],
                  isActive(item.href) && styles["active"],
                )}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={clsx(styles["mobile-menu-button"])}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={clsx(styles["mobile-menu"])}>
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  styles["mobile-menu-link"],
                  isActive(item.href) && styles["active"],
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
