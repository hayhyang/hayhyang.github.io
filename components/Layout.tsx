import styles from "@/styles/Home.module.css";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <h1>Blog</h1>
        </div>
      </header>
      <div className={styles.inner}>{children}</div>
    </>
  );
};

export default Layout;
