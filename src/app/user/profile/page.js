"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  getProfile,
  updateBasicInfo,
  updateBio,
  updateSkills,
  updateAvatar,
  updateCoverImage,
} from "@/src/actions/user/profileactions";

const initials = (name = "") =>
  name.split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);

const normalizeImageUrl = (value = "") => {
  const raw = value.trim();
  if (!raw) return "";
  const extracted = raw.match(/src\s*=\s*["']([^"']+)["']/i)?.[1] ?? raw;

  try {
    const parsed = new URL(extracted);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {}

  return "";
};

function Chip({ children, tone = "default" }) {
  const tones = {
    default: "bg-[#f6ede2] border-[#ead8c1] text-[#6b4226]",
    teach: "bg-[#fcf1dc] border-[#e2c58c] text-[#7a4b12]",
    learn: "bg-[#f0e9fb] border-[#d4c3ea] text-[#5f447f]",
  };

  return <span className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-semibold ${tones[tone]}`}>{children}</span>;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [bio, setBio] = useState("");
  const [teachSkills, setTeachSkills] = useState([]);
  const [learnSkills, setLearnSkills] = useState([]);
  const [image, setImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");
  const [basicLoading, setBasicLoading] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);
  const avatarInputRef = useRef(null);

  const safeImage = normalizeImageUrl(image);
  const safeCoverImage = normalizeImageUrl(coverImage);
  const featuredSkills = [...teachSkills.slice(0, 4), ...learnSkills.slice(0, 2)].slice(0, 6);

  useEffect(() => {
    (async () => {
      const res = await getProfile();
      if (res.success) {
        const data = res.data;
        setProfile(data);
        setName(data.name);
        setHeadline(data.headline);
        setLocation(data.location);
        setAvailability(data.availability);
        setBio(data.bio);
        setTeachSkills(data.teachSkills);
        setLearnSkills(data.learnSkills);
        setImage(normalizeImageUrl(data.image || ""));
        setCoverImage(normalizeImageUrl(data.coverImage || ""));
      } else {
        toast.error(res.error || "Could not load profile");
      }
      setPageLoading(false);
    })();
  }, []);

  async function handleBasicSubmit(event) {
    event.preventDefault();
    setBasicLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("headline", headline);
    formData.append("location", location);
    formData.append("availability", availability);
    const res = await updateBasicInfo(formData);
    if (res.success) {
      setProfile((current) => ({ ...current, name, headline, location, availability }));
      toast.success(res.message);
    } else {
      toast.error(res.error);
    }
    setBasicLoading(false);
  }

  async function handleBioSubmit(event) {
    event.preventDefault();
    setBioLoading(true);
    const formData = new FormData();
    formData.append("bio", bio);
    const res = await updateBio(formData);
    if (res.success) {
      setProfile((current) => ({ ...current, bio }));
      toast.success(res.message);
    } else {
      toast.error(res.error);
    }
    setBioLoading(false);
  }

  async function handleSkillsSubmit(event) {
    event.preventDefault();
    setSkillsLoading(true);
    const formData = new FormData();
    formData.append("teachSkills", teachSkills.join(","));
    formData.append("learnSkills", learnSkills.join(","));
    const res = await updateSkills(formData);
    if (res.success) {
      setProfile((current) => ({ ...current, teachSkills, learnSkills }));
      toast.success(res.message);
    } else {
      toast.error(res.error);
    }
    setSkillsLoading(false);
  }

  async function handleAvatarSubmit(event) {
    event.preventDefault();
    setAvatarLoading(true);
    const sanitizedImage = normalizeImageUrl(image);
    const formData = new FormData();
    formData.append("image", sanitizedImage);
    const res = await updateAvatar(formData);
    if (res.success) {
      setImage(sanitizedImage);
      setProfile((current) => ({ ...current, image: sanitizedImage || null }));
      toast.success(res.message);
    } else {
      toast.error(res.error);
    }
    setAvatarLoading(false);
  }

  async function handleCoverSubmit(event) {
    event.preventDefault();
    setCoverLoading(true);
    const sanitizedImage = normalizeImageUrl(coverImage);
    const formData = new FormData();
    formData.append("coverImage", sanitizedImage);
    const res = await updateCoverImage(formData);
    if (res.success) {
      setCoverImage(sanitizedImage);
      setProfile((current) => ({ ...current, coverImage: sanitizedImage || null }));
      toast.success(res.message);
    } else {
      toast.error(res.error);
    }
    setCoverLoading(false);
  }

  function addSkill(type, value) {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (type === "teach") {
      if (!teachSkills.includes(trimmed)) setTeachSkills((current) => [...current, trimmed]);
      setTeachInput("");
      return;
    }
    if (!learnSkills.includes(trimmed)) setLearnSkills((current) => [...current, trimmed]);
    setLearnInput("");
  }

  if (pageLoading) {
    return <div className="min-h-[80vh] bg-[#f7f0e6] pt-12" />;
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="relative min-h-[90vh] overflow-hidden bg-[#f7f0e6] bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(200,169,126,0.18)_0%,transparent_60%),radial-gradient(ellipse_60%_50%_at_80%_90%,rgba(122,79,45,0.10)_0%,transparent_55%)] px-5 pb-5 pt-24 md:px-10 md:pb-10 md:pt-24" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <motion.div className="relative z-10 mx-auto max-w-[1200px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <motion.section
            className="mb-8 overflow-hidden rounded-[28px] border border-[#ddd0b8] bg-white shadow-[0_10px_45px_rgba(60,35,10,0.14)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative h-[170px] md:h-[220px] bg-[radial-gradient(circle_at_20%_30%,rgba(244,193,101,0.95),transparent_26%),radial-gradient(circle_at_62%_0%,rgba(86,144,185,0.65),transparent_26%),radial-gradient(circle_at_74%_45%,rgba(230,138,82,0.8),transparent_24%),radial-gradient(circle_at_96%_12%,rgba(139,215,182,0.8),transparent_20%),linear-gradient(115deg,#eba93c_0%,#f0cf76_30%,#eda241_48%,#86a4bb_72%,#bfe5d8_100%)]"
              style={
                safeCoverImage
                  ? {
                      backgroundImage: `linear-gradient(rgba(59,42,26,0.12), rgba(59,42,26,0.12)), url(${safeCoverImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <button type="button" onClick={() => avatarInputRef.current?.focus()} className="absolute right-4 top-4 inline-flex rounded-full border border-white/70 bg-[rgba(255,248,240,0.8)] px-3 py-2 text-sm font-semibold text-[#4B2E2B] shadow-[0_8px_18px_rgba(75,46,43,0.12)] transition-all duration-200 hover:scale-105">
                Edit
              </button>
            </div>

            <div className="px-5 pb-6 md:px-8 md:pb-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                  <motion.div className="relative -mt-14 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-[#f2e9db] shadow-[0_10px_26px_rgba(60,35,10,0.16)] md:h-32 md:w-32" whileHover={{ scale: 1.03 }} onClick={() => avatarInputRef.current?.focus()}>
                    {safeImage ? (
                      <Image src={safeImage} alt="avatar" className="h-full w-full object-cover" width={128} height={128} />
                    ) : (
                      <span className="text-2xl font-bold text-[#6b4226]" style={{ fontFamily: "'Libre Baskerville', serif" }}>{initials(profile?.name)}</span>
                    )}
                  </motion.div>

                  <div>
                    <h1 className="text-3xl font-bold tracking-[-0.02em] text-[#3b2a1a] md:text-[2.5rem]" style={{ fontFamily: "'Libre Baskerville', serif" }}>{profile?.name}</h1>
                    <p className="mt-1 text-lg text-[#7a6550]">{profile?.headline || "Add your professional headline"}</p>
                    <p className="mt-1 text-base text-[#8b5e3c]">{profile?.location || "Add your location"}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button type="button" className="rounded-full bg-[#3b2a1a] px-5 py-2.5 text-sm font-semibold text-[#fdf6ec] shadow-[0_8px_18px_rgba(59,42,26,0.18)] transition-all duration-200 hover:-translate-y-px">Edit Profile</button>
                      <button type="button" className="rounded-full border border-[#8b5e3c] bg-white px-5 py-2.5 text-sm font-semibold text-[#6b4226] transition-all duration-200 hover:-translate-y-px hover:bg-[#fbf4ea]">Settings</button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:min-w-[310px] lg:max-w-[360px]">
                  <div className="self-start rounded-full border border-[#e4d5bd] bg-[#f7efe4] px-4 py-2 text-sm text-[#7a6550] lg:self-end">
                    <span className="font-semibold text-[#8b5e3c]">Current role</span>
                    <span className="mx-2 text-[#c8a97e]">|</span>
                    <span className="font-semibold text-[#4B2E2B]">{profile?.headline || "Software Engineer"}</span>
                  </div>
                  <div className="rounded-[22px] border border-[#e6dac7] bg-[#fffaf4] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-semibold uppercase tracking-[0.05em] text-[#8b5e3c]">Skills</span>
                      <span className="text-sm font-semibold text-[#c9973a]">Featured</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {featuredSkills.length ? featuredSkills.map((skill, index) => <Chip key={skill} tone={index < 4 ? "teach" : "learn"}>{skill}</Chip>) : <span className="text-sm text-[#b08e68]">Add your top skills here</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  { title: "Ready for work", text: profile?.availability || "Share when you are available so other members can plan with you." },
                  { title: "Share your story", text: profile?.bio || "Use your bio to tell people what you build, teach, and want to learn." },
                  { title: "Update", text: `Teaching ${teachSkills.length} skills and learning ${learnSkills.length} right now.` },
                ].map((item) => (
                  <div key={item.title} className="rounded-[20px] border border-[#ece2d2] bg-[#f8f3ea] px-4 py-4 shadow-[0_4px_16px_rgba(60,35,10,0.05)]">
                    <h3 className="text-base font-bold text-[#4B2E2B]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#7a6550]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.55fr]">
            <div className="flex flex-col gap-6">
              <section className="rounded-xl border border-[#ddd0b8] bg-white p-6 shadow-[0_4px_20px_rgba(60,35,10,0.10)]">
                <h2 className="mb-4 border-b border-[#ddd0b8] pb-3 text-base font-bold text-[#3b2a1a]" style={{ fontFamily: "'Libre Baskerville', serif" }}>Cover Photo</h2>
                <form onSubmit={handleCoverSubmit}>
                  <input className="w-full rounded-lg border-[1.5px] border-[#ddd0b8] bg-[#f2e9db] px-3 py-2.5 text-sm text-[#2e1e0f] outline-none transition-all duration-180 placeholder:text-[#c8a97e] focus:border-[#8b5e3c] focus:bg-white" type="url" placeholder="https://example.com/cover.jpg" value={coverImage} onChange={(event) => setCoverImage(event.target.value)} maxLength={2048} />
                  <motion.button type="submit" className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#3b2a1a] to-[#8b5e3c] px-3 py-2 text-sm font-bold text-[#fdf6ec]" disabled={coverLoading}>{coverLoading ? "Saving..." : "Update Cover Photo"}</motion.button>
                </form>
              </section>

              <section className="rounded-xl border border-[#ddd0b8] bg-white p-6 shadow-[0_4px_20px_rgba(60,35,10,0.10)]">
                <h2 className="mb-4 border-b border-[#ddd0b8] pb-3 text-base font-bold text-[#3b2a1a]" style={{ fontFamily: "'Libre Baskerville', serif" }}>Profile Photo</h2>
                <form onSubmit={handleAvatarSubmit}>
                  <input ref={avatarInputRef} className="w-full rounded-lg border-[1.5px] border-[#ddd0b8] bg-[#f2e9db] px-3 py-2.5 text-sm text-[#2e1e0f] outline-none transition-all duration-180 placeholder:text-[#c8a97e] focus:border-[#8b5e3c] focus:bg-white" type="url" placeholder="https://example.com/photo.jpg" value={image} onChange={(event) => setImage(event.target.value)} maxLength={2048} />
                  <motion.button type="submit" className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#3b2a1a] to-[#8b5e3c] px-3 py-2 text-sm font-bold text-[#fdf6ec]" disabled={avatarLoading}>{avatarLoading ? "Saving..." : "Update Photo"}</motion.button>
                </form>
              </section>

              <section className="rounded-xl border border-[#ddd0b8] bg-white p-6 shadow-[0_4px_20px_rgba(60,35,10,0.10)]">
                <h2 className="mb-4 border-b border-[#ddd0b8] pb-3 text-base font-bold text-[#3b2a1a]" style={{ fontFamily: "'Libre Baskerville', serif" }}>About Me</h2>
                <form onSubmit={handleBioSubmit}>
                  <textarea className="min-h-[120px] w-full resize-y rounded-lg border-[1.5px] border-[#ddd0b8] bg-[#f2e9db] px-3 py-3 text-sm text-[#2e1e0f] outline-none transition-all duration-180 placeholder:text-[#c8a97e] focus:border-[#8b5e3c] focus:bg-white" placeholder="Tell the community about yourself..." value={bio} onChange={(event) => setBio(event.target.value)} maxLength={600} rows={6} />
                  <div className="mt-1 text-right text-xs text-[#7a6550]">{bio.length}/600</div>
                  <motion.button type="submit" className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#3b2a1a] to-[#8b5e3c] px-3 py-2 text-sm font-bold text-[#fdf6ec]" disabled={bioLoading}>{bioLoading ? "Saving..." : "Save Bio"}</motion.button>
                </form>
              </section>
            </div>

            <div className="flex flex-col gap-6">
              <section className="rounded-xl border border-[#ddd0b8] bg-white p-6 shadow-[0_4px_20px_rgba(60,35,10,0.10)]">
                <h2 className="mb-4 border-b border-[#ddd0b8] pb-3 text-base font-bold text-[#3b2a1a]" style={{ fontFamily: "'Libre Baskerville', serif" }}>Basic Information</h2>
                <form onSubmit={handleBasicSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input className="w-full rounded-lg border-[1.5px] border-[#ddd0b8] bg-[#f2e9db] px-3 py-2.5 text-sm text-[#2e1e0f] outline-none transition-all duration-180 placeholder:text-[#c8a97e] focus:border-[#8b5e3c] focus:bg-white" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your full name" />
                    <input className="w-full rounded-lg border-[1.5px] border-[#ddd0b8] bg-[#f2e9db] px-3 py-2.5 text-sm text-[#2e1e0f] outline-none transition-all duration-180 placeholder:text-[#c8a97e] focus:border-[#8b5e3c] focus:bg-white" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="City, Country" />
                  </div>
                  <input className="mt-4 w-full rounded-lg border-[1.5px] border-[#ddd0b8] bg-[#f2e9db] px-3 py-2.5 text-sm text-[#2e1e0f] outline-none transition-all duration-180 placeholder:text-[#c8a97e] focus:border-[#8b5e3c] focus:bg-white" value={headline} onChange={(event) => setHeadline(event.target.value)} placeholder="Professional headline" />
                  <input className="mt-4 w-full rounded-lg border-[1.5px] border-[#ddd0b8] bg-[#f2e9db] px-3 py-2.5 text-sm text-[#2e1e0f] outline-none transition-all duration-180 placeholder:text-[#c8a97e] focus:border-[#8b5e3c] focus:bg-white" value={availability} onChange={(event) => setAvailability(event.target.value)} placeholder="Availability" />
                  <motion.button type="submit" className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#3b2a1a] to-[#8b5e3c] px-3 py-2 text-sm font-bold text-[#fdf6ec]" disabled={basicLoading}>{basicLoading ? "Saving..." : "Save Changes"}</motion.button>
                </form>
              </section>

              <section className="rounded-xl border border-[#ddd0b8] bg-white p-6 shadow-[0_4px_20px_rgba(60,35,10,0.10)]">
                <h2 className="mb-4 border-b border-[#ddd0b8] pb-3 text-base font-bold text-[#3b2a1a]" style={{ fontFamily: "'Libre Baskerville', serif" }}>Skills Exchange</h2>
                <form onSubmit={handleSkillsSubmit}>
                  <div>
                    <div className="flex gap-2">
                      <input className="flex-1 rounded-lg border-[1.5px] border-[#ddd0b8] bg-[#f2e9db] px-3 py-2.5 text-sm text-[#2e1e0f] outline-none transition-all duration-180 placeholder:text-[#c8a97e] focus:border-[#8b5e3c] focus:bg-white" value={teachInput} onChange={(event) => setTeachInput(event.target.value)} placeholder="Add a skill you can teach" />
                      <button type="button" className="rounded-lg border-[1.5px] border-[#8b5e3c] px-3 text-sm font-semibold text-[#8b5e3c]" onClick={() => addSkill("teach", teachInput)}>+ Add</button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">{teachSkills.map((skill) => <Chip key={skill} tone="teach">{skill}</Chip>)}</div>
                  </div>
                  <div className="my-5 h-px bg-[#ddd0b8]" />
                  <div>
                    <div className="flex gap-2">
                      <input className="flex-1 rounded-lg border-[1.5px] border-[#ddd0b8] bg-[#f2e9db] px-3 py-2.5 text-sm text-[#2e1e0f] outline-none transition-all duration-180 placeholder:text-[#c8a97e] focus:border-[#8b5e3c] focus:bg-white" value={learnInput} onChange={(event) => setLearnInput(event.target.value)} placeholder="Add a skill you want to learn" />
                      <button type="button" className="rounded-lg border-[1.5px] border-[#9b7fd4] px-3 text-sm font-semibold text-[#6b4fa8]" onClick={() => addSkill("learn", learnInput)}>+ Add</button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">{learnSkills.map((skill) => <Chip key={skill} tone="learn">{skill}</Chip>)}</div>
                  </div>
                  <motion.button type="submit" className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#3b2a1a] to-[#8b5e3c] px-3 py-2 text-sm font-bold text-[#fdf6ec]" disabled={skillsLoading}>{skillsLoading ? "Saving..." : "Save Skills"}</motion.button>
                </form>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
