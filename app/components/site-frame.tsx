/* eslint-disable @next/next/no-html-link-for-pages -- Static pages use full document navigation. */
import type { ReactNode } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  CodeXml,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react";

const profileLinks = [
  { label: "Email", href: "mailto:shenzj@connect.hku.hk", icon: Mail },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Zijian-Shen-4",
    icon: BookOpen,
  },
  { label: "GitHub", href: "https://github.com/Shen-Zijian", icon: CodeXml },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=JTVGGt0AAAAJ&hl=en",
    icon: GraduationCap,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zijian-shen-622005415/",
    icon: BriefcaseBusiness,
  },
];

function ProfileLinks({ fullEmail = false }: { fullEmail?: boolean }) {
  return (
    <ul className="profile-links">
      {profileLinks.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith("https:") ? "_blank" : undefined}
            rel={href.startsWith("https:") ? "noopener noreferrer" : undefined}
          >
            <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
            <span>
              {fullEmail && label === "Email" ? "shenzj@connect.hku.hk" : label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

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
          <a className="monogram" href="/" aria-label="Shen Zijian home">
            SZ
          </a>
          <figure className="portrait-frame">
            {/* A static image keeps the portrait portable across both hosting providers. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/zijian-shen-portrait.jpg"
              width="720"
              height="960"
              alt="Portrait of Shen Zijian"
              fetchPriority="high"
            />
          </figure>
          <div className="identity-copy">
            <a className="identity-name" href="/">
              Shen Zijian
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
          <address
            className="identity-contact"
            aria-label="Contact and academic profiles"
          >
            <p className="profile-location">
              <MapPin size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>Hong Kong, China</span>
            </p>
            <ProfileLinks />
          </address>
          <div className="identity-actions" aria-label="Curriculum vitae">
            <a href="/Zijian_Shen_Academic_CV.pdf" download>
              <FileText size={17} strokeWidth={1.7} aria-hidden="true" /> CV
            </a>
          </div>
          <div className="identity-footer">
            <span>HKU</span>
            <span>Academic profile</span>
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
          <a className="topbar-contact" href="#contact">
            Contact <span aria-hidden="true">↗</span>
          </a>
        </header>
        <main id="main-content">{children}</main>
        <footer className="contact-section" id="contact">
          <div>
            <h2>Contact</h2>
          </div>
          <address className="contact-details">
            <p className="profile-location">
              <MapPin size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>Hong Kong, China</span>
            </p>
            <p className="contact-affiliation">
              Department of Civil Engineering
              <br />
              The University of Hong Kong
            </p>
            <ProfileLinks fullEmail />
          </address>
          <div className="footer-line">
            <span>© 2026 Shen Zijian</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      <div className="page-intro">{children}</div>
    </header>
  );
}

export function SectionHeading({
  title,
}: {
  title: string;
}) {
  return (
    <header className="section-heading">
      <h2>{title}</h2>
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
