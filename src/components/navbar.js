"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  User,
  Home,
  ChevronDown,
  ArrowLeftRight,
} from "lucide-react";
import { signOut } from "next-auth/react";

const NAV_LINKS = [
  { label: "How It Works", href: "/#how" },
  { label: "Features", href: "/#features" },
  { label: "Community", href: "/#community" },
];

function DevSwapLogo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#1A3FA6] to-[#5BABF0] text-white shadow-md shadow-[#1A3FA6]/20">
        <ArrowLeftRight size={16} />
      </span>
      <span
        className="text-[1.4rem] font-medium tracking-tight text-slate-900 transition-colors duration-300"
        style={{ fontFamily: "var(--font-dm-serif), serif" }}
      >
        Dev<span className="text-[#1A3FA6]">Swap</span>
      </span>
    </Link>
  );
}

function NavLink({ href, label, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-300 ${
        active ? "text-slate-900" : "text-slate-500 hover:text-[#1A3FA6]"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-[#1A3FA6] transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

function Avatar({ user }) {
  const initials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#1A3FA6] text-xs font-semibold text-white">
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name || "User"}
          width={36}
          height={36}
          className="h-full w-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}

function DropdownItem({ icon: Icon, label, href, onClick, danger = false }) {
  const className = `flex w-full items-center gap-2.5 rounded-2xl px-3 py-2.5 text-sm transition-colors duration-300 ${
    danger
      ? "text-rose-600 hover:bg-rose-50 hover:text-rose-700"
      : "text-slate-600 hover:bg-[#1A3FA6]/10 hover:text-[#1A3FA6]"
  }`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        <Icon size={16} />
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={onClick}
      className={className}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function UserDropdown({ session, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute right-0 top-full mt-3 w-64 rounded-3xl border border-[#5BABF0]/20 bg-white/95 p-3 shadow-[0_18px_50px_rgba(26,63,166,0.12)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 rounded-[20px] bg-white/60 px-3 py-3">
        <Avatar user={session.user} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900">
            {session.user.name}
          </p>
          <p className="truncate text-xs text-slate-500">{session.user.email}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <DropdownItem icon={LayoutDashboard} label="Dashboard" href="/user/dashboard" onClick={onClose} />
        <DropdownItem icon={User} label="Profile" href="/user/profile" onClick={onClose} />
        <DropdownItem icon={Home} label="Home" href="/" onClick={onClose} />
      </div>

      <div className="mt-3 border-t border-[#5BABF0]/25 pt-3">
        <DropdownItem
          icon={LogOut}
          label="Sign Out"
          danger
          onClick={() => {
            onClose();
            signOut();
          }}
        />
      </div>
    </motion.div>
  );
}

function MobileMenu({ open, session, onClose }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="border-t border-[#5BABF0]/20 bg-white/95 px-5 pb-5 pt-4 backdrop-blur-[18px] md:hidden"
        >
          {!session ? (
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  active={false}
                  onClick={onClose}
                />
              ))}
            </nav>
          ) : null}


          <div className="mt-5 flex flex-col gap-3">
            {session ? (
              <>
                <Link
                  href="/user/dashboard"
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A3FA6] px-5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-px hover:bg-[#4A90E8]"
                >
                  Go To Dashboard
                </Link>
                <Link
                  href="/user/profile"
                  onClick={onClose}
                  className="text-sm uppercase tracking-[0.06em] text-slate-500 transition-colors duration-300 hover:text-[#1A3FA6]"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1A3FA6] px-5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-px hover:bg-[#4A90E8]"
                >
                  Get Started
                </Link>
                <Link
                  href="/sign-in"
                  onClick={onClose}
                  className="text-sm uppercase tracking-[0.06em] text-slate-500 transition-colors duration-300 hover:text-[#1A3FA6]"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Navbar({ session }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (pathname?.includes("/sign-in") || pathname?.includes("/sign-up")) {
    return null;
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/70 bg-white/75 shadow-[0_12px_34px_rgba(26,63,166,0.10)] backdrop-blur-xl transition-all duration-300 ease-out">
        <div className="mx-auto flex h-17 items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className={`min-w-0 items-center ${session ? "hidden sm:flex" : "flex"}`}>
            <DevSwapLogo />
          </div>

          {!session ? (
            <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  active={pathname === item.href}
                />
              ))}
            </nav>
          ) : null}

          <div className="flex items-center gap-1 sm:gap-2">
            {session ? (
              <>
                <Link
                  href="/user/requests"
                  className="inline-flex min-h-10 items-center rounded-full border border-[#5BABF0]/30 bg-[#5BABF0]/10 px-4 text-sm font-medium text-[#5BABF0] transition-all duration-300 hover:-translate-y-px hover:bg-[#5BABF0]/20 sm:px-5"
                >
                  Requests
                </Link>

                <Link
                  href="/user/discover"
                  className="inline-flex min-h-10 items-center rounded-full bg-[#1A3FA6] px-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-px hover:bg-[#4A90E8] sm:px-5"
                >
                  Discover
                </Link>

                <div ref={dropdownRef} className="relative block">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setShowDropdown((value) => !value)}
                    className="inline-flex items-center gap-2 rounded-full px-1.5 py-1 transition-all duration-300 hover:bg-[#1A3FA6]/10"
                  >
                    <Avatar user={session.user} />
                    <ChevronDown size={15} className="text-slate-500" />
                  </button>

                  <AnimatePresence>
                    {showDropdown ? (
                      <UserDropdown session={session} onClose={() => setShowDropdown(false)} />
                    ) : null}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden text-xs font-medium uppercase tracking-[0.06em] text-slate-500 transition-colors duration-300 hover:text-[#1A3FA6] sm:inline-flex"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden min-h-10 items-center rounded-full bg-[#1A3FA6] px-5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-px hover:bg-[#4A90E8] sm:inline-flex"
                >
                  Get Started
                </Link>
              </>
            )}

            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle navigation"
              className={`h-10 w-10 items-center justify-center rounded-full text-[#1A3FA6] transition-all duration-300 hover:bg-[#1A3FA6]/10 md:hidden ${
                session ? "hidden" : "inline-flex"
              }`}
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        <MobileMenu open={mobileOpen} session={session} onClose={() => setMobileOpen(false)} />
      </div>
    </motion.header>
  );
}
