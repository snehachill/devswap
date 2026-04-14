"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Home, LogOut, LayoutDashboard, ChevronDown, Bell } from "lucide-react";
import { signOut } from "next-auth/react";

const NAV_LINKS = ["How it works", "Features", "Community"];

// ── Logo ───────────────────────────────────────────────────────────────────────
function DevSwapLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="relative w-8 h-8 rounded-xl bg-[#3D1F1F] flex items-center justify-center shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
        <svg
          width="15" height="15" viewBox="0 0 24 24"
          fill="none" stroke="white" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className="relative z-10"
        >
          <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16" />
        </svg>
      </div>
      <span
        className="font-bold text-slate-900 tracking-tight text-[15px] group-hover:text-[#3D1F1F] transition-colors duration-200"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Dev<span className="text-[#7C3535]">Swap</span>
      </span>
    </Link>
  );
}

// ── Nav link with animated underline ──────────────────────────────────────────
function NavLink({ label, active }) {
  return (
    <a
      href="#"
      className={`relative text-sm font-medium transition-colors duration-200 py-1 group ${
        active ? "text-slate-900" : "text-slate-500 hover:text-slate-800"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-0.5 left-0 h-px bg-[#7C3535] transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </a>
  );
}

// ── Notification bell ─────────────────────────────────────────────────────────
function NotificationBell({ count = 2 }) {
  return (
    // suppressHydrationWarning → browser extensions inject fdprocessedid onto buttons
    <button
      suppressHydrationWarning
      className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200 text-slate-500 hover:text-slate-800"
    >
      <Bell size={17} />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1 right-1 w-4 h-4 bg-[#7C3535] text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none"
        >
          {count}
        </motion.span>
      )}
    </button>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ user, size = "md" }) {
  const dim = size === "sm" ? "w-7 h-7 text-[10px]" : "w-8 h-8 text-xs";
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div
      className={`${dim} rounded-full bg-linear-to-br from-[#7C3535] to-[#3D1F1F] flex items-center justify-center text-white font-bold overflow-hidden shrink-0 ring-2 ring-white`}
    >
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name || "User"}
          width={40}
          height={40}
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}

// ── Dropdown item ─────────────────────────────────────────────────────────────
function DropdownItem({ icon: Icon, label, href, onClick, variant = "default" }) {
  const colors = {
    default: "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
    danger: "text-red-500 hover:bg-red-50 hover:text-red-600",
  };
  const cls = `w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 ${colors[variant]}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={cls}>
        <Icon size={15} strokeWidth={2} className="shrink-0 opacity-70" />
        {label}
      </Link>
    );
  }

  return (
    // suppressHydrationWarning → extension attributes (fdprocessedid) on buttons
    <button suppressHydrationWarning onClick={onClick} className={cls}>
      <Icon size={15} strokeWidth={2} className="shrink-0 opacity-70" />
      {label}
    </button>
  );
}

// ── User dropdown panel ───────────────────────────────────────────────────────
function UserDropdown({ session, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-0 top-full mt-2.5 w-56 bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden z-60"
    >
      {/* Identity header */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/70">
        <Avatar user={session.user} />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-slate-900 truncate leading-tight">
            {session.user.name}
          </p>
          <p className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">
            {session.user.email}
          </p>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-1.5">
        <DropdownItem icon={LayoutDashboard} label="Dashboard" href="/user/dashboard" onClick={onClose} />
        <DropdownItem icon={Home} label="Home" href="/" onClick={onClose} />
      </div>

      {/* Sign out */}
      <div className="border-t border-slate-100 py-1.5">
        <DropdownItem
          icon={LogOut}
          label="Sign out"
          onClick={() => { onClose(); signOut(); }}
          variant="danger"
        />
      </div>
    </motion.div>
  );
}

// ── Mobile menu ───────────────────────────────────────────────────────────────
function MobileMenu({ session, open }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl"
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-slate-600 hover:text-slate-900 font-medium py-2.5 border-b border-slate-50 last:border-0 transition-colors"
              >
                {item}
              </a>
            ))}
            {!session && (
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
                <Link
                  href="/sign-in"
                  className="text-sm text-center py-2.5 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="text-sm text-center py-2.5 bg-[#3D1F1F] rounded-xl text-white font-semibold hover:bg-[#2d1616] transition-colors"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar({ session, activeLink = "" }) {
  const pathname = usePathname();
  const [scrolled,     setScrolled]     = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const dropdownRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Don't show navbar on auth pages
  if (pathname?.includes("/sign-in") || pathname?.includes("/sign-up")) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Main bar ── */}
      <div
        className={`transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white/92 backdrop-blur-xl border-b border-slate-200/70 shadow-sm shadow-slate-100/80"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-3.5 flex items-center justify-between gap-4">

          {/* Logo */}
          <DevSwapLogo />

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((item) => (
              <NavLink key={item} label={item} active={activeLink === item} />
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {session ? (
              <>
                {/* Bell — hidden on mobile */}
                <div className="hidden sm:block">
                  <NotificationBell count={2} />
                </div>

                {/* User menu */}
                <div ref={dropdownRef} className="relative">
                  {/*
                    suppressHydrationWarning fixes:
                    Browser extensions (LastPass, Grammarly, etc.) inject
                    fdprocessedid onto <button> elements client-side.
                    This causes a server/client HTML mismatch in Next.js SSR.
                    suppressHydrationWarning tells React to ignore attribute
                    differences on this element only — safe and surgical.
                  */}
                  <button
                    suppressHydrationWarning
                    onClick={() => setShowDropdown((v) => !v)}
                    className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full border transition-all duration-200 ${
                      showDropdown
                        ? "border-slate-300 bg-slate-50 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Avatar user={session.user} />
                    <span className="text-[13px] font-semibold text-slate-700 hidden sm:block max-w-20 truncate">
                      {session.user.name?.split(" ")[0]}
                    </span>
                    <motion.div
                      animate={{ rotate: showDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={14} strokeWidth={2.5} className="text-slate-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <UserDropdown
                        session={session}
                        onClose={() => setShowDropdown(false)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden sm:block text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 px-2 py-1"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="relative text-sm px-5 py-2.5 rounded-full bg-[#3D1F1F] text-white font-semibold overflow-hidden group transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <span className="relative z-10">Get started</span>
                  <span className="absolute inset-0 bg-[#2d1616] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              suppressHydrationWarning
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.25 rounded-xl hover:bg-slate-100 transition-colors ml-1"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block w-5 h-0.5 bg-slate-700 rounded-full origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.18 }}
                className="block w-5 h-0.5 bg-slate-700 rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block w-5 h-0.5 bg-slate-700 rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu session={session} open={mobileOpen} />
    </motion.header>
  );
}
