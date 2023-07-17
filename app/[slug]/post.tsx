interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => {
  return (
    <section>
      <h2>{post.title}</h2>
      <span>{post.date}</span>

      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </section>
  );
};

export default Post;
