import { site, socials } from "@/lib/content";
import CopyButton from "@/components/CopyButton";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <p className={`eyebrow ${styles.kicker}`} data-reveal>
          § 05 — Contact
        </p>
        <h2 className={styles.cta} data-reveal>
          Let&rsquo;s make
          <br />
          something <em>loud</em>
        </h2>

        <div className={styles.row}>
          <div className={styles.emailWrap} data-reveal>
            <a className={styles.email} href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <CopyButton value={site.email} className={styles.copy} />
          </div>
          <nav className={styles.socials} aria-label="Social links">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} ↗
              </a>
            ))}
          </nav>
        </div>

        <footer className={styles.footer}>
          <span>
            © {site.year} {site.fullName}
          </span>
          <span>Printed with Next.js · Three.js · GSAP · Lenis</span>
          <span>Set in Anton · Space Grotesk · Space Mono · Caveat</span>
        </footer>
      </div>
    </section>
  );
}
