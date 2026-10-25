import { about } from "@/lib/content";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            § 01 — About
          </p>
          <h2 className={styles.title} data-reveal data-reveal-delay="0.05">
            {about.heading}
          </h2>
        </header>

        <div className={styles.grid}>
          <p className={styles.lead} data-reveal>
            {about.lead}
          </p>
          <div className={styles.body}>
            {about.body.map((p, i) => (
              <p key={i} data-reveal data-reveal-delay={`${0.05 * i}`}>
                {p}
              </p>
            ))}
            <p className={styles.note} data-reveal data-reveal-rotate="-3">
              {about.marginNote}
            </p>
          </div>
          <div className={styles.photo} data-reveal data-reveal-rotate="4" aria-hidden>
            <span>
              YOUR
              <br />
              PHOTO
              <br />
              HERE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
