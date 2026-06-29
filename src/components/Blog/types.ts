export type BlogPost = {
  id: string;
  title: string;
  tag: string;
  createdAt: string;
  readingTime: string;
  description: string;
  image: string;
  href: string;
};

export type BlogPostAuthor = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  href?: string;
};

export type BlogPostContentSection = {
  id: string;
  title: string;
  body: string[];
};

export type BlogPostDetail = BlogPost & {
  heroImage: string;
  authors: BlogPostAuthor[];
  sections: BlogPostContentSection[];
};
