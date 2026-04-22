"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const swaps = [
  { teach: "React.js", learn: "UI/UX Design", from: "ST", to: "AK", colorA: "#7C3AED", colorB: "#059669" },
  { teach: "Python", learn: "Machine Learning", from: "RK", to: "PM", colorA: "#DC2626", colorB: "#D97706" },
  { teach: "Node.js", learn: "DevOps", from: "VN", to: "RS", colorA: "#2563EB", colorB: "#059669" },
  { teach: "Figma", learn: "Next.js", from: "DM", to: "YS", colorA: "#DB2777", colorB: "#2563EB" },
  { teach: "SQL", learn: "Data Science", from: "KP", to: "AR", colorA: "#D97706", colorB: "#7C3AED" },
];

const skills = [
  "React.js", "Figma", "Python", "Node.js", "UI/UX", "MongoDB",
  "TypeScript", "Machine Learning", "DevOps", "Vue.js", "PostgreSQL", "Docker",
];

const steps = [
  {
    num: "01", title: "Build your profile",
    desc: "List the skills you can teach and the ones you want to learn. Your profile is your currency.",
    accent: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE",
  },
  {
    num: "02", title: "Get matched",
    desc: "Our engine finds students whose teach stack matches your learn stack — and vice versa.",
    accent: "#059669", bg: "#ECFDF5", border: "#A7F3D0",
  },
  {
    num: "03", title: "Request a swap",
    desc: "Send a swap request. Once both sides accept, a private chat opens for you to coordinate.",
    accent: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE",
  },
  {
    num: "04", title: "Teach and learn",
    desc: "Run your sessions on your own schedule. Both of you grow. No platforms, no middlemen.",
    accent: "#D97706", bg: "#FFFBEB", border: "#FDE68A",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF8F0]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F0] via-transparent to-[#FFF8F0] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8F0] via-transparent to-[#FFF8F0] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-100 h-100 rounded-full bg-[#C08552]/10 blur-[80px] opacity-50 pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-28">
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4B2E2B] bg-[#4B2E2B] text-white text-xs font-semibold mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Now live for students · Free forever
        </motion.div>

        <motion.h1
          variants={stagger} initial="hidden" animate="visible"
          className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.04em] mb-6"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          <motion.span variants={fadeUp} custom={1} className="block text-slate-900">Trade skills,</motion.span>
          <motion.span variants={fadeUp} custom={2} className="block text-[#4B2E2B]">not money.</motion.span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={3}
          className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10"
        >
          DevSwap connects students with complementary skills. You teach what you know, you learn what you want. No fees, no gatekeeping.
        </motion.p>

        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={4}
          className="flex items-center justify-center gap-3 flex-wrap mb-16"
        >
          <a href="/sign-up" className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#4B2E2B] text-white text-sm font-semibold hover:bg-[#4B2E2B] transition-all duration-200 active:scale-95 shadow-md shadow-[#4B2E2B]">
            Start swapping
            <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>→</motion.span>
          </a>
          <a href="#how" className="px-7 py-3.5 rounded-full border border-slate-200 text-slate-600 text-sm font-medium hover:border-slate-400 hover:text-slate-900 transition-all duration-200 bg-white">
            See how it works
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={5}
          className="flex items-center justify-center gap-12 pt-8 border-t border-slate-100"
        >
          {[["500+", "Students"], ["1.2k+", "Skills listed"], ["98%", "Match rate"]].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{num}</div>
              <div className="text-xs text-slate-400 mt-0.5 font-medium">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-slate-300 to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="py-28 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14">
          <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-semibold mb-3">How it works</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Simple as a <span className="text-[#4B2E2B]">handshake.</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl p-7 border transition-shadow duration-300 hover:shadow-lg cursor-default"
              style={{ background: step.bg, borderColor: step.border }}
            >
              <div className="text-5xl font-black mb-5 tabular-nums leading-none" style={{ color: step.accent, opacity: 0.18 }}>
                {step.num}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: step.accent }}>{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SwapCard({ swap, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: swap.colorA }}>
          {swap.from}
        </div>
        <div className="flex-1 flex items-center gap-1.5">
          <div className="flex-1 h-px bg-slate-200" />
          <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="text-slate-300 text-sm">⇄</motion.span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: swap.colorB }}>
          {swap.to}
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">Teaches {swap.teach}</span>
        <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">Learns {swap.learn}</span>
      </div>
    </motion.div>
  );
}

function LiveSwaps() {
  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-semibold">Live activity</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Swaps happening <span className="text-[#4B2E2B]">right now.</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {swaps.map((swap, i) => <SwapCard key={i} swap={swap} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function SkillCloud() {
  return (
    <section className="py-28 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          Every skill is <span className="text-[#4B2E2B]">currency.</span>
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} className="text-slate-500 text-base">
          From code to design to data — the community grows with every swap.
        </motion.p>
      </div>
      <div className="max-w-3xl mx-auto flex flex-wrap gap-3 justify-center">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.07, transition: { duration: 0.15 } }}
            className="inline-block text-sm px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 cursor-default select-none font-medium hover:border-[#4B2E2B] hover:text-[#4B2E2B] hover:bg-[#4B2E2B] transition-colors duration-200 shadow-sm"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { text: "Taught React, learned Figma in 2 weeks. Best decision ever.", name: "Arjun K.", role: "3rd year, CSE" },
    { text: "Found a ML mentor by offering my Python skills. This is genius and fablous.", name: "Priya M.", role: "4th year, IT" },
    { text: "DevSwap replaced a ₹5000 Udemy course for me. No joke.", name: "Rahul S.", role: "2nd year, CSE" },
  ];

  return (
    <section className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Students <span className="text-[#4B2E2B]">love it.</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#7C3AED">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4 font-medium">&ldquo;{q.text}&rdquo;</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#492828] flex items-center justify-center text-xs font-bold text-[#492828]">
                  {q.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">{q.name}</p>
                  <p className="text-xs text-slate-400">{q.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-28 px-6 bg-slate-50">
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="relative bg-[#4B2E2B] rounded-3xl p-12 overflow-hidden shadow-xl shadow-[#4B2E2B]">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 relative" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Ready to swap?
          </h2>
          <p className="text-[#FFF8F0] mb-8 text-base relative">
            Join 500+ students already building skills — and friendships — through DevSwap.
          </p>
          <a href="/sign-up" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#4B2E2B] text-sm font-bold hover:bg-[#FFF8F0] transition-all duration-200 active:scale-95 relative shadow-lg">
            Create your profile free →
          </a>
          <p className="text-xs text-[#FFF8F0] mt-5 relative">Sign in with Google or GitHub. No passwords needed.</p>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-100 py-8 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#4B2E2B] flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M7 16l-4-4 4-4M17 8l4 4-4 4M14 4l-4 16" />
            </svg>
          </div>
          <span className="text-slate-500 text-sm font-medium">DevSwap</span>
        </div>
        <p className="text-slate-400 text-xs">Built by Sneha Tiwari · AKS University · B.Tech CSE 2025</p>
        <div className="flex gap-6">
          {["GitHub", "Privacy", "Terms"].map((l) => (
            <a key={l} href="#" className="text-xs text-slate-400 hover:text-slate-700 transition-colors font-medium">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #FFF8F0; margin: 0; -webkit-font-smoothing: antialiased; }
        ::selection { background: #DDD6FE; color: #4C1D95; }
      `}</style>
      <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="bg-[#FFF8F0] text-slate-900 min-h-screen">
        <HeroSection />
        <HowItWorks />
        <LiveSwaps />
        <SkillCloud />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
