"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  MapPin,
  Plus,
  Search,
  Send,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import {
  createSwapRequest,
  updateDiscoverSkills,
} from "@/src/actions/user/discoveractions";

const ease = [0.22, 1, 0.36, 1];

const SKILL_OPTIONS = [
  "React",
  "React.js",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Python",
  "Django",
  "Java",
  "DSA",
  "Git",
  "UI/UX",
  "Tailwind CSS",
  "Machine Learning",
  "REST APIs",
  "GraphQL",
];

function uniqueSkills(skills) {
  return Array.from(
    new Set(
      skills
        .map((skill) => String(skill ?? "").trim())
        .filter(Boolean),
    ),
  );
}

function Avatar({ profile }) {
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#11201b] text-sm font-bold text-white">
      {profile.image ? (
        <Image
          src={profile.image}
          alt={profile.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      ) : (
        profile.initials
      )}
    </div>
  );
}

function SkillPill({ children, tone = "blue" }) {
  const tones = {
    blue: "border-[#D89216]/25 bg-[#D89216]/10 text-[#11201b]",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    slate: "border-slate-200 bg-slate-50 text-slate-600",
  };

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function SkillPicker({ title, value, onChange, onAdd, skills, tone }) {
  return (
    <div className="rounded-2xl border border-[#D89216]/20 bg-white p-4">
      <p className="text-sm font-semibold text-[#11201b]">{title}</p>
      <div className="mt-3 flex gap-2">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-11 flex-1 rounded-xl border border-[#D89216]/20 bg-[#ffffff] px-3 text-sm text-[#11201b] outline-none transition focus:border-[#11201b]"
        >
          <option value="">Select a skill</option>
          {SKILL_OPTIONS.map((skill) => (
            <option key={`${title}-${skill}`} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Add ${title.toLowerCase()} skill`}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#11201b] text-white transition hover:bg-[#11201b]"
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="mt-3 flex min-h-8 flex-wrap gap-2">
        {skills.length ? (
          skills.map((skill) => (
            <SkillPill key={`${title}-${skill}`} tone={tone}>
              {skill}
            </SkillPill>
          ))
        ) : (
          <span className="text-xs text-slate-400">Add at least one skill.</span>
        )}
      </div>
    </div>
  );
}

function SwapBox({ profile, onRequest, isSubmitting }) {
  const [teachSkill, setTeachSkill] = useState(profile.wantsToLearnFromYou[0] ?? "");
  const [learnSkill, setLearnSkill] = useState(profile.canTeachYou[0] ?? "");
  const [message, setMessage] = useState("");

  const hasReciprocalMatch = profile.wantsToLearnFromYou.length > 0 && profile.canTeachYou.length > 0;
  const canSend =
    hasReciprocalMatch &&
    teachSkill &&
    learnSkill &&
    !profile.requestStatus &&
    !isSubmitting;

  return (
    <div className="mt-5 rounded-2xl border border-[#D89216]/20 bg-[#ffffff] p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#11201b]">
        <ArrowRightLeft size={16} />
        Start a swap
      </div>

      <div className="mt-4 grid gap-3">
        <label className="text-xs font-semibold text-[#11201b]">
          You will teach
          <select
            value={teachSkill}
            onChange={(event) => setTeachSkill(event.target.value)}
            disabled={!hasReciprocalMatch || Boolean(profile.requestStatus)}
            className="mt-2 min-h-11 w-full rounded-xl border border-[#D89216]/20 bg-white px-3 text-sm font-medium text-[#11201b] outline-none transition focus:border-[#11201b]"
          >
            <option value="">Select a skill</option>
            {profile.wantsToLearnFromYou.map((skill) => (
              <option key={`${profile.id}-teach-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs font-semibold text-[#11201b]">
          You want to learn
          <select
            value={learnSkill}
            onChange={(event) => setLearnSkill(event.target.value)}
            disabled={!hasReciprocalMatch || Boolean(profile.requestStatus)}
            className="mt-2 min-h-11 w-full rounded-xl border border-[#D89216]/20 bg-white px-3 text-sm font-medium text-[#11201b] outline-none transition focus:border-[#11201b]"
          >
            <option value="">Select a skill</option>
            {profile.canTeachYou.map((skill) => (
              <option key={`${profile.id}-learn-${skill}`} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </label>

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value.slice(0, 220))}
          disabled={!hasReciprocalMatch || Boolean(profile.requestStatus)}
          rows={3}
          placeholder="Short message"
          className="resize-none rounded-xl border border-[#D89216]/20 bg-white px-3 py-3 text-sm text-[#11201b] outline-none transition placeholder:text-slate-400 focus:border-[#11201b]"
        />
      </div>

      <button
        type="button"
        disabled={!canSend}
        onClick={() =>
          onRequest({
            receiverId: profile.id,
            teachSkillOffered: teachSkill,
            learnSkillRequested: learnSkill,
            message,
          })
        }
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#11201b] px-4 text-sm font-semibold text-white transition hover:bg-[#11201b] disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        <Send size={15} />
        {profile.requestStatus
          ? `Request ${profile.requestStatus}`
          : isSubmitting
            ? "Sending..."
            : "Send swap request"}
      </button>

      {!hasReciprocalMatch ? (
        <p className="mt-3 text-xs leading-5 text-slate-500">
          Swap unlocks only when your teach skill matches what they want, and
          their teach skill matches what you want.
        </p>
      ) : null}
    </div>
  );
}

function MatchCard({ profile, onRequest, isSubmitting }) {
  const hasReciprocalMatch = profile.wantsToLearnFromYou.length > 0 && profile.canTeachYou.length > 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="flex h-full flex-col rounded-3xl border border-[#D89216]/20 bg-white p-5 shadow-[0_10px_30px_rgba(17,32,27,0.06)]"
    >
      <div className="flex items-start gap-3">
        <Avatar profile={profile} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-[#11201b]">{profile.name}</h2>
              <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">
                {profile.headline || "Developer"}
              </p>
            </div>
            {hasReciprocalMatch ? (
              <CheckCircle2 className="shrink-0 text-emerald-500" size={19} />
            ) : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            {profile.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} />
                {profile.location}
              </span>
            ) : null}
            {profile.availability ? (
              <span className="inline-flex items-center gap-1">
                <Clock3 size={13} />
                {profile.availability}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            They can teach you
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.canTeachYou.length ? (
              profile.canTeachYou.map((skill) => (
                <SkillPill key={`${profile.id}-can-${skill}`} tone="green">
                  {skill}
                </SkillPill>
              ))
            ) : (
              <SkillPill tone="slate">No match yet</SkillPill>
            )}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            They want from you
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.wantsToLearnFromYou.length ? (
              profile.wantsToLearnFromYou.map((skill) => (
                <SkillPill key={`${profile.id}-wants-${skill}`}>{skill}</SkillPill>
              ))
            ) : (
              <SkillPill tone="slate">No match yet</SkillPill>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <SwapBox
          profile={profile}
          onRequest={onRequest}
          isSubmitting={isSubmitting}
        />
      </div>
    </motion.article>
  );
}

export default function DiscoverClient({ discover }) {
  const router = useRouter();
  const [teachSkills, setTeachSkills] = useState(discover.currentUser.teachSkills);
  const [learnSkills, setLearnSkills] = useState(discover.currentUser.learnSkills);
  const [teachSelect, setTeachSelect] = useState("");
  const [learnSelect, setLearnSelect] = useState("");
  const [query, setQuery] = useState("");
  const [submittingFor, setSubmittingFor] = useState(null);
  const [savingSkills, setSavingSkills] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filteredProfiles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return discover.profiles.filter((profile) => {
      const hasReciprocalMatch =
        profile.wantsToLearnFromYou.length > 0 && profile.canTeachYou.length > 0;
      const haystack = [
        profile.name,
        profile.headline,
        profile.location,
        ...profile.teachSkills,
        ...profile.learnSkills,
      ]
        .join(" ")
        .toLowerCase();

      return hasReciprocalMatch && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [discover.profiles, query]);

  const allSkills = uniqueSkills([...teachSkills, ...learnSkills]);

  function addSkill(type) {
    const value = type === "teach" ? teachSelect : learnSelect;
    if (!value) return;

    if (type === "teach") {
      setTeachSkills((current) => uniqueSkills([...current, value]));
      setTeachSelect("");
      return;
    }

    setLearnSkills((current) => uniqueSkills([...current, value]));
    setLearnSelect("");
  }

  function saveSkills() {
    setSavingSkills(true);

    startTransition(async () => {
      const result = await updateDiscoverSkills({ teachSkills, learnSkills });

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.error || "Unable to save skills.");
      }

      setSavingSkills(false);
    });
  }

  function handleRequest(payload) {
    setSubmittingFor(payload.receiverId);

    startTransition(async () => {
      const result = await createSwapRequest(payload);

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.error || "Unable to send request.");
      }

      setSubmittingFor(null);
    });
  }

  return (
    <>
      <Toaster position="top-right" />

      <main className="min-h-screen bg-transparent px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="rounded-3xl border border-[#D89216]/20 bg-white p-5 shadow-[0_14px_40px_rgba(17,32,27,0.07)] sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#D89216]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#11201b]">
                  <BookOpen size={14} />
                  Discover
                </div>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#11201b] sm:text-4xl">
                  Find clean skill swaps.
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  A request is enabled only when both sides match: you teach
                  something they want, and they teach something you want.
                </p>
              </div>

              <label className="relative w-full lg:max-w-sm">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8F5E00]"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search people or skills"
                  className="min-h-12 w-full rounded-full border border-[#D89216]/20 bg-[#ffffff] pl-11 pr-4 text-sm text-[#11201b] outline-none transition focus:border-[#11201b]"
                />
              </label>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-[#D89216]/20 bg-[#ffffff] p-4 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
              <SkillPicker
                title="Skills you can teach"
                value={teachSelect}
                onChange={setTeachSelect}
                onAdd={() => addSkill("teach")}
                skills={teachSkills}
                tone="blue"
              />
              <SkillPicker
                title="Skills you want to learn"
                value={learnSelect}
                onChange={setLearnSelect}
                onAdd={() => addSkill("learn")}
                skills={learnSkills}
                tone="green"
              />
              <div className="flex flex-col justify-between rounded-2xl border border-[#D89216]/20 bg-white p-4 lg:min-w-56">
                <div>
                  <p className="text-sm font-semibold text-[#11201b]">Your match pool</p>
                  <p className="mt-2 text-3xl font-bold text-[#11201b]">{filteredProfiles.length}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Based on {allSkills.length} saved skill{allSkills.length === 1 ? "" : "s"}.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={saveSkills}
                  disabled={savingSkills || isPending}
                  className="mt-4 min-h-11 rounded-full bg-[#11201b] px-5 text-sm font-semibold text-white transition hover:bg-[#11201b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingSkills ? "Saving..." : "Save skills"}
                </button>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredProfiles.length ? (
              filteredProfiles.map((profile) => (
                <MatchCard
                  key={profile.id}
                  profile={profile}
                  onRequest={handleRequest}
                  isSubmitting={submittingFor === profile.id && isPending}
                />
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-[#D89216]/30 bg-white px-6 py-14 text-center">
                <p className="text-xl font-semibold text-[#11201b]">No matching swaps yet.</p>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Add skills like React, Next.js, Node.js, MongoDB, Python, or DSA
                  to your teach and learn lists, then save to refresh matching people.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
