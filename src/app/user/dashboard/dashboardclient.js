"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, TrendingUp, Zap } from "lucide-react";

// ─── Animation config ─────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease },
  }),
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, image, initials, size = "lg" }) {
  const sizes = {
    lg: "h-14 w-14 text-lg",
    md: "h-12 w-12 text-base",
  };
  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-[#99ad7a]/20 font-semibold text-[#99ad7a] shrink-0 ${sizes[size]}`}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-full object-cover"
          sizes="56px"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

// ─── Skill Pill ───────────────────────────────────────────────────────────────
function SkillPill({ skill, tone = "mint" }) {
  const tones = {
    mint:  "bg-[#99ad7a]/20 text-[#99ad7a]",
    lilac: "bg-[#546b41]/20 text-[#546b41]",
  };
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium cursor-default ${tones[tone]}`}
    >
      {skill}
    </motion.span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, index }) {
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative rounded-[22px] border border-slate-200 bg-white px-5 py-5 shadow-sm overflow-hidden group"
    >
      {/* Animated top-left glow on hover */}
      <motion.div
        className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-[#546b41]/30 blur-2xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative">
        <p className="text-[15px] text-slate-600 font-medium">{label}</p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease }}
          className="mt-2 text-5xl font-bold tracking-tight text-slate-900"
        >
          {value}
        </motion.p>
      </div>

      {/* Subtle corner accent */}
      <div className="absolute bottom-3 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <TrendingUp size={32} className="text-[#546b41]/20" />
      </div>
    </motion.div>
  );
}

// ─── Section Title ────────────────────────────────────────────────────────────
function SectionTitle({ children, sub }) {
  return (
    <div className="mb-5">
      <h2 className="text-[1.9rem] font-semibold tracking-tight text-[#546b41] leading-tight">
        {children}
      </h2>
      {sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({ title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-[#546b41] flex items-center justify-center mx-auto mb-4">
        <Zap size={20} className="text-slate-400" />
      </div>
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-500 max-w-xs mx-auto">{description}</p>
    </motion.div>
  );
}

// ─── Match Card ───────────────────────────────────────────────────────────────
function MatchCard({ match, index }) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      className="group relative rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      {/* Left border accent that grows on hover */}
      <motion.div
              className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-[#546b41]"
        initial={{ scaleY: 0, opacity: 0 }}
        whileHover={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease }}
        style={{ transformOrigin: "top" }}
      />

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            name={match.name}
            image={match.image}
            initials={match.initials}
            size="md"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
                <p className="text-[1.2rem] font-semibold text-slate-900 leading-tight">
                {match.name}
              </p>
              {match.requestStatus && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.08, ease }}
                  className="rounded-full border border-[#dcccac]/30 bg-[#dcccac]/10 px-3 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[#dcccac]"
                >
                  {match.requestStatus}
                </motion.span>
              )}
            </div>
            {match.headline && (
              <p className="mt-0.5 text-sm text-slate-500 truncate max-w-xs">{match.headline}</p>
            )}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="mt-3 flex flex-wrap gap-2"
            >
              {match.teaches.map((skill) => (
                <SkillPill
                  key={`${match.id}-teach-${skill}`}
                  skill={`Teaches ${skill}`}
                  tone="mint"
                />
              ))}
              {match.learns.map((skill) => (
                <SkillPill
                  key={`${match.id}-learn-${skill}`}
                  skill={`Learns ${skill}`}
                  tone="lilac"
                />
              ))}
            </motion.div>
          </div>
        </div>

        <Link
          href="/user/discover"
          className="group/btn inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#546b41]/30 px-6 text-[15px] font-medium text-[#546b41] transition-all duration-200 hover:border-[#546b41]/50 hover:bg-[#546b41]/10 shrink-0 self-start md:self-auto"
        >
          View
          <ArrowUpRight
            size={15}
            className="opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200"
          />
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────
function SkillsSection({ teachSkills, learnSkills }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease }}
      className="rounded-3xl border border-[#dcccac]/20 bg-white p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    >
      {/* Teaching */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#99ad7a]" />
          <p className="text-[1.15rem] font-semibold text-slate-900">Teaching</p>
        </div>
        {teachSkills.length ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-wrap gap-2.5"
          >
            {teachSkills.map((skill, i) => (
              <motion.div key={`teach-${skill}`} variants={fadeUp} custom={i}>
                <SkillPill skill={skill} tone="mint" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-sm text-slate-500">
            Add skills you can teach to start getting stronger matches.
          </p>
        )}
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
        style={{ transformOrigin: "left" }}
        className="my-6 h-px bg-[#dcccac]/20"
      />

      {/* Learning */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#546b41]" />
          <p className="text-[1.15rem] font-semibold text-slate-900">Learning</p>
        </div>
        {learnSkills.length ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-wrap gap-2.5"
          >
            {learnSkills.map((skill, i) => (
              <motion.div key={`learn-${skill}`} variants={fadeUp} custom={i}>
                <SkillPill skill={skill} tone="lilac" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-sm text-slate-500">
            Add the skills you want to learn so we can find better swap partners.
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Dashboard Client ─────────────────────────────────────────────────────────
export default function DashboardClient({ dashboard }) {
  const { greeting, user, stats, recentMatches } = dashboard;

  return (
    <main className="min-h-screen bg-transparent px-5 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ── Hero greeting ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mb-10"
        >
          {/* Label */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-4"
          >
            <Sparkles size={12} className="text-indigo-600" />
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-[0.16em]">
              Your dashboard
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-[2rem] sm:text-[2.4rem] font-bold tracking-tight text-slate-900 leading-tight"
          >
            {greeting},{" "}
            <span className="relative inline-block">
              {user.name}
              {/* Animated underline */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
                style={{ transformOrigin: "left" }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-300 rounded-full"
              />
            </span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-3 max-w-xl text-sm text-slate-500 leading-relaxed"
          >
            Here&apos;s a live snapshot of your DevSwap activity and matches we found for you.
            Update your profile to get better matches and swap more skills!
          </motion.p>
        </motion.div>

        {/* ── Stats grid ── */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid gap-4 sm:grid-cols-3 mb-10"
        >
          <StatCard label="Matches found"    value={stats.matchesFound}    index={0} />
          <StatCard label="Pending requests" value={stats.pendingRequests} index={1} />
          <StatCard label="Active swaps"     value={stats.activeSwaps}     index={2} />
        </motion.section>

        {/* ── Skills section ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25, ease }}
          className="mb-10"
        >
          <SectionTitle sub="Manage the skills you offer and the ones you want to learn.">
            Your skills
          </SectionTitle>
          <SkillsSection
            teachSkills={user.teachSkills}
            learnSkills={user.learnSkills}
          />
        </motion.section>

        {/* ── Recent matches ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease }}
        >
          <SectionTitle sub="Students with complementary skills, ranked by compatibility.">
            Recent matches
          </SectionTitle>

          {recentMatches.length ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-4"
            >
              {recentMatches.map((match, i) => (
                <MatchCard key={match.id} match={match} index={i} />
              ))}
            </motion.div>
          ) : (
            <EmptyState
              title="No matches yet"
              description="Complete both your teaching and learning skills, then we'll show compatible swap partners here."
            />
          )}
        </motion.section>

      </div>
    </main>
  );
}