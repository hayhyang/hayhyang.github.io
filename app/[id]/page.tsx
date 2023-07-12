import { getAllPostIds, getPostData } from "@/lib/posts";
import Post from "./post";

export async function generateStaticParams() {
  return await getAllPostIds().map(({ params }) => params);
}

const getPosts = (params: any) => {
  const post = getPostData(params.id);
  return post;
};

const Page = async ({ params }: any) => {
  const post = await getPosts(params);
  return <Post post={post} />;
};

export default Page;
