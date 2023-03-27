import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { DateConverter } from "../../utils/DateConverter";
import FavButton from "../FavButton/FavButton";
import IArticleProps from "./types";

interface IArticleItemProps {
  children?: ReactNode;
  className?: string;
  article: IArticleProps;
}

function ArticleItem(props: IArticleItemProps) {
  const { article } = props;
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>
        <div className="info">
          <Link to={`/profiles/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">{DateConverter(article.createdAt)}</span>
        </div>
        {/* <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button> */}
        <FavButton article={article} prefix="pull-xs-right"/>
      </div>
      <Link to={`/articles/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag, index) => (
            <li
              key={index}
              className="tag-default tag-pill tag-outline ng-binding ng-scope"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}

export default ArticleItem;
