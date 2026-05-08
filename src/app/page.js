"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Brain,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const skillTags = [
  "React.js",
  "Next.js",
  "Node.js",
  "Python",
  "MongoDB",
  "DSA",
  "GitHub",
  "UI/UX",
  "Machine Learning",
  "APIs",
];


const features = [
  {
    icon: Search,
    title: "Find the right match",
    text: "Discover people whose learning goals fit what you can teach.",
    className: "md:col-span-2",
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Verified profiles",
    text: "Clear profiles help every exchange start with context.",
    className: "",
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: MessageCircle,
    title: "Built-in chat",
    text: "Send requests, coordinate sessions, and keep progress in one place.",
    className: "",
    iconClass: "bg-orange-50 text-orange-600",
  },
  {
    icon: Brain,
    title: "Learn by teaching",
    text: "Trade time, knowledge, and feedback without turning learning into a transaction.",
    className: "md:col-span-2",
    iconClass: "bg-pink-50 text-pink-600",
  },
];

const timeline = [
  {
    title: "Create your profile",
    text: "Add what you can teach and what you want to learn.",
  },
  {
    title: "Choose a partner",
    text: "Compare skills, intent, and availability before sending a request.",
  },
  {
    title: "Start the swap",
    text: "Move into chat and turn a shared goal into a real session.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease },
  }),
};

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FloatingTags() {
  return (
    <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
      {skillTags.map((tag, index) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.35 + index * 0.04, ease }}
          whileHover={{ y: -5, scale: 1.03 }}
          className="rounded-full border border-slate-100 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-xl shadow-slate-200/60"
          style={{
            animation: `skillswap-float ${4 + (index % 4) * 0.6}s ease-in-out ${index * 0.18}s infinite`,
          }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4f46e5]">
          Features
        </p>
        <h2 className="mt-4 font-serif text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Designed for clear, useful exchanges.
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <Reveal key={feature.title} delay={index * 0.07} className={feature.className}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-[28px] border border-slate-100 bg-white p-7 shadow-xl shadow-slate-200/60"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.iconClass}`}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="mt-7 text-2xl font-bold tracking-tight text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
                  {feature.text}
                </p>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function TimelineStep({ step, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease }}
      className="relative pl-12"
    >
      <motion.span
        animate={{
          backgroundColor: inView ? "#4f46e5" : "#e2e8f0",
          scale: inView ? 1.08 : 1,
        }}
        className="absolute left-[9px] top-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white text-xs font-bold text-white shadow-lg"
      >
        {index + 1}
      </motion.span>
      <motion.article
        animate={{ opacity: inView ? 1 : 0.55 }}
        className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60"
      >
        <h3 className="text-xl font-bold tracking-tight text-slate-950">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate-500">{step.text}</p>
      </motion.article>
    </motion.div>
  );
}

function Timeline() {
  return (
    <section id="how" className="mx-auto max-w-5xl px-5 py-20 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4f46e5]">
          How it works
        </p>
        <h2 className="mt-4 font-serif text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Three steps to your first swap.
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-12 max-w-2xl space-y-6">
        <div className="absolute bottom-6 left-6 top-6 w-px bg-slate-200" />
        {timeline.map((step, index) => (
          <TimelineStep key={step.title} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[36px] border border-slate-100 bg-white px-6 py-14 text-center shadow-xl shadow-slate-200/70 sm:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.18),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(167,139,250,0.16),transparent_30%),radial-gradient(circle_at_55%_95%,rgba(134,239,172,0.18),transparent_32%)]" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#4f46e5]">
              Join SkillSwap
            </p>
            <h2 className="mt-4 font-serif text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Start learning from the skills you already have.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Create a profile, list your teaching and learning skills, and send your first request.
            </p>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className="mt-8">
              <Link
                href="/sign-up"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#4f46e5] px-7 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition hover:shadow-2xl hover:shadow-indigo-500/35"
              >
                Join for Free
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 72]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-slate-950">
      <section
        ref={heroRef}
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-5 pb-20 pt-32 text-center sm:px-6 lg:px-8"
      >
        <motion.div style={{ y: heroY }} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, ease }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4f46e5] shadow-xl shadow-slate-200/70"
          >
            <motion.span
              className="h-2 w-2 rounded-full bg-[#4f46e5]"
              animate={{ scale: [1, 1.8, 1], opacity: [0.9, 0.35, 0.9] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            Learning Redefined
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08, ease }}
            className="mx-auto mt-7 max-w-5xl font-serif text-5xl font-black tracking-[-0.04em] text-slate-950 sm:text-7xl lg:text-8xl"
          >
            Master tech skills, by{" "}
            <span className="bg-gradient-to-r from-[#4f46e5] to-[#86a889] bg-clip-text text-transparent">
              teaching one.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.18, ease }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600"
          >
            SkillSwap connects tech students who want to trade code, design, data, and interview skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.56, delay: 0.28, ease }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/sign-up"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#4f46e5] px-6 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-500/35"
            >
              Join for Free
              <ArrowRight size={17} />
            </Link>
            <Link
              href="#how"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-xl shadow-slate-200/60 transition hover:-translate-y-0.5 hover:text-[#4f46e5]"
            >
              See how it works
            </Link>
          </motion.div>
          <FloatingTags />
        </motion.div>
      </section>

      <FeatureGrid />
      <Timeline />
      <CTA />

      <style>{`
        @keyframes skillswap-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </main>
  );
}
