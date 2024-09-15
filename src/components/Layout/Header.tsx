import React from "react";

import styles from "@/styles/Layout/Header.module.css";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header_wrapper}>
        <div className={styles.nav_main}>
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="logo"
            width={160}
            height={30}
          ></Image>
          <ul className={styles.nav_links}>
            <li>
              <Link className={styles.header_link} href="/movie">
                Movies
              </Link>
            </li>
            <li>
              <Link className={styles.header_link} href="/shows">
                TV Shows
              </Link>
            </li>
            <li>
              <Link className={styles.header_link} href="/people">
                People
              </Link>
            </li>
            <li>
              <Link className={styles.header_link} href="/more">
                More
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.nav_settings}>
          <ul className={styles.nav_links}>
            <li>
              <Link href="#">
                <Image
                  src="/add_button.svg"
                  width={20}
                  height={20}
                  alt="add button"
                ></Image>
              </Link>
            </li>
            <li className={styles.language_button}>EN</li>
            <li>
              <Link href="#">
                <Image
                  src="/notifications_icon.svg"
                  width={20}
                  height={20}
                  alt="add button"
                ></Image>
              </Link>
            </li>
            <li>
              <div className={styles.profile_picture}>A</div>
            </li>
            <li>
              <Image
                src="/search_icon.svg"
                width={30}
                height={30}
                alt="add button"
              ></Image>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
