import { ABOUT_STATS, BIO_PARAGRAPHS } from "@/data/about";

export function About() {
  return (
    <section id="about" className="section border-b border-slate-200">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            {BIO_PARAGRAPHS.map((p, i) => (
              <p key={i} className="text-slate-600 mb-4 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">Quick Stats</h3>
            <dl className="space-y-3">
              {ABOUT_STATS.map((stat) => (
                <div key={stat.label} className="flex justify-between">
                  <dt className="text-sm text-slate-500">{stat.label}</dt>
                  <dd className="text-sm font-semibold text-slate-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
