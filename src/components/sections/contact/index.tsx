"use client";

import { siteConfig } from "@/constants/site";
import { SOCIAL_LINKS } from "@/data/socials";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">
          Have a project in mind? Let&apos;s talk.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">Contact Info</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-slate-500">Email</dt>
                <dd className="text-slate-900">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-blue-600"
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Phone</dt>
                <dd className="text-slate-900">{siteConfig.contact.phone}</dd>
              </div>
            </dl>

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

          <div className="card">
            <h3 className="font-semibold text-slate-900 mb-4">Send a Message</h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const subject = encodeURIComponent("Portfolio Inquiry");
                const body = encodeURIComponent(
                  `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
                );
                window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
              }}
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
