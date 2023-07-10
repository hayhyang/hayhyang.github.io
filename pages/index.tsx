import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/Layout";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { PostsData } from "@/types";

const inter = Inter({ subsets: ["latin"] });

interface PostsProps {
  posts: PostsData[];
}

export default function Home({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
}

export const getStaticProps = async () => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
};
