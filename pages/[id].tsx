import Layout from "@/components/Layout";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { PostData } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import styles from "@/styles/Home.module.css";
import Head from "next/head";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>Blog | {post.title}</title>
      </Head>
      <Layout>
        <h2 className={styles.title}>{post.title}</h2>
        <span className={styles.date}>{post.date}</span>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const post = await getPostData(id);

  return {
    props: {
      post,
    },
  };
};
