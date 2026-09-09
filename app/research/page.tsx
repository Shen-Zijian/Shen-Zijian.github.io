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
    "Research | Shen Zijian",
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
      </div>
      <div className="publication-list">
        {papers.map((paper, index) => (
          <article className="publication-row" key={paper.id}>
            <span className="publication-number">
              {index + 1}.
            </span>
            <div className="publication-main">
              <h4>{paper.title}</h4>
              <p className="authors">
                <Authors value={paper.authors} />
              </p>
              <p className="publication-venue">
                {paper.venue.replace(/\.$/, "")}
                {paper.year && !paper.venue.includes(paper.year)
                  ? `, ${paper.year}`
                  : ""}
                .
                {paper.status && (
                  <>
                    {" "}
                    <span className="paper-status">{paper.status}</span>
                  </>
                )}
              </p>
              {paper.eventDetails && (
                <p className="authors">
                  {paper.eventDetails.place} · {paper.eventDetails.dates}
                </p>
              )}
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
      <PageHeader title="Research">
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
        <SectionHeading title="Publications" />
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
        <SectionHeading title="Projects" />
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-row" key={project.code}>
              <span className="project-number">
                {index + 1}.
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
