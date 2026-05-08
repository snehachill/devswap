export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(26,63,166,0.18),_transparent_32%),radial-gradient(circle_at_100%_20%,_rgba(91,171,240,0.16),_transparent_30%),linear-gradient(180deg,_#F8F9FC_0%,_#5BABF0_52%,_#5BABF0_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-10 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <section className="hidden rounded-4xl border border-white/60 bg-gradient-to-br from-[#1A3FA6] via-[#4A90E8] to-[#5BABF0] p-10 text-white shadow-[0_30px_80px_rgba(26,63,166,0.28)] lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#5BABF0]/90">DevSwap</p>
            <h1 className="mt-6 max-w-md font-serif text-5xl leading-tight">
              Swap skills with people who actually get where you’re headed.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/85">
              Teach what you already know, find a student who can teach you back, and turn free time into real progress.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              "Find students whose teach stack matches your learn stack.",
              "Create your profile once and reuse it for every swap.",
              "Keep your session local in the browser while we build the backend.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur">
                {item}
              </div>
            ))}
          </div>
        </section>
        <section className="flex items-center justify-center">{children}</section>
      </div>
    </div>
  );
}
