import Link from "next/link";
import { ArrowLeftRight, ArrowRight, Check, Sparkles } from "lucide-react";

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
      <section id="top" className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-6 pb-20 pt-32 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute -left-52 top-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(216,146,22,0.15),transparent_70%)]" />
        <div className="relative z-10">
          <Eyebrow>Skills grow better together</Eyebrow>
          <h1 className="mt-6 max-w-2xl text-5xl leading-[0.98] tracking-[-0.045em] text-[#11201b] sm:text-6xl lg:text-[76px]">
            Learn something new. <span className="italic text-[#8F5E00]">Teach what you know.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#72766f]">
            DevSwap brings curious developers together to trade knowledge, build confidence, and make real progress—one conversation at a time.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/sign-up"
              className={`group inline-flex min-h-12 items-center gap-3 rounded-full bg-[#11201b] px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8F5E00] hover:shadow-[0_14px_30px_rgba(143,94,0,0.35)] active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
            >
              Find your first swap
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#how"
              className={`inline-flex min-h-12 items-center rounded-full border border-[#d4ccbd] px-6 text-sm font-semibold text-[#11201b] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#11201b] hover:bg-[#11201b] hover:text-white active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
            >
              See how it works
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm text-[#72766f]">
            <Sparkles size={15} className="text-[#8F5E00]" />
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

      <section id="how" className="bg-[#11201b] py-24 text-[#ffffff] sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div><Eyebrow light>A simple place to begin</Eyebrow><h2 className="mt-5 max-w-md text-4xl leading-[1.02] tracking-[-0.035em] sm:text-5xl">Good things happen when we share what we know.</h2></div>
            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#D89216]/60 hover:bg-white/[0.08] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <p className="font-display text-3xl text-[#F2D9A6] transition-transform duration-300 origin-left group-hover:scale-110">{step.number}</p>
                  <h3 className="mt-8 text-xl leading-tight text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#c3cbc1] transition-colors duration-300 group-hover:text-white">{step.text}</p>
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
          <div className="relative grid items-center gap-9 lg:grid-cols-[1fr_auto]">
            <div><Eyebrow>Your next skill starts here</Eyebrow><h2 className="mt-4 max-w-2xl text-4xl leading-[1.02] tracking-[-0.035em] text-[#11201b] sm:text-5xl">You already have something worth sharing.</h2><p className="mt-4 max-w-xl leading-7 text-[#72766f]">Create a profile, find someone whose goals complement yours, and start learning from each other.</p></div>
            <Link
              href="/sign-up"
              className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#11201b] px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8F5E00] hover:shadow-[0_14px_30px_rgba(143,94,0,0.35)] active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
            >
              Create your free profile
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
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
