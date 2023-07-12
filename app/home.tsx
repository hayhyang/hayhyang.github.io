"use client";

import { PostsData } from "@/types";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";

interface HomeProps {
  posts: PostsData[];
}

const inter = Inter({ subsets: ["latin"] });

const HomePage = ({ posts }: HomeProps) => {
  return (
    <Layout>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.grid}>
          {posts.map(({ id, date, title }) => (
            <Link
              href={id}
              className={styles.card}
              rel="noopener noreferrer"
              key={id}
            >
              <h2 className={styles.title}>
                {title} <span>-&gt;</span>
              </h2>
              <p className={styles.date}>{date}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default HomePage;
