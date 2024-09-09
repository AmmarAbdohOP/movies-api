import React, { ReactNode } from "react";
import styles from "@/styles/Layout/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";

type RootLayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
