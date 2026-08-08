import { SKILL_GROUPS } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="section border-b border-slate-200 bg-slate-50">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">
          Technologies and tools I work with.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="card">
              <h3 className="font-semibold text-slate-900 mb-3">
                {group.category}
              </h3>
              <p className="text-sm text-slate-500 mb-3">{group.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span key={skill.name} className="badge">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
