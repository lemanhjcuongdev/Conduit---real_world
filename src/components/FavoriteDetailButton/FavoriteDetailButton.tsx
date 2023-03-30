import { MouseEventHandler } from "react";

interface IFavoriteDetailBtnProps {
  favoriteCount: number;
  isFavorite: boolean;
  handleFavorite: MouseEventHandler;
}

function FavoriteDetailButton(props: IFavoriteDetailBtnProps) {
  const { favoriteCount, isFavorite, handleFavorite } = props;

  return (
    <button
      className={
        isFavorite ? "btn btn-primary btn-sm" : "btn btn-outline-primary btn-sm"
      }
      onClick={handleFavorite}
    >
      <i className="ion-heart"></i>
      &nbsp; {isFavorite ? "Unfavorite" : "Favorite"} Article ({favoriteCount})
    </button>
  );
}

export default FavoriteDetailButton;
