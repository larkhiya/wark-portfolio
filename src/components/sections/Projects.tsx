import { projects } from "@/lib/content";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section id="work" className={styles.work}>
      <div className="container">
        <header className={styles.head}>
          <div>
            <p className="eyebrow" data-reveal>
              § 02 — Selected work
            </p>
            <h2 className={styles.title} data-reveal>
              Clippings
            </h2>
          </div>
          <p className={styles.note} data-reveal>
            hover a row →
          </p>
        </header>

        <ul className={styles.list}>
          {projects.map((p) => (
            <li key={p.no} className={styles.row} data-reveal>
              <span className={styles.no}>{p.no}</span>
              <span className={styles.name}>{p.title}</span>
              <span className={styles.tags}>{p.tags.join(" · ")}</span>
              <span className={styles.year}>{p.year}</span>
              <p className={styles.blurb}>{p.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
