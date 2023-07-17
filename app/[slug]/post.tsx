interface PostProps {
  post: any;
}

const Post = ({ post }: PostProps) => {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@content", post);
  return (
    <section>
      <h2>{post.title}</h2>
      <span>{post.date}</span>
      {post.content}
      {/* <div dangerouslySetInnerHTML={{ __html: post.content }}></div> */}
    </section>
  );
};

export default Post;
