export type PostsData = {
  title: string;
  id: string;
  date: string;
  tags: string[];
};

export type PostData = {
  contentHtml: string | TrustedHTML;
  comments: any;
} & PostsData;
