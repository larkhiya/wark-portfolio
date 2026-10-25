import { skills } from "@/lib/content";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" className={styles.skills}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            § 04 — Skills
          </p>
          <h2 className={styles.title} data-reveal>
            Toolbox
          </h2>
        </header>

        <div className={styles.groups}>
          {skills.map((g) => (
            <div key={g.group} className={styles.group} data-reveal>
              <h3>{g.group}</h3>
              <div className={styles.tags}>
                {g.items.map((item) => (
                  <span key={item} className={styles.tag}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
