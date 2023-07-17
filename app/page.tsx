import { getPostsData } from "@/app/lib/api";
import Home from "./home";

const getPosts = () => {
  const posts = getPostsData(["slug", "title", "date", "tags", "excerpt"]);

  return posts;
};

const Page = async () => {
  const posts = await getPosts();
  return <Home posts={posts} />;
};

export default Page;
