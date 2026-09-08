const researchThemes = [
  {
    number: "01",
    title: "Reinforcement learning for transportation decisions",
  },
  {
    number: "02",
    title: "Deep learning across multimodal mobility systems",
  },
  {
    number: "03",
    title: "LLM applications in smart transportation",
  },
];

const publications = [
  {
    number: "01",
    year: "2026",
    type: "Journal article",
    title:
      "Addressing the online incremental transport mode choice prediction problem with an LLM-augmented class-incremental learning approach.",
    authors: "Chen, T., Shen, Z., Zhou, B., Liu, Y., Wang, S., and Ke, J.",
    venue:
      "Transportation Research Part C: Emerging Technologies, 188, 105709.",
  },
  {
    number: "02",
    year: "2025",
    type: "Journal article",
    title:
      "Dynamic adjustment of matching radii under the broadcasting mode: a novel multi-task learning strategy and temporal modeling approach.",
    authors: "Chen, T., Shen, Z., Feng, S., Yang, L., and Ke, J.",
    venue:
      "Transportation Research Part E: Logistics and Transportation Review, 193, 103822.",
  },
  {
    number: "03",
    year: "2023",
    type: "Conference paper",
    title:
      "Multi-strategy collaborative optimized YOLOv5s and its application in distance estimation.",
    authors: "Shen, Z., Mu, Z., and Li, X.",
    venue: "AEECA 2023.",
  },
];

const workingPapers = [
  {
    year: "2026",
    status: "Under review",
    title:
      "ReLMM-TG: Few-Shot Tabular Generation via Reinforcement Learning over LLM-Compiled Mechanism Memory.",
    authors: "Shen, Z., Zhou, B., Chen, T., Wang, J., and Ke, J.",
    venue: "Artificial Intelligence for Transportation",
  },
  {
    year: "2026",
    status: "Minor",
    title:
      "A Deep Reinforcement Learning Model for Centralized Route Recommendation in Multi-modal Transit Networks.",
    authors: "Shen, Z., Chen, T., Zhou, B., Wang, J., and Ke, J.",
    venue:
      "Transportation Research Part E: Logistics and Transportation Review",
  },
  {
    year: "",
    status: "Major",
    title:
      "SmartSim: A Scalable and Multimodal Open-Source Mesoscopic Urban Traffic Simulator.",
    authors: "Wang, J., Chen, T., Shen, Z., Liang, J., Zhou, B., and Ke, J.",
    venue: "Frontiers of Engineering Management",
  },
];

const education = [
  {
    dates: "09/2026 - 07/2029",
    degree: "Doctor of Philosophy in Civil Engineering",
    school: "The University of Hong Kong",
    note: "Expected",
  },
  {
    dates: "09/2024 - 07/2026",
    degree: "Master of Philosophy in Civil Engineering",
    school: "The University of Hong Kong",
    note: "Expected",
  },
  {
    dates: "09/2022 - 09/2023",
    degree: "Master of Science in Computer Science",
    school: "The University of Hong Kong",
    note: "GPA 3.47",
  },
  {
    dates: "09/2017 - 06/2021",
    degree: "Bachelor of Engineering in Automation",
    school: "Beijing Institute of Technology",
    note: "GPA 3.60",
  },
];

const experience = [
  {
    dates: "11/2023 - 08/2024",
    role: "Research Assistant",
    institution: "The Chinese University of Hong Kong",
    note: "Full-time",
  },
  {
    dates: "09/2022 - 08/2024",
    role: "Research Assistant",
    institution: "The University of Hong Kong",
    note: "Part-time",
  },
];

const projects = [
  {
    code: "STF / PSRI/78/2311/RA",
    dates: "2024 - 2026",
    title:
      "SmartSim: AI-assisted Simulation Software for Multimodal Transportation Operations",
    funder: "Smart Traffic Fund, Hong Kong SAR Government",
  },
  {
    code: "STF / PSRI/29/2201/PR",
    dates: "2023 - 2024",
    title:
      "Development of a Simulation Platform and Artificial Intelligent Algorithms for Optimising Operation and Management of Taxi E-hailing Services",
    funder: "Smart Traffic Fund, Hong Kong SAR Government",
  },
  {
    code: "ECF / 102/2022",
    dates: "2024 - 2026",
    title:
      "Estimating carbon emissions, assessing decarbonization strategies and managing green transportation in Hong Kong with a multifunctional simulation platform",
    funder:
      "Environment Conservation Fund (ECF) Environmental Research, Technology Demonstration and Conference Projects",
  },
  {
    code: "MRF 2025 / HKU-25003",
    dates: "2026 - 2028",
    title:
      "Multimodal traffic simulation, route recommendation and subsidy: Enhancing first and last mile connectivity for MTR",
    funder: "MTR Research Funding",
  },
];

const presentations = [
  {
    year: "2026",
    dates: "January 11-15, 2026",
    event: "105th Transportation Research Board Annual Meeting",
    place: "Washington, DC",
    authors: "Shen, Z., Chen, T., Zhou, B., Wang, J., and Ke, J.",
    title:
      "A temporally aware deep reinforcement learning framework for centralized multi-path recommendation in large-scale multimodal transit networks.",
  },
  {
    year: "2025",
    dates: "December 8-9, 2025",
    event: "29th HKSTS International Conference",
    place: "Hong Kong",
    authors: "Shen, Z., Chen, T., Zhou, B., Wang, J., and Ke, J.",
    title:
      "Multipath: Deep learning based multimodal route guidance with user preference integration.",
  },
  {
    year: "2024",
    dates: "December 9-10, 2024",
    event: "28th HKSTS International Conference",
    place: "Hong Kong",
    authors: "Shen, Z., Chen, T., Wang, J., and Ke, J.",
    title:
      "Personalized fair matching in peer-to-peer ridesharing platforms under broadcasting mode: a LLM-driven driver approach.",
  },
];

const awards = [
  {
    year: "2024 - 2029",
    title: "Postgraduate Scholarship",
  },
  {
    year: "2019",
    title:
      "First Prize, Contemporary Undergraduate Mathematical Contest in Modeling (Beijing)",
  },
  {
    year: "2019",
    title: "Third Prize, BIT Science Contest",
  },
  {
    year: "2017 & 2018",
    title:
      "Second-Class Scholarship for Academic Excellence, Beijing Institute of Technology Postgraduate Scholarship",
  },
];

function SectionHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="section-heading">
      <span className="section-index">{index}</span>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <aside className="identity-panel" aria-label="Profile">
        <div className="identity-inner">
          <a className="monogram" href="#top" aria-label="Back to top">
            ZS
          </a>

          <figure className="portrait-frame">
            <img
              src="/zijian-shen.jpg"
              width="232"
              height="302"
              alt="Portrait of Zijian Shen"
              fetchPriority="high"
            />
          </figure>

          <div className="identity-copy">
            <h1 className="identity-name">Zijian Shen</h1>
            <p className="chinese-name" lang="zh-Hans">
              申子健
            </p>
            <p className="identity-role">
              M.Phil. Student /<br /> Incoming Ph.D. Student
            </p>
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
              Download CV <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="identity-footer">
            <span>Hong Kong</span>
            <span>Academic profile / 2026</span>
          </div>
        </div>
      </aside>

      <main className="content-panel" id="main-content">
        <header className="topbar">
          <nav aria-label="Primary navigation">
            <a href="#research">Research</a>
            <a href="#publications">Publications</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className="hero" id="research">
          <div className="hero-heading">
            <p className="eyebrow">Research profile / 2026</p>
            <h2>
              Engineering intelligence
              <br />
              for <em>complex mobility.</em>
            </h2>
          </div>

          <p className="hero-intro">
            I develop reinforcement learning, deep learning, and large language
            model methods for multimodal transportation systems.
          </p>

          <div className="research-themes" aria-label="Research themes">
            {researchThemes.map((theme) => (
              <article className="research-theme" key={theme.number}>
                <span>{theme.number}</span>
                <h3>{theme.title}</h3>
              </article>
            ))}
          </div>

          <a className="section-jump" href="#publications">
            Explore selected work <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="section section-paper" id="publications">
          <SectionHeading
            index="02"
            eyebrow="Research output"
            title="Selected publications"
          />

          <div className="publication-list">
            {publications.map((publication) => (
              <article className="publication-row" key={publication.number}>
                <span className="publication-number">
                  {publication.number}
                </span>
                <div className="publication-main">
                  <div className="publication-meta">
                    <span>{publication.type}</span>
                    <span>{publication.year}</span>
                  </div>
                  <h3>{publication.title}</h3>
                  <p>{publication.authors}</p>
                </div>
                <p className="publication-venue">{publication.venue}</p>
              </article>
            ))}
          </div>

          <div className="working-block">
            <div className="subsection-label">
              <span>Current</span>
              <h3>Working papers</h3>
            </div>
            <div className="working-list">
              {workingPapers.map((paper) => (
                <article className="working-row" key={paper.title}>
                  <span className="status-label">
                    {paper.year ? `${paper.year} / ` : ""}
                    {paper.status}
                  </span>
                  <div>
                    <h4>{paper.title}</h4>
                    <p>{paper.authors}</p>
                    <p className="working-venue">{paper.venue}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <SectionHeading
            index="03"
            eyebrow="Background"
            title="Education & experience"
          />

          <div className="split-records">
            <div>
              <h3 className="column-title">Education</h3>
              <div className="record-list">
                {education.map((item) => (
                  <article className="record-row" key={item.dates}>
                    <p className="record-dates">{item.dates}</p>
                    <div>
                      <h4>{item.degree}</h4>
                      <p>{item.school}</p>
                      <span>{item.note}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h3 className="column-title">Research experience</h3>
              <div className="record-list">
                {experience.map((item) => (
                  <article className="record-row" key={item.dates}>
                    <p className="record-dates">{item.dates}</p>
                    <div>
                      <h4>{item.role}</h4>
                      <p>{item.institution}</p>
                      <span>{item.note}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-ink" id="projects">
          <SectionHeading
            index="04"
            eyebrow="Applied research"
            title="Selected projects"
          />

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-row" key={project.code}>
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="project-main">
                  <p className="project-meta">
                    {project.code} / {project.dates}
                  </p>
                  <h3>{project.title}</h3>
                </div>
                <p className="project-funder">
                  {project.funder}
                  <br />
                  Core Member
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHeading
            index="05"
            eyebrow="Academic exchange"
            title="Selected presentations"
          />

          <div className="presentation-grid">
            {presentations.map((presentation) => (
              <article className="presentation-item" key={presentation.year}>
                <span className="presentation-year">{presentation.year}</span>
                <h3>{presentation.title}</h3>
                <p className="presentation-authors">{presentation.authors}</p>
                <p>{presentation.event}</p>
                <span>
                  {presentation.place} / {presentation.dates}
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-paper awards-section">
          <SectionHeading
            index="06"
            eyebrow="Recognition"
            title="Honors & awards"
          />

          <div className="award-list">
            {awards.map((award) => (
              <article className="award-row" key={`${award.year}-${award.title}`}>
                <span>{award.year}</span>
                <h3>{award.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <footer className="contact-section" id="contact">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s discuss intelligent mobility.</h2>
          </div>
          <div className="contact-details">
            <p>
              Department of Civil Engineering
              <br />
              The University of Hong Kong
              <br />
              Hong Kong, China
            </p>
            <a href="mailto:shenzj@connect.hku.hk">
              shenzj@connect.hku.hk <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="footer-line">
            <span>© 2026 Zijian Shen</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
