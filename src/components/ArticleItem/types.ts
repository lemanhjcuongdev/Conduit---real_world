export default interface IArticleProps {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: any;
    image: string;
    following: boolean;
  };
}
