import { getPostsData } from "@/app/lib/api";
import Home from "./home";

const getPosts = () => {
  const posts = getPostsData();
  return posts;
};

const Page = async () => {
  const posts = await getPosts();
  return <Home posts={posts} />;
};

export default Page;
