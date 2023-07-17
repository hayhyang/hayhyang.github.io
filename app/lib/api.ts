import fs from "fs";
import path, { join } from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "__posts");
const getFiles = () => fs.readdirSync(postsDirectory);

export const getPostSlugs = () => {
  const files = getFiles();

  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
};

export const getPostsData = (fields: string[]) => {
  const slugs = getPostSlugs();
  const postsData = slugs
    .map((slug) => getPostData(slug.slug, fields))
    .sort((post1, post2) => (post1.data > post2.data ? -1 : 1));

  return postsData;
};

export const getPostData = (slug: string, fields: string[]) => {
  const fullPath = join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const postData: { [key: string]: string } = {};

  fields.forEach((field) => {
    if (field === "content") {
      postData[field] = content;
    }
    if (field === "slug") {
      postData[field] = slug;
    }
    if (typeof data[field] !== "undefined") {
      postData[field] = data[field];
    }
  });

  return postData;
};
