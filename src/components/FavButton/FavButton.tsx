import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postFavoriteAPI, postUnfavoriteAPI } from "../../api/favorite";
import IArticleProps from "../ArticleItem/types";

interface IFavBtnProps {
  article: IArticleProps;
  prefix: string;
}

function FavButton(props: IFavBtnProps) {
  const { article, prefix } = props;
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount);
  const [isFavorited, setFavorited] = useState<boolean>(article.favorited);

  const forwardRoute = useNavigate();

  //get current user
  const user_data: {} = JSON.parse(localStorage.getItem("user_data") || "{}");

  //check current login status
  const handleLove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Object.keys(user_data).length > 0
      ? handleCallLoveAPI()
      : forwardRoute("/login");
  };

  //handle Plus or Minus Heart
  const handleCallLoveAPI = () => {
    isFavorited
      ? postUnfavoriteAPI(article.slug).then((data) => {
          const article_data: IArticleProps = data.article;
          setFavoriteCount(article_data.favoritesCount);

          setFavorited(article_data.favorited);
        })
      : postFavoriteAPI(article.slug).then((data) => {
          const article_data: IArticleProps = data.article;
          setFavoriteCount(article_data.favoritesCount);

          setFavorited(article_data.favorited);
        });
  };

  return (
    <button
      className={
        isFavorited
          ? `btn btn-primary btn-sm ${prefix}`
          : `btn btn-outline-primary btn-sm ${prefix}`
      }
      onClick={handleLove}
    >
      <i className="ion-heart"></i> {favoriteCount}
    </button>
  );
}

export default FavButton;
