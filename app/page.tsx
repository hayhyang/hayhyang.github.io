import { getSortedPostsData } from "@/lib/posts";
import HomePage from "./home";

const getPosts = () => {
  const posts = getSortedPostsData();
  return posts;
};

const Page = async () => {
  const posts = await getPosts();
  return <HomePage posts={posts} />;
};

export default Page;
