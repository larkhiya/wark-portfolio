import { experience } from "@/lib/content";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section id="experience" className={styles.exp}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            § 03 — Experience
          </p>
          <h2 className={styles.title} data-reveal>
            Back issues
          </h2>
        </header>

        <ol className={styles.list}>
          {experience.map((e) => (
            <li key={e.role + e.period} className={styles.item} data-reveal>
              <span className={styles.period}>{e.period}</span>
              <div>
                <h3 className={styles.role}>
                  {e.role} <span className={styles.org}>@ {e.org}</span>
                </h3>
                <p className={styles.blurb}>{e.blurb}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
