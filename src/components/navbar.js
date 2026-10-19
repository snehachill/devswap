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
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D89216] text-[#11201b]">
        <ArrowLeftRight size={16} />
      </span>
      <span
        className="text-[1.4rem] font-semibold tracking-tight text-[#11201b] transition-colors duration-300"
        style={{ fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif" }}
      >
        Dev<span className="text-[#8F5E00]">Swap</span>
      </span>
    </Link>
  );
}

function NavLink({ href, label, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center py-2 text-xs font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${
        active ? "text-[#11201b]" : "text-[#72766f] hover:text-[#11201b]"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-[#D89216] transition-all duration-300 ${
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
    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#D89216] text-xs font-semibold text-[#11201b]">
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
  const className = `flex w-full items-center gap-2.5 rounded-full px-3 py-2.5 text-sm transition-colors duration-300 ${
    danger
      ? "text-rose-600 hover:bg-rose-50 hover:text-rose-700"
      : "text-[#72766f] hover:bg-[#ffffff] hover:text-[#11201b]"
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
      className="absolute right-0 top-full mt-3 w-64 rounded-[28px] border border-[#e5e0d6] bg-white p-3 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 rounded-[28px] bg-white/70 px-3 py-3">
        <Avatar user={session.user} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#11201b]">
            {session.user.name}
          </p>
          <p className="truncate text-xs text-[#72766f]">{session.user.email}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <DropdownItem icon={LayoutDashboard} label="Dashboard" href="/user/dashboard" onClick={onClose} />
        <DropdownItem icon={User} label="Profile" href="/user/profile" onClick={onClose} />
        <DropdownItem icon={Home} label="Home" href="/" onClick={onClose} />
      </div>

      <div className="mt-3 border-t border-[#e5e0d6]/70 pt-3">
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
          className="border-t border-[#e5e0d6] bg-white/95 px-5 pb-5 pt-4 backdrop-blur-[18px] md:hidden"
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
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#e5e0d6] bg-white px-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#11201b] transition-all duration-300 hover:bg-[#f4f5f7]"
                >
                  Go To Dashboard
                </Link>
                <Link
                  href="/user/profile"
                  onClick={onClose}
                  className="text-sm uppercase tracking-[0.14em] text-[#72766f] transition-colors duration-300 hover:text-[#11201b]"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#11201b] px-5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-[#263b34]"
                >
                  Get Started
                </Link>
                <Link
                  href="/sign-in"
                  onClick={onClose}
                  className="text-sm uppercase tracking-[0.14em] text-[#72766f] transition-colors duration-300 hover:text-[#11201b]"
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

  if (
    pathname?.includes("/sign-in") ||
    pathname?.includes("/sign-up") ||
    pathname?.startsWith("/user/chat")
  ) {
    return null;
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
      style={{ fontFamily: "var(--font-text), ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="border-b border-[#e5e0d6] bg-white/95 shadow-[0_3px_14px_rgba(17,32,27,0.045)] backdrop-blur-xl transition-all duration-300 ease-out">
        <div className="mx-auto flex h-[58px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-14">
          <div className={`min-w-0 items-center ${session ? "hidden sm:flex" : "flex"}`}>
            <DevSwapLogo />
          </div>

          {!session ? (
            <nav className="hidden items-center gap-7 md:flex">
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
                  className="inline-flex min-h-9 items-center rounded-lg border border-[#e5e0d6] bg-white px-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-[#11201b] transition-all duration-200 hover:border-[#D89216]/50 hover:bg-[#fffaf2] sm:px-4"
                >
                  Requests
                </Link>

                <Link
                  href="/user/discover"
                  className="inline-flex min-h-9 items-center rounded-lg bg-[#11201b] px-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:bg-[#263b34] sm:px-4"
                >
                  Discover
                </Link>

                <div ref={dropdownRef} className="relative block">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setShowDropdown((value) => !value)}
                    className="inline-flex items-center gap-2 rounded-none px-1.5 py-1 transition-all duration-300 hover:bg-[#ffffff]"
                  >
                    <Avatar user={session.user} />
                    <ChevronDown size={15} className="text-[#72766f]" />
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
                  className="hidden text-[11px] font-semibold uppercase tracking-[0.14em] text-[#72766f] transition-colors duration-200 hover:text-[#11201b] sm:inline-flex"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden min-h-9 items-center rounded-lg bg-[#11201b] px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-[#263b34] sm:inline-flex"
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
              className={`h-9 w-9 items-center justify-center rounded-lg border border-[#e5e0d6] text-[#11201b] transition-all duration-200 hover:bg-[#fffaf2] md:hidden ${
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
