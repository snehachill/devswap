import Link from "next/link";
import { ArrowLeftRight, ArrowRight, Check, Sparkles } from "lucide-react";
import { getPublicSiteUrl } from "@/src/lib/siteUrl";

const siteUrl = getPublicSiteUrl();

export const metadata = {
  title: "Trade Skills and Learn With Developers",
  description: "Find developers to exchange skills with. Share what you know, learn something new, and make progress together on DevSwap.",
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DevSwap",
  description: "A peer-to-peer skill exchange platform for developers to teach and learn together.",
  inLanguage: "en",
  ...(siteUrl ? { url: siteUrl } : {}),
};

const steps = [
  { number: "01", title: "Share what you know", text: "Add the skills you can teach and the ones you’re curious to learn." },
  { number: "02", title: "Meet your match", text: "Find someone with complementary skills and a shared appetite to grow." },
  { number: "03", title: "Learn both ways", text: "Trade thoughtful one-on-one sessions and make progress together." },
];

const features = [
  { number: "A", title: "A fair exchange", text: "Both people bring something valuable. Your skills are the currency, and every match works in both directions." },
  { number: "B", title: "Made for real people", text: "Ask questions, share context, and learn with a person who understands the work behind the skill." },
  { number: "C", title: "Room to grow", text: "From your first pull request to a new framework, there’s always something worth learning and teaching." },
];

const skillTags = ["React", "Python", "Product design", "Node.js", "Data science", "DevOps"];

// Shared focus ring so keyboard users get the same polish as hover users
const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D89216] focus-visible:ring-offset-2";

function Eyebrow({ children, light = false }) {
  return <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-[#F2D9A6]" : "text-[#8F5E00]"}`}>{children}</p>;
}

function SwapCard({ name, initial, role, skill, tint }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-[#e6e0d5] bg-[#ffffff] p-4 shadow-[0_14px_36px_rgba(17,32,27,0.07)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D89216]/50 hover:shadow-[0_22px_48px_rgba(17,32,27,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className={`grid h-11 w-11 place-items-center rounded-full font-semibold transition-transform duration-300 group-hover:scale-110 ${tint}`}>{initial}</div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-[#11201b]">{name}</p>
        <p className="text-sm text-[#72766f]">{role} <span className="font-medium text-[#11201b]">{skill}</span></p>
      </div>
      <span className="grid h-7 w-7 place-items-center rounded-full transition-colors duration-300 group-hover:bg-[#11201b]">
        <Check size={17} className="text-[#11201b] transition-colors duration-300 group-hover:text-white" aria-hidden="true" />
      </span>
    </div>
  );
}

export default function Page() {
  return (
    <div data-page="landing" className="overflow-hidden bg-[#ffffff] text-[#11201b]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <section id="top" className="relative isolate flex min-h-[700px] w-full items-center justify-center overflow-hidden bg-[#11201b] px-6 pb-20 pt-32 text-white sm:px-10 lg:px-14 lg:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="hero-orbit absolute left-1/2 top-[48%] aspect-square w-[min(86vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]" />
          <div className="hero-orbit-reverse absolute left-1/2 top-[48%] aspect-square w-[min(68vw,600px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D89216]/[0.20]" />
          <div className="hero-breathe absolute left-1/2 top-[42%] h-[360px] w-[min(88vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(216,146,22,0.12),transparent_68%)]" />
          <span className="hero-drift absolute left-[12%] top-[34%] hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/65 sm:block">React</span>
          <span className="hero-drift-delayed absolute right-[13%] top-[39%] hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/65 sm:block">Product design</span>
          <span className="hero-drift-delayed absolute bottom-[22%] left-[19%] hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/65 sm:block">Python</span>
          <span className="hero-drift absolute bottom-[24%] right-[18%] hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/65 sm:block">DevOps</span>
        </div>
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <Eyebrow light>Skills grow better together</Eyebrow>
          <h1 className="mt-6 max-w-4xl text-5xl leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[76px]">
            Learn something new. <span className="italic text-[#F2D9A6]">Teach what you know.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
            DevSwap brings curious developers together to trade knowledge, build confidence, and make real progress—one conversation at a time.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className={`group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#D89216] px-6 text-sm font-semibold text-[#11201b] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F2D9A6] active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
            >
              Find your first swap
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#how"
              className={`inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
            >
              See how it works
            </Link>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/55">
            <Sparkles size={15} className="text-[#D89216]" />
            Always free. Built around give and take.
          </div>
        </div>

       
      </section>

      <section className="border-y border-[#e5e0d6] bg-[#ffffff] py-7">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-3 px-6 sm:px-10 lg:justify-between lg:px-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#72766f]">Bring a skill. Leave with one.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {skillTags.map((tag) => (
              <span
                key={tag}
                className="cursor-default rounded-full border border-[#e5e0d6] bg-[#ffffff] px-3.5 py-1.5 text-xs font-medium text-[#5f6b61] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#11201b] hover:bg-[#11201b] hover:text-white motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="bg-[#f5f3ee] py-24 text-[#11201b] sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div><Eyebrow>A simple place to begin</Eyebrow><h2 className="mt-5 max-w-md text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl">Good things happen when we share what we know.</h2></div>
            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="group rounded-2xl border border-[#e5e0d6] bg-white p-6 shadow-[0_8px_24px_rgba(17,32,27,0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#D89216]/60 hover:shadow-[0_16px_36px_rgba(17,32,27,0.09)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <p className="font-display text-3xl text-[#8F5E00] transition-transform duration-300 origin-left group-hover:scale-110">{step.number}</p>
                  <h3 className="mt-8 text-xl leading-tight text-[#11201b]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#72766f] transition-colors duration-300 group-hover:text-[#11201b]">{step.text}</p>
                  <span aria-hidden="true" className="mt-5 block h-0.5 w-0 bg-[#D89216] transition-all duration-500 ease-out group-hover:w-full motion-reduce:transition-none" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col justify-between gap-5 border-b border-[#d4ccbd] pb-8 sm:flex-row sm:items-end"><div><Eyebrow>Why DevSwap</Eyebrow><h2 className="mt-4 max-w-xl text-4xl leading-[1.02] tracking-[-0.035em] text-[#11201b] sm:text-5xl">A thoughtful way to get better at your craft.</h2></div><p className="max-w-sm text-base leading-7 text-[#72766f]">A good exchange makes space for both sides to grow. That’s the whole idea.</p></div>
          <div className="grid divide-y divide-[#e5e0d6] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="group relative py-8 transition-colors duration-300 hover:bg-[#fff8f1] sm:px-7 sm:py-10 sm:first:pl-0 sm:last:pr-0"
              >
                <p className="font-display text-2xl text-[#8F5E00] transition-transform duration-300 origin-left group-hover:scale-125">{feature.number}</p>
                <h3 className="mt-7 text-2xl text-[#11201b] transition-colors duration-300 group-hover:text-[#8F5E00]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#72766f]">{feature.text}</p>
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#D89216] transition-all duration-500 ease-out group-hover:w-full motion-reduce:transition-none" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="community" className="px-6 pb-24 sm:px-10 sm:pb-28 lg:px-14">
        {/* Circle removed. A soft border + tint keeps the banner visible against the white page. */}
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-[#e5e0d6] bg-[#fffaf4] px-7 py-14 transition-shadow duration-500 hover:shadow-[0_24px_60px_rgba(17,32,27,0.08)] sm:px-12 sm:py-16 lg:px-16">
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Eyebrow>Your next skill starts here</Eyebrow>
              <h2 className="mt-4 max-w-2xl text-4xl leading-[1.02] tracking-[-0.035em] text-[#11201b] sm:text-5xl">You already have something worth sharing.</h2>
              <p className="mt-4 max-w-xl leading-7 text-[#72766f]">Create a profile, find someone whose goals complement yours, and start learning from each other.</p>
              <Link
                href="/sign-up"
                className={`group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#11201b] px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8F5E00] hover:shadow-[0_14px_30px_rgba(143,94,0,0.35)] active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
              >
                Create your free profile
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div aria-hidden="true" className="relative mx-auto flex min-h-[250px] w-full max-w-[440px] items-center justify-center">
              <div className="absolute h-52 w-52 rounded-full bg-[#D89216]/10 blur-2xl" />
              <div className="absolute left-1/2 top-1/2 h-48 w-72 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] rounded-[34px] border border-[#D89216]/20 bg-white/75" />
              <div className="relative z-10 flex w-full items-center justify-between gap-3 px-1 sm:px-4">
                <div className="w-[43%] rounded-[22px] border border-[#e5e0d6] bg-white p-4 shadow-[0_16px_40px_rgba(17,32,27,0.10)] sm:p-5">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-[#11201b] text-lg font-bold text-white">A</div>
                  <p className="text-sm font-semibold text-[#11201b]">Shares React</p>
                  <p className="mt-1 text-xs text-[#72766f]">Builds your confidence</p>
                </div>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#D89216] text-[#11201b] shadow-[0_8px_20px_rgba(216,146,22,0.3)]">
                  <ArrowLeftRight size={21} strokeWidth={2.2} />
                </div>
                <div className="w-[43%] rounded-[22px] border border-[#e5e0d6] bg-white p-4 shadow-[0_16px_40px_rgba(17,32,27,0.10)] sm:p-5">
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-[#f7ead0] text-lg font-bold text-[#8F5E00]">M</div>
                  <p className="text-sm font-semibold text-[#11201b]">Shares design</p>
                  <p className="mt-1 text-xs text-[#72766f]">Learns React together</p>
                </div>
              </div>
              <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full border border-[#e5e0d6] bg-white px-4 py-2 text-xs font-semibold tracking-wide text-[#11201b] shadow-[0_8px_24px_rgba(17,32,27,0.08)]">A little give. A lot of growth.</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e5e0d6] bg-[#ffffff] py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-[#72766f] sm:px-10 lg:px-14">
          <Link href="/" className={`font-display text-xl font-semibold text-[#11201b] transition-colors duration-300 hover:text-[#8F5E00] ${focusRing}`}>DevSwap</Link>
          <p>Learn together. Grow together.</p>
          <p>© 2026 DevSwap</p>
        </div>
      </footer>
    </div>
  );
}
