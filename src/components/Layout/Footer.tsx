import React from "react";
import styles from "@/styles/Layout/Footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footer_wrapper}>
        <div className={styles.info}>
          <Image
            className={styles.footer_logo}
            src="/logo-2.svg"
            alt="footer logo"
            width={130}
            height={94}
          ></Image>
          <Link href="#" className={styles.username_link}>
            Hi USERNAME
          </Link>
        </div>

        <div className={styles.footer_section}>
          <h3 className={styles.footer_section_header}>THE BASICS</h3>
          <ul>
            <li>
              <Link href="#" className={styles.footer_link}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                About TMDB
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                Support Forums
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                API
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                System Status
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footer_section}>
          <h3 className={styles.footer_section_header}>GET INVOLVED</h3>
          <ul>
            <li>
              <Link href="#" className={styles.footer_link}>
                Contribution Bible
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                Add New Movie
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                Add New TV Show
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footer_section}>
          <h3 className={styles.footer_section_header}>COMMUNITY</h3>
          <ul>
            <li>
              <Link href="#" className={styles.footer_link}>
                Guidelines
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                Discussions
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footer_section}>
          <h3 className={styles.footer_section_header}>LEGAL</h3>
          <ul>
            <li>
              <Link href="#" className={styles.footer_link}>
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                API Terms of Use
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className={styles.footer_link}>
                DMCA Policy
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
