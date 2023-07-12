import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { PostData } from "@/types";

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  return (
    <Layout>
      <h2 className={styles.title}>{post.title}</h2>
      <span className={styles.date}>{post.date}</span>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
    </Layout>
  );
};

export default Post;
