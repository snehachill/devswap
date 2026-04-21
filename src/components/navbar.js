"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  LogOut,
  LayoutDashboard,
  User,
  Home,
  ChevronDown,
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
      <span
        className="text-[1.55rem] font-normal tracking-[0.01em] text-[#4B2E2B] transition-colors duration-300"
        style={{ fontFamily: "var(--font-dm-serif), serif" }}
      >
        DevSwap
      </span>
      <span className="h-2.5 w-2.5 rounded-full bg-[#C08552] transition-transform duration-300 group-hover:scale-110" />
    </Link>
  );
}

function NavLink({ href, label, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center py-2 text-xs font-medium uppercase tracking-[0.06em] transition-colors duration-300 ${
        active ? "text-[#4B2E2B]" : "text-[#8C5A3C] hover:text-[#4B2E2B]"
      }`}
    >
      {label}
      <span
        className={`absolute bottom-0 left-0 h-px bg-[#C08552] transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

function IconButton({ label, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      suppressHydrationWarning
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#4B2E2B] transition-all duration-300 hover:bg-[rgba(192,133,82,0.14)] hover:text-[#4B2E2B]"
    >
      {children}
    </button>
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
    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#4B2E2B] text-xs font-semibold text-[#FFF8F0]">
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
      ? "text-[#8C5A3C] hover:bg-[rgba(192,133,82,0.12)] hover:text-[#4B2E2B]"
      : "text-[#8C5A3C] hover:bg-[rgba(192,133,82,0.12)] hover:text-[#4B2E2B]"
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
      className="absolute right-0 top-full mt-3 w-64 rounded-3xl border border-[rgba(140,90,60,0.12)] bg-[rgba(255,248,240,0.96)] p-3 shadow-[0_18px_50px_rgba(75,46,43,0.10)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 rounded-[20px] bg-white/60 px-3 py-3">
        <Avatar user={session.user} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#4B2E2B]">
            {session.user.name}
          </p>
          <p className="truncate text-xs text-[#8C5A3C]">{session.user.email}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <DropdownItem icon={LayoutDashboard} label="Dashboard" href="/user/dashboard" onClick={onClose} />
        <DropdownItem icon={User} label="Profile" href="/user/profile" onClick={onClose} />
        <DropdownItem icon={Home} label="Home" href="/" onClick={onClose} />
      </div>

      <div className="mt-3 border-t border-[rgba(140,90,60,0.12)] pt-3">
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
          className="border-t border-[rgba(140,90,60,0.12)] bg-[rgba(255,248,240,0.94)] px-5 pb-5 pt-4 backdrop-blur-[18px] md:hidden"
        >
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

          <div className="mt-5 flex items-center gap-2">
            <IconButton label="Search">
              <Search size={17} strokeWidth={1.9} />
            </IconButton>
            <IconButton label="Cart">
              <ShoppingBag size={17} strokeWidth={1.9} />
            </IconButton>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {session ? (
              <>
                <Link
                  href="/user/dashboard"
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#4B2E2B] px-5 text-sm font-medium text-[#FFF8F0] transition-all duration-300 hover:-translate-y-px hover:bg-[#4B2E2B]"
                >
                  Go To Dashboard
                </Link>
                <Link
                  href="/user/profile"
                  onClick={onClose}
                  className="text-sm uppercase tracking-[0.06em] text-[#8C5A3C] transition-colors duration-300 hover:text-[#4B2E2B]"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/sign-up"
                  onClick={onClose}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#4B2E2B] px-5 text-sm font-medium text-[#FFF8F0] transition-all duration-300 hover:-translate-y-px hover:bg-[#4B2E2B]"
                >
                  Get Started
                </Link>
                <Link
                  href="/sign-in"
                  onClick={onClose}
                  className="text-sm uppercase tracking-[0.06em] text-[#8C5A3C] transition-colors duration-300 hover:text-[#4B2E2B]"
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

  const glassActive = true;

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
      style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}
    >
      <div
        className="transition-all duration-300 ease-out"
        style={{
          background: glassActive ? "rgba(255, 255, 255, 0.72)" : "transparent",
          backdropFilter: glassActive ? "blur(18px)" : "none",
          WebkitBackdropFilter: glassActive ? "blur(18px)" : "none",
          borderBottom: glassActive ? "1px solid rgba(140, 90, 60, 0.12)" : "1px solid transparent",
          boxShadow: glassActive ? "0 10px 30px rgba(75, 46, 43, 0.07)" : "none",
        }}
      >
        <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className="flex min-w-0 items-center">
            <DevSwapLogo />
          </div>

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

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden items-center gap-1 sm:flex">
              <IconButton label="Search">
                <Search size={17} strokeWidth={1.9} />
              </IconButton>
              <IconButton label="Cart">
                <ShoppingBag size={17} strokeWidth={1.9} />
              </IconButton>
            </div>

            {session ? (
              <>
                <Link
                  href="/user/requests"
                  className="hidden min-h-10 items-center rounded-full bg-[#8C5A3C] px-5 text-sm font-medium text-[#FFF8F0] transition-all duration-300 hover:-translate-y-px hover:bg-[#8C5A3C] sm:inline-flex"
                >
                  Requests
                </Link>

                <Link
                  href="/user/discover"
                  className="hidden min-h-10 items-center rounded-full bg-[#4B2E2B] px-5 text-sm font-medium text-[#FFF8F0] transition-all duration-300 hover:-translate-y-px hover:bg-[#4B2E2B] sm:inline-flex"
                >
                  Discover
                </Link>

                <div ref={dropdownRef} className="relative hidden sm:block">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setShowDropdown((value) => !value)}
                    className="inline-flex items-center gap-2 rounded-full px-1.5 py-1 transition-all duration-300 hover:bg-[rgba(192,133,82,0.10)]"
                  >
                    <Avatar user={session.user} />
                    <ChevronDown size={15} className="text-[#8C5A3C]" />
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
                  className="hidden text-xs font-medium uppercase tracking-[0.06em] text-[#8C5A3C] transition-colors duration-300 hover:text-[#4B2E2B] sm:inline-flex"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden min-h-10 items-center rounded-full bg-[#4B2E2B] px-5 text-sm font-medium text-[#FFF8F0] transition-all duration-300 hover:-translate-y-px hover:bg-[#4B2E2B] sm:inline-flex"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#4B2E2B] transition-all duration-300 hover:bg-[rgba(192,133,82,0.14)] md:hidden"
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
