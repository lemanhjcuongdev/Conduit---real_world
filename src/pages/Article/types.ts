import IArticleProps from "../../components/ArticleItem/types";

export interface IArticleObjectProps {
  article: IArticleProps;
  errors?: {
    article: string[];
  };
}

export interface ICommentProps {
  author: {
    username: string;
    bio: any;
    image: string;
    following: boolean;
  };
  body: string;
  createdAt: string;
  id: number;
}
