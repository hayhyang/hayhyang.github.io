import { getPostSlugs, getPostData } from "@/app/lib/api";
import Post from "./post";
import { markdownToHtml } from "../lib";

export async function generateStaticParams() {
  return await getPostSlugs().map(({ slug }) => slug);
}

const getPost = async ({ slug }: { slug: string }) => {
  const post = getPostData(slug, ["title", "date", "content"]);

  const content = await markdownToHtml(post.content);

  return { ...post, content };
};

const Page = async ({ params }: any) => {
  const post = await getPost(params);

  return <Post post={post} />;
};

export default Page;
