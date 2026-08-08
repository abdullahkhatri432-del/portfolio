import { siteConfig } from "@/constants/site";
import { SOCIAL_LINKS } from "@/data/socials";

export function Hero() {
  return (
    <section id="home" className="section border-b border-slate-200">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-blue-600 mb-2">
            Full Stack Developer
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Hi, I&apos;m {siteConfig.name}
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="mt-6 flex gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
