"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  getProfile,
  updateBasicInfo,
  updateBio,
  updateSkills,
  updateAvatar,
  updateCoverImage,
} from "@/src/actions/user/profileactions";

/* ---------- helpers ---------- */

const initials = (name = "") =>
  name.split(" ").filter(Boolean).map((w) => w[0]).join("").toUpperCase().slice(0, 2);

const normalizeImageUrl = (value = "") => {
  const raw = value.trim();
  if (!raw) return "";
  const extracted = raw.match(/src\s*=\s*["']([^"']+)["']/i)?.[1] ?? raw;
  try {
    const parsed = new URL(extracted);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.toString();
  } catch {}
  return "";
};

const sameList = (a, b) => a.length === b.length && a.every((item, i) => item === b[i]);

const TABS = [
  { id: "basics", label: "Basics" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "photos", label: "Photos" },
];

const inputClass =
  "w-full rounded-xl border-[1.5px] border-[#e7e8e4] bg-white px-4 py-3 text-[17px] text-[#11201b] outline-none transition placeholder:text-[#8F5E00]/60 focus:border-[#11201b] focus:ring-4 focus:ring-[#D89216]/20";

/* ---------- small components ---------- */

function Chip({ children, tone = "teach", onRemove }) {
  const tones = {
    teach: "border-[#D89216]/30 bg-[#D89216]/10 text-[#8F5E00]",
    learn: "border-[#11201b]/20 bg-[#11201b]/5 text-[#11201b]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-base font-semibold ${tones[tone]}`}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${children}`}
          className="-mr-1 flex h-5 w-5 items-center justify-center rounded-full text-lg leading-none transition hover:bg-[#11201b]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89216]"
        >
          ×
        </button>
      )}
    </span>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-base font-semibold text-[#11201b]">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-sm text-[#8F5E00]">{hint}</span>}
    </label>
  );
}

function SaveButton({ loading, disabled, children }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#11201b] px-6 py-3 text-base font-bold text-white shadow-[0_8px_18px_rgba(17,32,27,0.18)] transition hover:-translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D89216]/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0 sm:w-auto"
    >
      {loading ? "Saving…" : children}
    </button>
  );
}

function SkillEditor({ title, placeholder, tone, skills, setSkills }) {
  const [value, setValue] = useState("");

  const add = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (!skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setSkills([...skills, trimmed]);
    }
    setValue("");
  };

  return (
    <div>
      <h3 className="mb-2 text-base font-semibold text-[#11201b]">{title}</h3>
      <div className="flex gap-2">
        <input
          className={inputClass}
          value={value}
          maxLength={30}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button
          type="button"
          onClick={add}
          className="shrink-0 rounded-xl border-[1.5px] border-[#11201b] px-5 text-base font-semibold text-[#11201b] transition hover:bg-[#11201b] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D89216]/30"
        >
          Add
        </button>
      </div>
      <div className="mt-3 flex min-h-[36px] flex-wrap gap-2">
        {skills.length ? (
          skills.map((skill) => (
            <Chip key={skill} tone={tone} onRemove={() => setSkills(skills.filter((s) => s !== skill))}>
              {skill}
            </Chip>
          ))
        ) : (
          <span className="text-base text-[#8F5E00]">Nothing added yet. Type a skill and press Enter.</span>
        )}
      </div>
    </div>
  );
}

function ImagePreview({ src, round, label }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);

  return (
    <div
      className={`flex items-center justify-center overflow-hidden border border-[#e7e8e4] bg-[#e7e8e4]/40 ${
        round ? "h-16 w-16 rounded-full" : "h-16 w-28 rounded-xl"
      }`}
    >
      {src && !broken ? (
        <Image src={src} alt={label} width={112} height={64} unoptimized onError={() => setBroken(true)} className="h-full w-full object-cover" />
      ) : (
        <span className="px-2 text-center text-[13px] text-[#8F5E00]">{src ? "Can't load" : "No image"}</span>
      )}
    </div>
  );
}

/* ---------- page ---------- */

export default function ProfilePage() {
  const reduceMotion = useReducedMotion();
  const editorRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [tab, setTab] = useState("basics");
  const [saving, setSaving] = useState("");

  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [bio, setBio] = useState("");
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [image, setImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [avatarBroken, setAvatarBroken] = useState(false);

  const safeImage = normalizeImageUrl(image);
  const safeCover = normalizeImageUrl(coverImage);

  useEffect(() => setAvatarBroken(false), [safeImage]);

  useEffect(() => {
    (async () => {
      const res = await getProfile();
      if (res.success) {
        const d = res.data;
        setProfile(d);
        setName(d.name ?? "");
        setHeadline(d.headline ?? "");
        setLocation(d.location ?? "");
        setAvailability(d.availability ?? "");
        setBio(d.bio ?? "");
        setTeachSkills(d.teachSkills ?? []);
        setLearnSkills(d.learnSkills ?? []);
        setImage(normalizeImageUrl(d.image || ""));
        setCoverImage(normalizeImageUrl(d.coverImage || ""));
      } else {
        toast.error(res.error || "Could not load your profile");
      }
      setPageLoading(false);
    })();
  }, []);

  /* what has changed since the last save */
  const dirty = {
    basics:
      !!profile &&
      (name !== (profile.name ?? "") ||
        headline !== (profile.headline ?? "") ||
        location !== (profile.location ?? "") ||
        availability !== (profile.availability ?? "")),
    about: !!profile && bio !== (profile.bio ?? ""),
    skills:
      !!profile &&
      (!sameList(teachSkills, profile.teachSkills ?? []) || !sameList(learnSkills, profile.learnSkills ?? [])),
    photos:
      !!profile &&
      (safeImage !== normalizeImageUrl(profile.image || "") ||
        safeCover !== normalizeImageUrl(profile.coverImage || "")),
  };

  const openEditor = (id) => {
    setTab(id);
    editorRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  /* generic save wrapper */
  async function save(key, task, onSuccess) {
    setSaving(key);
    try {
      const res = await task();
      if (res.success) {
        onSuccess();
        toast.success(res.message || "Saved");
      } else {
        toast.error(res.error || "Could not save. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setSaving("");
  }

  const handleBasics = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("headline", headline);
    fd.append("location", location);
    fd.append("availability", availability);
    save("basics", () => updateBasicInfo(fd), () =>
      setProfile((p) => ({ ...p, name, headline, location, availability }))
    );
  };

  const handleBio = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("bio", bio);
    save("about", () => updateBio(fd), () => setProfile((p) => ({ ...p, bio })));
  };

  const handleSkills = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("teachSkills", teachSkills.join(","));
    fd.append("learnSkills", learnSkills.join(","));
    save("skills", () => updateSkills(fd), () => setProfile((p) => ({ ...p, teachSkills, learnSkills })));
  };

  const handlePhotos = (e) => {
    e.preventDefault();
    const avatarChanged = safeImage !== normalizeImageUrl(profile?.image || "");
    const coverChanged = safeCover !== normalizeImageUrl(profile?.coverImage || "");

    save(
      "photos",
      async () => {
        const results = [];
        if (avatarChanged) {
          const fd = new FormData();
          fd.append("image", safeImage);
          results.push(await updateAvatar(fd));
        }
        if (coverChanged) {
          const fd = new FormData();
          fd.append("coverImage", safeCover);
          results.push(await updateCoverImage(fd));
        }
        const failed = results.find((r) => !r.success);
        return failed || { success: true, message: "Photos updated" };
      },
      () => {
        setImage(safeImage);
        setCoverImage(safeCover);
        setProfile((p) => ({ ...p, image: safeImage || null, coverImage: safeCover || null }));
      }
    );
  };

  if (pageLoading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-white pt-12" role="status" aria-label="Loading profile">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#e7e8e4] border-t-[#D89216]" />
      </div>
    );
  }

  const displayName = profile?.name || "Your name";
  const hasSkills = teachSkills.length || learnSkills.length;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { color: "#11201b", border: "1px solid #e7e8e4", fontFamily: "var(--font-text), sans-serif" },
          success: { iconTheme: { primary: "#D89216", secondary: "#fff" } },
        }}
      />

      <div className="min-h-[90vh] bg-white px-4 pb-16 pt-24 md:px-10" style={{ fontFamily: "var(--font-text), sans-serif" }}>
        <motion.div
          className="mx-auto max-w-[980px]"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ===== Profile card ===== */}
          <section className="overflow-hidden rounded-[28px] border border-[#e7e8e4] bg-white shadow-[0_10px_45px_rgba(17,32,27,0.10)]">
            <div
              className="relative h-[150px] md:h-[200px] bg-[radial-gradient(circle_at_20%_30%,rgba(216,146,22,0.3),transparent_26%),radial-gradient(circle_at_74%_45%,rgba(216,146,22,0.2),transparent_24%),linear-gradient(115deg,#11201b_0%,#1d342a_55%,#11201b_100%)]"
              style={
                safeCover
                  ? {
                      backgroundImage: `linear-gradient(rgba(17,32,27,0.12), rgba(17,32,27,0.12)), url(${safeCover})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <button
                type="button"
                onClick={() => openEditor("photos")}
                className="absolute right-4 top-4 rounded-full border border-white/30 bg-[#11201b]/75 px-4 py-2 text-base font-semibold text-white backdrop-blur transition hover:bg-[#11201b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D89216]/50"
              >
                Change cover
              </button>
            </div>

            <div className="px-5 pb-8 md:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
                  <button
                    type="button"
                    onClick={() => openEditor("photos")}
                    aria-label="Change profile photo"
                    className="relative z-10 -mt-12 flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-[#e7e8e4] shadow-[0_10px_26px_rgba(17,32,27,0.16)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D89216]/50 md:-mt-16 md:h-32 md:w-32"
                  >
                    {safeImage && !avatarBroken ? (
                      <Image src={safeImage} alt={`${displayName}'s photo`} width={128} height={128} unoptimized onError={() => setAvatarBroken(true)} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-[#11201b] md:text-4xl" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                        {initials(profile?.name) || "?"}
                      </span>
                    )}
                  </button>

                  <div className="min-w-0 sm:pt-4">
                    <h1 className="break-words text-4xl font-bold tracking-[-0.02em] text-[#11201b] md:text-[3.25rem] md:leading-tight" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
                      {displayName}
                    </h1>
                    <p className="mt-1 text-xl text-[#8F5E00]">{profile?.headline || "Add a headline"}</p>
                    <p className="mt-0.5 text-lg text-[#11201b]/80">{profile?.location || "Add your location"}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openEditor("basics")}
                  className="self-start rounded-full bg-[#11201b] px-6 py-3 text-base font-bold text-white shadow-[0_8px_18px_rgba(17,32,27,0.18)] transition hover:-translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D89216]/40 sm:mt-4"
                >
                  Edit profile
                </button>
              </div>

              {/* About + availability */}
              <div className="mt-8 grid gap-6 border-t border-[#e7e8e4] pt-6 md:grid-cols-[1.6fr_1fr]">
                <div>
                  <h2 className="text-lg font-bold text-[#11201b]" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>About</h2>
                  <p className="mt-2 max-w-[68ch] whitespace-pre-line text-[17px] leading-relaxed text-[#11201b]/80">
                    {profile?.bio || "Tell people what you build, teach and want to learn."}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#11201b]" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>Availability</h2>
                  <p className="mt-2 text-[17px] leading-relaxed text-[#11201b]/80">
                    {profile?.availability || "Share when you are free so others can plan with you."}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-6 grid gap-5 border-t border-[#e7e8e4] pt-6 sm:grid-cols-2">
                <div>
                  <h2 className="mb-3 text-base font-semibold text-[#11201b]">Can teach</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile?.teachSkills?.length ? (
                      profile.teachSkills.map((s) => <Chip key={s} tone="teach">{s}</Chip>)
                    ) : (
                      <span className="text-base text-[#8F5E00]">No skills added yet</span>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="mb-3 text-base font-semibold text-[#11201b]">Wants to learn</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile?.learnSkills?.length ? (
                      profile.learnSkills.map((s) => <Chip key={s} tone="learn">{s}</Chip>)
                    ) : (
                      <span className="text-base text-[#8F5E00]">No skills added yet</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== Editor ===== */}
          <section
            ref={editorRef}
            className="mt-8 scroll-mt-24 rounded-[28px] border border-[#e7e8e4] bg-white p-5 shadow-[0_4px_20px_rgba(17,32,27,0.08)] md:p-8"
          >
            <h2 className="text-2xl font-bold text-[#11201b]" style={{ fontFamily: "var(--font-display), Georgia, serif" }}>
              Edit your profile
            </h2>

            <div role="tablist" aria-label="Profile sections" className="mt-5 flex gap-1 overflow-x-auto rounded-full bg-[#e7e8e4]/50 p-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  id={`tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={`relative flex-1 whitespace-nowrap rounded-full px-4 py-2 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89216] ${
                    tab === t.id ? "bg-[#11201b] text-white shadow-sm" : "text-[#11201b] hover:bg-white"
                  }`}
                >
                  {t.label}
                  {dirty[t.id] && (
                    <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-[#D89216]" aria-label="Unsaved changes" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
              {tab === "basics" && (
                <form onSubmit={handleBasics} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Full name">
                      <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" autoComplete="name" />
                    </Field>
                    <Field label="Location">
                      <input className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, Country" autoComplete="address-level2" />
                    </Field>
                  </div>
                  <Field label="Headline" hint="A short line about what you do, like “Frontend developer”.">
                    <input className={inputClass} value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Frontend developer" />
                  </Field>
                  <Field label="Availability" hint="For example, “Weekday evenings” or “Weekends”.">
                    <input className={inputClass} value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="Weekday evenings" />
                  </Field>
                  <SaveButton loading={saving === "basics"} disabled={!dirty.basics}>Save changes</SaveButton>
                </form>
              )}

              {tab === "about" && (
                <form onSubmit={handleBio}>
                  <Field label="About you">
                    <textarea
                      className={`${inputClass} min-h-[160px] resize-y leading-relaxed`}
                      placeholder="Tell the community about yourself…"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      maxLength={600}
                    />
                  </Field>
                  <div className="mt-1 text-right text-sm text-[#8F5E00]">{bio.length}/600</div>
                  <SaveButton loading={saving === "about"} disabled={!dirty.about}>Save bio</SaveButton>
                </form>
              )}

              {tab === "skills" && (
                <form onSubmit={handleSkills} className="space-y-8">
                  <SkillEditor title="Skills you can teach" placeholder="e.g. React, Guitar, Excel" tone="teach" skills={teachSkills} setSkills={setTeachSkills} />
                  <SkillEditor title="Skills you want to learn" placeholder="e.g. Spanish, Photography" tone="learn" skills={learnSkills} setSkills={setLearnSkills} />
                  <SaveButton loading={saving === "skills"} disabled={!dirty.skills}>Save skills</SaveButton>
                </form>
              )}

              {tab === "photos" && (
                <form onSubmit={handlePhotos} className="space-y-6">
                  <div className="flex items-start gap-4">
                    <ImagePreview src={safeImage} round label="Profile photo preview" />
                    <div className="flex-1">
                      <Field label="Profile photo" hint="Paste a link to an image (https://…).">
                        <input className={inputClass} type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/photo.jpg" maxLength={2048} />
                      </Field>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <ImagePreview src={safeCover} label="Cover photo preview" />
                    <div className="flex-1">
                      <Field label="Cover photo" hint="A wide image works best.">
                        <input className={inputClass} type="url" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} placeholder="https://example.com/cover.jpg" maxLength={2048} />
                      </Field>
                    </div>
                  </div>
                  <SaveButton loading={saving === "photos"} disabled={!dirty.photos}>Save photos</SaveButton>
                </form>
              )}
            </div>
          </section>
        </motion.div>
      </div>
    </>
  );
}
