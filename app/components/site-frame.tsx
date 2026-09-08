/* eslint-disable @next/next/no-html-link-for-pages -- Static pages use full document navigation. */
import type { ReactNode } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research/" },
  { label: "Experience", href: "/experience/" },
];

export function SiteFrame({
  current,
  children,
}: {
  current: "Home" | "Research" | "Experience";
  children: ReactNode;
}) {
  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <aside className="identity-panel" aria-label="Profile">
        <div className="identity-inner">
          <a className="monogram" href="/" aria-label="Zijian Shen home">
            ZS
          </a>
          <figure className="portrait-frame">
            {/* A static image keeps the portrait portable across both hosting providers. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/zijian-shen-portrait.jpg"
              width="720"
              height="960"
              alt="Portrait of Zijian Shen"
              fetchPriority="high"
            />
          </figure>
          <div className="identity-copy">
            <a className="identity-name" href="/">
              Zijian Shen
            </a>
            <p className="chinese-name" lang="zh-Hans">
              申子健
            </p>
            <p className="identity-role">Ph.D. Student</p>
            <p className="identity-affiliation">
              Department of Civil Engineering
              <br />
              The University of Hong Kong
            </p>
          </div>
          <div className="identity-actions" aria-label="Profile links">
            <a href="mailto:shenzj@connect.hku.hk">
              Email <span aria-hidden="true">↗</span>
            </a>
            <a href="/Zijian_Shen_Academic_CV.pdf" download>
              CV <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="identity-footer">
            <span>Hong Kong</span>
            <span>Academic profile / 2026</span>
          </div>
        </div>
      </aside>
      <div className="content-panel">
        <header className="topbar">
          <nav aria-label="Primary navigation">
            {navigation.map((item) => (
              <a
                href={item.href}
                key={item.href}
                aria-current={current === item.label ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a className="topbar-contact" href="mailto:shenzj@connect.hku.hk">
            Contact <span aria-hidden="true">↗</span>
          </a>
        </header>
        <main id="main-content">{children}</main>
        <footer className="contact-section" id="contact">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2>Contact</h2>
          </div>
          <div className="contact-details">
            <a href="mailto:shenzj@connect.hku.hk">
              shenzj@connect.hku.hk <span aria-hidden="true">↗</span>
            </a>
            <p>
              Department of Civil Engineering
              <br />
              The University of Hong Kong, Hong Kong
            </p>
          </div>
          <div className="footer-line">
            <span>© 2026 Zijian Shen</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function PageHeader({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="page-header">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <div className="page-intro">{children}</div>
    </header>
  );
}

export function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <header className="section-heading">
      <span className="section-index">{index}</span>
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
    </header>
  );
}

export function SectionNavigation({
  items,
}: {
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <nav className="section-navigation" aria-label="On this page">
      {items.map((item) => (
        <a href={item.href} key={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export function Authors({ value }: { value: string }) {
  return (
    <>
      {value
        .split(/(Zijian Shen|Shen, Z\.)/g)
        .map((part, index) =>
          part === "Zijian Shen" || part === "Shen, Z." ? (
            <strong key={index}>{part}</strong>
          ) : (
            part
          ),
        )}
    </>
  );
}
