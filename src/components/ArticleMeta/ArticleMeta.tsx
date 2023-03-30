import { memo, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { IArticleObjectProps } from "../../pages/Article/types";
import IUserProps from "../../pages/Login/type";
import { DateConverter } from "../../utils/DateConverter";
import ArticleDeleteButton from "../ArticleDeleteButton/ArticleDeleteButton";
import ArticleEditButton from "../ArticleEditButton/ArticleEditButton";
import FavoriteDetailButton from "../FavoriteDetailButton/FavoriteDetailButton";
import FollowButton from "../FollowButton/FollowButton";

interface IArticleMetaProps {
  articleData: IArticleObjectProps | null;
  handleFollow: MouseEventHandler;
  handleFavorite: MouseEventHandler;
  isFollowing: boolean;
  isFavorite: boolean;
  favoriteCount: number;
  user: IUserProps | null;
}

const ArticleMeta = memo((props: IArticleMetaProps) => {
  const {
    articleData,
    user,
    isFollowing,
    isFavorite,
    favoriteCount,
    handleFollow,
    handleFavorite,
  } = props;

  return (
    <div className="article-meta">
      <Link to={`/${articleData?.article.author.username}`}>
        <img
          src={articleData?.article.author.image}
          alt={articleData?.article.author.username}
        />
      </Link>
      <div className="info">
        <Link
          to={`/${articleData?.article.author.username}`}
          className="author"
        >
          {articleData?.article.author.username}
        </Link>
        <span className="date">
          {DateConverter(articleData?.article.createdAt || "")}
        </span>
      </div>
      {user && user.username === articleData?.article.author.username ? (
        <>
          <span ng-show="$ctrl.canModify" className="ng-scope">
            <ArticleEditButton slug={articleData?.article.slug || ""} />
            &nbsp;&nbsp;
            <ArticleDeleteButton slug={articleData?.article.slug || ""} />
          </span>
        </>
      ) : (
        <>
          <FollowButton
            username={articleData?.article.author.username || ""}
            isFollowing={isFollowing || false}
            handleFollow={handleFollow}
          />
          &nbsp;&nbsp;
          <FavoriteDetailButton
            favoriteCount={favoriteCount}
            isFavorite={isFavorite}
            handleFavorite={handleFavorite}
          />
        </>
      )}
    </div>
  );
});

export default ArticleMeta;
