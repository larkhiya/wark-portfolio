import { site, nav } from "@/lib/content";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="#top" className={styles.logo}>
        {site.name}
        <sup>®</sup>
      </a>
      <nav className={styles.nav} aria-label="Primary">
        {nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <span className={styles.status}>
        <span className={styles.dot} aria-hidden />
        Open to work
      </span>
    </header>
  );
}
