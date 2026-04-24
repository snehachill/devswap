"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowRightLeft,
  CheckCircle2,
  Clock3,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";

/* ─── Easing ─── */
const ease = [0.22, 1, 0.36, 1];
const springBounce = { type: "spring", stiffness: 400, damping: 18 };

/* ─── Variants ─── */
const fadeUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.09, ease },
  }),
};

const slideInVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease },
  }),
};

const popVariants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

/* ─── Data ─── */
const heroStats = [
  { label: "Students onboard", value: "2.4K+", icon: Users },
  { label: "Campuses represented", value: "80+", icon: Zap },
  { label: "Skill categories", value: "200+", icon: Sparkles },
];

const skillTags = ["React", "Figma", "Python", "Node.js", "UI Design", "Data Structures"];

const featureCards = [
  {
    icon: ShieldCheck,
    title: "Verified student community",
    body: "Profiles are built for real college students, so swaps feel trustworthy from the first message.",
    accent: "from-[#546b41]/10 to-[#546b41]/5",
    iconBg: "bg-[#546b41]/10 text-[#546b41]",
  },
  {
    icon: ArrowRightLeft,
    title: "Balanced skill barter",
    body: "Offer what you already know and request what you want to learn in the same flow.",
    accent: "from-[#99ad7a]/10 to-[#99ad7a]/5",
    iconBg: "bg-[#99ad7a]/10 text-[#99ad7a]",
  },
  {
    icon: MessageSquareText,
    title: "Requests that lead to sessions",
    body: "Discover compatible matches, send a structured request, then continue the exchange in chat.",
    accent: "from-[#dcccac]/10 to-[#dcccac]/5",
    iconBg: "bg-[#dcccac]/10 text-[#dcccac]",
  },
];

const steps = [
  {
    number: "01",
    title: "Build your profile",
    body: "List the skills you can teach and the ones you want to learn so the platform can find stronger pairings.",
  },
  {
    number: "02",
    title: "Find a complementary match",
    body: "Browse compatible students by skill overlap, availability, and learning intent instead of random searching.",
  },
  {
    number: "03",
    title: "Swap and keep momentum",
    body: "Send a request, align on the exchange, then turn one good skill into the next one you need.",
  },
];

const testimonials = [
  {
    name: "Riya Sharma",
    detail: "VIT Vellore",
    quote: "I traded Python help for UI feedback and both of us walked away with portfolio-ready progress.",
    initials: "RS",
    color: "bg-[#546b41]/20 text-[#546b41]",
  },
  {
    name: "Karan Mehta",
    detail: "NIT Trichy",
    quote: "The discover flow made it easy to find someone who needed Flutter and could teach backend properly.",
    initials: "KM",
    color: "bg-[#99ad7a]/20 text-[#99ad7a]",
  },
  {
    name: "Sneha Iyer",
    detail: "IIIT Hyderabad",
    quote: "It feels more like a real student network than a generic marketplace, which makes the swaps easier to trust.",
    initials: "SI",
    color: "bg-[#dcccac]/20 text-[#dcccac]",
  },
];

const faqs = [
  {
    question: "Is DevSwap paid?",
    answer: "The product is framed around peer-to-peer skill exchange, so the core idea is learning by trading what you already know.",
  },
  {
    question: "Who is it for?",
    answer: "The current homepage and product flow are clearly designed for students who want to exchange practical skills with each other.",
  },
  {
    question: "What kinds of skills fit here?",
    answer: "Technical, design, and project-focused skills all fit well as long as someone can teach them and someone else wants to learn them.",
  },
];

/* ─── Sub-components ─── */
function SectionBadge({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease }}
      className="inline-flex items-center gap-2 rounded-full border border-[#546b41]/20 bg-[#546b41]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#546b41]"
    >
      <Sparkles size={13} />
      {children}
    </motion.div>
  );
}

function FadeUp({ children, delay = 0, className = "", custom = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUpVariants}
      custom={custom}
      style={{ transitionDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Animated counter hook */
function useCountUp(target, inView) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    let timer;

    if (isNaN(numeric)) {
      timer = setTimeout(() => setDisplay(target), 0);
    } else {
      let start = 0;
      const duration = 1200;
      const step = 16;
      const increment = numeric / (duration / step);
      timer = setInterval(() => {
        start += increment;
        if (start >= numeric) {
          setDisplay(target);
          clearInterval(timer);
        } else {
          setDisplay(Math.floor(start) + suffix);
        }
      }, step);
    }

    return () => {
      if (typeof timer === "number") {
        clearTimeout(timer);
        clearInterval(timer);
      }
    };
  }, [inView, target]);

  return display;
}

function AnimatedStat({ stat, index }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const count = useCountUp(stat.value, inView);
  const Icon = stat.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={popVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm cursor-default"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-[#546b41]/70" />
        <p className="text-sm text-slate-500">{stat.label}</p>
      </div>
      <p className="text-3xl font-bold tracking-tight text-slate-900">{count}</p>
    </motion.div>
  );
}

function AccordionFAQ({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      variants={cardItemVariants}
      whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
      className="ui-card overflow-hidden cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item.question}</h3>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25, ease }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 flex-shrink-0 ml-4"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.p
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease }}
              className="text-sm leading-7 text-slate-600 overflow-hidden"
            >
              {item.answer}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="min-h-screen overflow-hidden bg-transparent px-5 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ── HERO ── */}
        <section
          ref={heroRef}
          className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/85 px-6 py-10 shadow-[0_18px_60px_rgba(79,70,229,0.08)] backdrop-blur-xl sm:px-8 sm:py-14 lg:px-12"
        >
          {/* Animated ambient gradient blobs */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#546b41]/30 blur-3xl"
              animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-20 -right-16 w-80 h-80 rounded-full bg-[#99ad7a]/30 blur-3xl"
              animate={{ x: [0, -18, 0], y: [0, 12, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(84,107,65,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(153,173,122,0.16),transparent_30%)]" />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]"
          >
            {/* Left column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <SectionBadge>Skill exchange for students</SectionBadge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
                className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              >
                Learn faster by trading the skills you already have.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg"
              >
                DevSwap turns student knowledge into momentum. Teach one thing well, find someone
                who needs it, and exchange that value for the skill you want next.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {/* Pulsing CTA */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(79,70,229,0.4)",
                      "0 0 0 10px rgba(79,70,229,0)",
                      "0 0 0 0 rgba(79,70,229,0)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="rounded-full"
                >
                  <Link
                    href="/sign-up"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#546b41] px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-px hover:bg-[#3d4f2f] active:scale-95"
                  >
                    Get started
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                    >
                      <ArrowRight size={16} />
                    </motion.div>
                  </Link>
                </motion.div>
                <Link
                  href="#how"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-[#546b41]/30 hover:text-[#546b41] hover:-translate-y-px"
                >
                  See how it works
                </Link>
              </motion.div>

              {/* Floating skill tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {skillTags.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.5 + i * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
                    whileHover={{ scale: 1.08, y: -2, transition: { duration: 0.15 } }}
                    className="inline-flex cursor-default rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600"
                    style={{ animation: `devswap-float 2.8s ease-in-out ${i * 0.35}s infinite` }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Right column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="grid gap-4"
            >
              {/* Match card */}
              <motion.div
                whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
                className="rounded-[32px] bg-gradient-to-br from-[#546b41] to-[#99ad7a] p-6 text-white shadow-[0_18px_50px_rgba(84,107,65,0.24)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Live match snapshot</p>
                    <p className="mt-2 text-2xl font-semibold">Frontend for Product Design</p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="rounded-2xl bg-white/15 p-3"
                  >
                    <ArrowRightLeft size={22} />
                  </motion.div>
                </div>

                <div className="mt-6 grid gap-3">
                  {[
                    { label: "Student A teaches", value: "React, Next.js" },
                    { label: "Student B teaches", value: "Figma, UX critique" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease }}
                      className="rounded-2xl bg-white/10 p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-white/60">{item.label}</p>
                      <p className="mt-2 text-lg font-semibold">{item.value}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-6 flex items-center gap-2 text-sm text-white/80"
                >
                  <CheckCircle2 size={16} />
                  Matching works best when both sides can teach and learn.
                </motion.div>
              </motion.div>

              {/* Animated stat cards */}
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {heroStats.map((stat, index) => (
                  <AnimatedStat key={stat.label} stat={stat} index={index} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="ui-section">
          <FadeUp>
            <SectionBadge>Why it fits this product</SectionBadge>
            <h2 className="ui-title mt-5 max-w-3xl text-slate-900">
              A homepage that now looks connected to the app behind it.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              The landing experience now uses the same visual system as the navbar, dashboard,
              and discover pages so users move through one consistent product story.
            </p>
          </FadeUp>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-8 grid gap-5 lg:grid-cols-3"
          >
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title}
                  variants={cardItemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.22 } }}
                  className={`ui-card h-full p-6 bg-gradient-to-b ${card.accent} cursor-default`}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg}`}
                  >
                    <Icon size={22} />
                  </motion.div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{card.body}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="ui-section pt-0">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeUp>
              <SectionBadge>How it works</SectionBadge>
              <h2 className="ui-title mt-5 max-w-xl text-slate-900">
                One clear path from profile to swap request.
              </h2>
              <p className="mt-4 max-w-lg text-base leading-8 text-slate-600">
                This mirrors the app flow users actually have today: set your skills, browse
                discover results, and send a request with a clear teach-and-learn exchange.
              </p>
            </FadeUp>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-4"
            >
              {steps.map((step, index) => (
                <motion.article
                  key={step.number}
                  variants={slideInVariants}
                  custom={index}
                  whileHover={{
                    x: 6,
                    borderColor: "rgba(79,70,229,0.4)",
                    transition: { duration: 0.2 },
                  }}
                  className="ui-card-soft p-6 border border-transparent"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5, transition: springBounce }}
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-bold text-[#546b41] shadow-sm flex-shrink-0"
                    >
                      {step.number}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{step.body}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="community" className="ui-section pt-0">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-5">
              <FadeUp>
                <SectionBadge>Community proof</SectionBadge>
                <h2 className="ui-title mt-5 max-w-2xl text-slate-900">
                  Built around real student collaboration.
                </h2>
              </FadeUp>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="grid gap-5 md:grid-cols-3"
              >
                {testimonials.map((item) => (
                  <motion.article
                    key={item.name}
                    variants={cardItemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="ui-card h-full p-6 cursor-default"
                  >
                    <div className="flex items-center gap-1 text-amber-400">
                      {[0, 1, 2, 3, 4].map((star, i) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + i * 0.06, ease: [0.34, 1.56, 0.64, 1], duration: 0.35 }}
                        >
                          <Star size={15} fill="currentColor" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">&ldquo;{item.quote}&rdquo;</p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${item.color}`}>
                        {item.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-500">{item.detail}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>

            <FadeUp delay={0.12}>
              <motion.aside
                whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
                className="h-full rounded-[32px] border border-[#99ad7a]/20 bg-[#99ad7a]/80 p-6 shadow-sm cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 15, transition: springBounce }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#99ad7a] shadow-sm"
                >
                  <Users size={22} />
                </motion.div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
                  The best swaps happen when intent is visible.
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Clear skills, active requests, and a shared student context make the platform
                  feel more actionable than a generic social feed.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    {
                      icon: Clock3,
                      title: "Faster decision-making",
                      body: "Users can quickly judge whether a swap is worth pursuing.",
                    },
                    {
                      icon: CheckCircle2,
                      title: "Better product continuity",
                      body: "The homepage now sets expectations that match the discover and dashboard flows.",
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease }}
                        className="rounded-2xl border border-white/80 bg-white px-4 py-3 text-sm text-slate-600"
                      >
                        <div className="flex items-center gap-2 font-medium text-slate-900">
                          <Icon size={16} className="text-[#99ad7a]" />
                          {item.title}
                        </div>
                        <p className="mt-1">{item.body}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.aside>
            </FadeUp>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="pb-12">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <FadeUp>
              <SectionBadge>FAQ</SectionBadge>
              <h2 className="ui-title mt-5 max-w-lg text-slate-900">
                Questions users are likely to ask first.
              </h2>
            </FadeUp>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-4"
            >
              {faqs.map((item, index) => (
                <AccordionFAQ key={item.question} item={item} index={index} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <FadeUp>
          <section className="overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-[#546b41] to-[#99ad7a] px-6 py-10 text-white shadow-[0_24px_70px_rgba(15,23,42,0.24)] sm:px-8 sm:py-12 lg:px-10 relative">
            {/* Animated background orbs */}
            <motion.div
              className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#546b41]/10 blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#99ad7a]/10 blur-3xl pointer-events-none"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <SectionBadge>Ready to swap</SectionBadge>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                  className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  Start with the skills you already have and turn them into the ones you need.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.2, ease }}
                  className="mt-4 max-w-2xl text-base leading-8 text-slate-300"
                >
                  Join DevSwap, complete your profile, and let the discover flow do the heavy lifting.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-wrap gap-3"
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/sign-up"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-px"
                  >
                    Create account
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/sign-in"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10"
                  >
                    Sign in
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </FadeUp>
      </div>

      {/* Global keyframes for floating skill tags */}
      <style>{`
        @keyframes devswap-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </main>
  );
}