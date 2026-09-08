import {
  PageHeader,
  SectionHeading,
  SectionNavigation,
  SiteFrame,
} from "../components/site-frame";
import {
  awards,
  education,
  experience,
  teachingCourses,
} from "../lib/profile-data";
import { pageMetadata } from "../lib/page-metadata";

export function generateMetadata() {
  return pageMetadata(
    "/experience/",
    "Experience | Shen Zijian",
    "Shen Zijian's education, research experience, teaching assistant appointments, and academic honors.",
  );
}

export default function Experience() {
  return (
    <SiteFrame current="Experience">
      <PageHeader label="Academic background" title="Experience">
        <p>
          Education, research appointments, teaching, and academic honors across
          civil engineering and computer science.
        </p>
      </PageHeader>
      <SectionNavigation
        items={[
          { label: "Education", href: "#education" },
          { label: "Research Experience", href: "#research-experience" },
          { label: "Teaching", href: "#teaching" },
          { label: "Awards", href: "#awards" },
        ]}
      />
      <section className="section" id="education">
        <SectionHeading index="01" label="Training" title="Education" />
        <div className="record-list">
          {education.map((item) => (
            <article className="record-row" key={item.degree}>
              <p className="record-dates">{item.dates}</p>
              <div>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
                <span className="record-note">{item.note}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-paper" id="research-experience">
        <SectionHeading
          index="02"
          label="Appointments"
          title="Research Experience"
        />
        <div className="record-list">
          {experience.map((item) => (
            <article className="record-row" key={item.institution}>
              <p className="record-dates">{item.dates}</p>
              <div>
                <h3>{item.role}</h3>
                <p>{item.institution}</p>
                <span className="record-note">{item.note}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section" id="teaching">
        <SectionHeading
          index="03"
          label="The University of Hong Kong"
          title="Teaching"
        />
        <p className="section-intro">
          Teaching Assistant, Department of Civil Engineering
        </p>
        <div className="teaching-list">
          {teachingCourses.map((course) => (
            <article className="teaching-row" key={course.code}>
              <span className="course-code">{course.code}</span>
              <div className="course-main">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <a className="text-link" href={course.url}>
                  Course details <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="course-terms">
                {course.terms.map((term) => (
                  <div className="course-term" key={term.year}>
                    <p>{term.year}</p>
                    <span>Semester {term.semester}</span>
                    {term.upcoming && (
                      <span className="upcoming">Upcoming</span>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-paper" id="awards">
        <SectionHeading
          index="04"
          label="Recognition"
          title="Honors & Awards"
        />
        <div className="award-list">
          {awards.map((item) => (
            <article className="award-row" key={`${item.year}-${item.title}`}>
              <span>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                {item.issuer && <p className="record-note">{item.issuer}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
