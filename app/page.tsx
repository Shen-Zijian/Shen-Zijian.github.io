import { PageHeader, SectionHeading, SiteFrame } from "./components/site-frame";
import { researchThemes } from "./lib/profile-data";

export default function Home() {
  return (
    <SiteFrame current="Home">
      <PageHeader label="Shen Zijian / Academic profile" title="About me">
        <p>
          I am a <strong>Ph.D. student in Civil Engineering</strong> at{" "}
          <a href="https://www.hku.hk/">The University of Hong Kong</a>.
        </p>
        <p>
          My research focuses on data-driven modeling and decision-making for
          intelligent transportation systems. I develop reinforcement learning
          methods for multimodal route recommendation, LLM-enhanced
          probabilistic frameworks for few-shot travel data generation, and
          learning-based models for travel behavior and mobility simulation.
        </p>
      </PageHeader>
      <section className="section section-paper" id="research">
        <SectionHeading index="01" label="Focus" title="Research interests" />
        <div className="research-themes">
          {researchThemes.map((theme) => (
            <article className="research-theme" key={theme.number}>
              <span>{theme.number}</span>
              <div>
                <h3>{theme.title}</h3>
                <p>{theme.description}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="text-link section-link" href="/research/">
          Publications & projects <span aria-hidden="true">→</span>
        </a>
      </section>
      <section className="section home-background">
        <SectionHeading
          index="02"
          label="Background"
          title="Across disciplines"
        />
        <p>
          My academic background spans automation, computer science, and civil
          engineering. I have held research assistant positions at The
          University of Hong Kong and The Chinese University of Hong Kong.
        </p>
        <a className="text-link" href="/experience/">
          Education, teaching & experience <span aria-hidden="true">→</span>
        </a>
      </section>
    </SiteFrame>
  );
}
