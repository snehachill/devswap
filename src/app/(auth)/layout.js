export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-10 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <section className="relative hidden overflow-hidden rounded-[32px] border border-[#11201b]/10 bg-gradient-to-br from-[#11201b] via-[#173027] to-[#11201b] p-10 text-white shadow-[0_24px_60px_rgba(17,32,27,0.16)] lg:flex lg:flex-col lg:justify-between">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D89216]/15 blur-3xl" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#F2D9A6]">DevSwap</p>
            <h1 className="mt-6 max-w-md font-display text-5xl leading-tight">
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
              "Keep your swap plans and conversations in one place.",
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
