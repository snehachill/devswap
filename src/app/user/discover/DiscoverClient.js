"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Sparkles, ArrowRightLeft, Clock3 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { createSwapRequest } from "@/src/actions/user/discoveractions";

const ease = [0.22, 1, 0.36, 1];

function FilterChip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? "border-[#546b41] bg-[#546b41] text-white"
          : "border-[#dcccac]/20 bg-white text-[#546b41] hover:border-[#99ad7a]/30 hover:text-[#99ad7a]"
      }`}
    >
      {children}
    </button>
  );
}

function SkillBadge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "border-[#dcccac]/20 bg-[#fff8ec] text-[#546b41]",
    teach: "border-emerald-200 bg-emerald-50 text-emerald-800",
    learn: "border-violet-200 bg-violet-50 text-violet-800",
    match: "border-amber-200 bg-amber-50 text-amber-800",
  };

  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Avatar({ profile }) {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#546b41] text-base font-bold text-white shadow-sm">
      {profile.image ? (
        <Image
          src={profile.image}
          alt={profile.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      ) : (
        <span>{profile.initials}</span>
      )}
    </div>
  );
}

function MatchCard({ profile, onRequest, isSubmitting }) {
  const [selectedTeachSkill, setSelectedTeachSkill] = useState(
    profile.wantsToLearnFromYou[0] ?? "",
  );
  const [selectedLearnSkill, setSelectedLearnSkill] = useState(
    profile.canTeachYou[0] ?? "",
  );
  const [message, setMessage] = useState("");

  const canSend =
    Boolean(selectedTeachSkill) &&
    Boolean(selectedLearnSkill) &&
    !profile.requestStatus &&
    !isSubmitting;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease }}
      className="rounded-[28px] border border-[#dcccac]/20 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4">
          <Avatar profile={profile} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-[#546b41]">
                {profile.name}
              </h2>
              {profile.requestStatus ? (
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-800">
                  {profile.requestStatus}
                </span>
              ) : null}
            </div>
            {profile.headline ? (
              <p className="mt-1 text-sm text-[#99ad7a]">{profile.headline}</p>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2 text-sm text-[#99ad7a]">
              {profile.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} />
                  {profile.location}
                </span>
              ) : null}
              {profile.availability ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={14} />
                  {profile.availability}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#dcccac]/20 bg-[#dcccac]/10 px-4 py-3 lg:min-w-[180px]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#546b41]">
            Compatibility
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-[#546b41]">
            {profile.compatibilityScore}
          </p>
          <p className="mt-1 text-xs text-[#99ad7a]">
            {profile.complementarySkills.length} shared swap opportunities
          </p>
        </div>
      </div>

      {profile.bio ? (
        <p className="mt-5 text-sm leading-relaxed text-[#546b41]">{profile.bio}</p>
      ) : null}

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl bg-[#fff8ec] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#99ad7a]">
            Can teach you
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.canTeachYou.length ? (
              profile.canTeachYou.map((skill) => (
                <SkillBadge key={`${profile.id}-teach-you-${skill}`} tone="teach">
                  {skill}
                </SkillBadge>
              ))
            ) : (
              <p className="text-sm text-[#99ad7a]">No direct teaching overlap yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-[#fff8ec] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#99ad7a]">
            Wants from you
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.wantsToLearnFromYou.length ? (
              profile.wantsToLearnFromYou.map((skill) => (
                <SkillBadge key={`${profile.id}-learn-from-you-${skill}`} tone="learn">
                  {skill}
                </SkillBadge>
              ))
            ) : (
              <p className="text-sm text-[#99ad7a]">They are not seeking your listed skills yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-[#fff8ec] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#99ad7a]">
            Full profile skills
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.teachSkills.map((skill) => (
              <SkillBadge key={`${profile.id}-teach-${skill}`}>{skill}</SkillBadge>
            ))}
            {profile.learnSkills.map((skill) => (
              <SkillBadge key={`${profile.id}-learn-${skill}`} tone="learn">
                Wants {skill}
              </SkillBadge>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-[#dcccac]/20 bg-[#dcccac]/6 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#546b41]">
          <ArrowRightLeft size={16} />
          Start a swap
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <label className="text-sm text-[#546b41]">
            <span className="mb-2 block font-medium">You will teach</span>
            <select
              value={selectedTeachSkill}
              onChange={(event) => setSelectedTeachSkill(event.target.value)}
              disabled={Boolean(profile.requestStatus) || isSubmitting}
              className="w-full rounded-2xl border border-[#dcccac]/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#546b41]"
            >
              <option value="">Select a skill</option>
              {profile.wantsToLearnFromYou.map((skill) => (
                <option key={`${profile.id}-offer-${skill}`} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-[#546b41]">
            <span className="mb-2 block font-medium">You want to learn</span>
            <select
              value={selectedLearnSkill}
              onChange={(event) => setSelectedLearnSkill(event.target.value)}
              disabled={Boolean(profile.requestStatus) || isSubmitting}
              className="w-full rounded-2xl border border-[#dcccac]/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#546b41]"
            >
              <option value="">Select a skill</option>
              {profile.canTeachYou.map((skill) => (
                <option key={`${profile.id}-request-${skill}`} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block text-sm text-[#546b41]">
          <span className="mb-2 block font-medium">Message</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value.slice(0, 300))}
            disabled={Boolean(profile.requestStatus) || isSubmitting}
            rows={3}
            placeholder="Hi! I'd love to trade skills and work around both our schedules."
            className="w-full rounded-2xl border border-[#dcccac]/20 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#546b41]"
          />
        </label>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#99ad7a]">
            Requests are only enabled when both sides have matching teach/learn skills.
          </p>
          <button
            type="button"
            onClick={() =>
              onRequest({
                receiverId: profile.id,
                teachSkillOffered: selectedTeachSkill,
                learnSkillRequested: selectedLearnSkill,
                message,
              })
            }
            disabled={!canSend}
            className="inline-flex items-center justify-center rounded-full bg-[#546b41] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#99ad7a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {profile.requestStatus
              ? `Request ${profile.requestStatus}`
              : isSubmitting
                ? "Sending..."
                : "Send swap request"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function DiscoverClient({ discover }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeSkill, setActiveSkill] = useState("All");
  const [onlyStrongMatches, setOnlyStrongMatches] = useState(false);
  const [submittingFor, setSubmittingFor] = useState(null);
  const [isPending, startTransition] = useTransition();

  const filteredProfiles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return discover.profiles.filter((profile) => {
      const matchesSkill =
        activeSkill === "All" ||
        profile.canTeachYou.includes(activeSkill) ||
        profile.wantsToLearnFromYou.includes(activeSkill) ||
        profile.teachSkills.includes(activeSkill) ||
        profile.learnSkills.includes(activeSkill);

      const matchesStrength = !onlyStrongMatches || profile.compatibilityScore >= 4;

      const haystack = [
        profile.name,
        profile.headline,
        profile.location,
        profile.bio,
        ...profile.teachSkills,
        ...profile.learnSkills,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || haystack.includes(normalizedQuery);

      return matchesSkill && matchesStrength && matchesQuery;
    });
  }, [activeSkill, discover.profiles, onlyStrongMatches, query]);

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

  const emptyQueryState = query || activeSkill !== "All" || onlyStrongMatches;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            border: "1px solid #dcccac",
            background: "#fff8ec",
            color: "#546b41",
          },
        }}
      />

      <main className="min-h-screen bg-transparent px-5 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="overflow-hidden rounded-[36px] border border-[#dcccac]/20 bg-white"
          >
            <div className="grid gap-6 px-6 py-8 lg:grid-cols-[1.4fr_0.9fr] lg:px-8 lg:py-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#dcccac]/20 bg-[#dcccac]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#546b41]">
                  <Sparkles size={13} />
                  Discover partners
                </div>
                <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#546b41] sm:text-5xl">
                  Find the right people to swap skills with.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#99ad7a]">
                  Explore developers whose teaching skills match what you want to learn,
                  and who want what you already know.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {discover.currentUser.teachSkills.map((skill) => (
                    <SkillBadge key={`mine-teach-${skill}`} tone="teach">
                      You teach {skill}
                    </SkillBadge>
                  ))}
                  {discover.currentUser.learnSkills.map((skill) => (
                    <SkillBadge key={`mine-learn-${skill}`} tone="learn">
                      You learn {skill}
                    </SkillBadge>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 rounded-[28px] bg-gradient-to-br from-[#546b41] to-[#99ad7a] p-5 text-white">
                <div>
                  <p className="text-sm text-white/70">Profiles available</p>
                  <p className="mt-1 text-4xl font-bold">{discover.stats.totalProfiles}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Strong matches</p>
                  <p className="mt-1 text-4xl font-bold">{discover.stats.strongMatches}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Pending requests</p>
                  <p className="mt-1 text-4xl font-bold">{discover.stats.pendingRequests}</p>
                </div>
              </div>
            </div>
          </motion.section>

          <section className="mt-8 rounded-[32px] border border-[#dcccac]/20 bg-white p-5 shadow-sm sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_auto_auto]">
              <label className="relative block">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#99ad7a]"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, skill, location, or headline"
                  className="w-full rounded-full border border-[#dcccac]/20 bg-[#fff8ec] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#546b41]"
                />
              </label>

              <button
                type="button"
                onClick={() => setOnlyStrongMatches((current) => !current)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  onlyStrongMatches
                    ? "bg-[#546b41] text-white"
                    : "border border-[#dcccac]/20 bg-white text-[#546b41]"
                }`}
              >
                Strong matches only
              </button>

              <div className="rounded-full bg-[#fff8ec] px-5 py-3 text-sm font-medium text-[#546b41]">
                {filteredProfiles.length} results
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <FilterChip active={activeSkill === "All"} onClick={() => setActiveSkill("All")}>
                All skills
              </FilterChip>
              {discover.topSkills.map((skill) => (
                <FilterChip
                  key={skill}
                  active={activeSkill === skill}
                  onClick={() => setActiveSkill(skill)}
                >
                  {skill}
                </FilterChip>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-5">
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
              <div className="rounded-[28px] border border-dashed border-[#dcccac]/30 bg-white px-6 py-14 text-center">
                <p className="text-xl font-semibold text-[#546b41]">
                  {emptyQueryState ? "No matches fit these filters." : "No discover results yet."}
                </p>
                <p className="mt-2 text-sm text-[#99ad7a]">
                  {emptyQueryState
                    ? "Try a broader search, clear the skill filter, or turn off strong-match mode."
                    : "Add both teaching and learning skills in your profile to unlock better matches."}
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
