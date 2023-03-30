import { memo, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { ICommentProps } from "../../pages/Article/types";
import IUserProps from "../../pages/Login/type";
import { DateConverter } from "../../utils/DateConverter";

const ArticleComment = memo(
  ({
    comment,
    user,
    handleDeleteComment,
  }: {
    comment: ICommentProps;
    user: IUserProps | any;
    handleDeleteComment: (id: number) => void;
  }) => {
    return (
      <div className="card">
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <Link to={`/${comment.author.username}`} className="comment-author">
            <img
              src={comment.author.image}
              alt={comment.author.username}
              className="comment-author-img"
            />
          </Link>
          &nbsp;
          <Link to={`/${comment.author.username}`} className="comment-author">
            {comment.author.username}
          </Link>
          <span className="date-posted">
            {DateConverter(comment.createdAt)}
          </span>
          {user.username === comment.author.username && (
            <span
              className="mod-options"
              onClick={() => handleDeleteComment(comment.id)}
            >
              <i className="ion-trash-a"></i>
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default ArticleComment;
