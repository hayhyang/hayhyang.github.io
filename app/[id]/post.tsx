import { PostData } from "@/types";

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  return (
    <section>
      <h2>{post.title}</h2>
      <span>{post.date}</span>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
    </section>
  );
};

export default Post;
