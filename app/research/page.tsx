import {
  Authors,
  PageHeader,
  SectionHeading,
  SectionNavigation,
  SiteFrame,
} from "../components/site-frame";
import {
  conferencePapers,
  journalPapers,
  projects,
  workingPapers,
  type Publication,
} from "../lib/profile-data";
import { pageMetadata } from "../lib/page-metadata";

export function generateMetadata() {
  return pageMetadata(
    "/research/",
    "Research | Zijian Shen",
    "Journal papers, conference papers, working papers, and projects in intelligent transportation, reinforcement learning, and travel data generation.",
  );
}

function PaperList({
  title,
  id,
  papers,
}: {
  title: string;
  id: string;
  papers: Publication[];
}) {
  return (
    <section className="publication-group" id={id}>
      <div className="subsection-heading">
        <h3>{title}</h3>
        <span>{String(papers.length).padStart(2, "0")}</span>
      </div>
      <div className="publication-list">
        {papers.map((paper, index) => (
          <article className="publication-row" key={paper.id}>
            <span className="publication-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="publication-main">
              <div className="publication-meta">
                {paper.year && <span>{paper.year}</span>}
                {paper.status && (
                  <span className="paper-status">{paper.status}</span>
                )}
              </div>
              <h4>{paper.title}</h4>
              <p className="authors">
                <Authors value={paper.authors} />
              </p>
              <p className="publication-venue">{paper.venue}</p>
              {paper.url && (
                <div className="paper-links">
                  <a className="text-link" href={paper.url}>
                    arXiv <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Research() {
  return (
    <SiteFrame current="Research">
      <PageHeader label="Research & scholarship" title="Research">
        <p>
          I study how data and learning algorithms can improve transportation
          systems, from modeling travel behavior and generating scarce travel
          data to recommending routes and simulating multimodal mobility.
        </p>
      </PageHeader>
      <SectionNavigation
        items={[
          { label: "Journal Papers", href: "#journal-papers" },
          { label: "Conference Papers", href: "#conference-papers" },
          { label: "Working Papers", href: "#working-papers" },
          { label: "Projects", href: "#projects" },
        ]}
      />
      <section className="section section-paper" id="publications">
        <SectionHeading
          index="01"
          label="Research output"
          title="Publications"
        />
        <PaperList
          title="Journal Papers"
          id="journal-papers"
          papers={journalPapers}
        />
        <PaperList
          title="Conference Papers"
          id="conference-papers"
          papers={conferencePapers}
        />
        <PaperList
          title="Working Papers"
          id="working-papers"
          papers={workingPapers}
        />
      </section>
      <section className="section section-ink" id="projects">
        <SectionHeading index="02" label="Applied research" title="Projects" />
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-row" key={project.code}>
              <span className="project-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="project-meta">
                  {project.dates} · {project.code}
                </p>
                <h3>{project.title}</h3>
                <p className="project-funder">{project.funder}</p>
                <p className="project-role">Core Member</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
