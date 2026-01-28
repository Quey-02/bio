"use client";

import styles from "./page.module.scss";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className={clsx(styles["main-container"])}>
      <section className={clsx(styles["hero-section"])}>
        <h1 className={clsx(styles["hero-subtitle"])}>My Works</h1>
        <p className={clsx(styles["hero-description"])}>Data & Game & Web</p>

        <div className={clsx(styles["hero-actions"])}>
          <Link
            href="/apps"
            className={clsx(styles["cta-button"], styles["primary"])}
          >
            View Apps
          </Link>
          <Link
            href="/games"
            className={clsx(styles["cta-button"], styles["secondary"])}
          >
            View Games
          </Link>
        </div>

        <a
          href="https://github.com/Quey-02"
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(styles["github-link"])}
        >
          <div className={clsx(styles["github-link-content"])}>
            <img
              src="github.svg"
              alt="GitHub"
              className={clsx(styles["github-icon"])}
            />
            <span className={clsx(styles["github-link-text"])}>@Quey-02</span>
          </div>
        </a>
      </section>

      <section className={clsx(styles["featured-games"])}>
        <h2 className={clsx(styles["section-title"])}>Featured Games</h2>
        <div className={clsx(styles["game-thumbnails"])}>
          <Link href="/games" className={clsx(styles["thumbnail-card"])}>
            <Image
              src="/images/thumbnail/onom_rpg.png"
              alt="Onom RPG"
              width={280}
              height={160}
              className={clsx(styles["thumbnail-image"])}
            />
            <span className={clsx(styles["thumbnail-title"])}>Onom RPG</span>
          </Link>
          <Link href="/games" className={clsx(styles["thumbnail-card"])}>
            <span className={clsx(styles["dev-badge"])}>開発中</span>
            <Image
              src="/images/thumbnail/wizardsdawn_placeholder.png"
              alt="Wizard's Dawn"
              width={280}
              height={160}
              className={clsx(styles["thumbnail-image"])}
            />
            <span className={clsx(styles["thumbnail-title"])}>
              Wizard&apos;s Dawn
            </span>
          </Link>
        </div>
        <Link href="/games" className={clsx(styles["view-all-link"])}>
          View All Games →
        </Link>
      </section>
    </div>
  );
}
