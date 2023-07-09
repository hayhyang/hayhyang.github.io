export type PostsData = {
  title: string;
  id: string;
  date: string;
};

export type PostData = {
  contentHtml: string | TrustedHTML;
} & PostsData;
