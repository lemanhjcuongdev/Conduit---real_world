import { memo, useState } from "react";
import TextArea from "../Input/TextArea";

const CommentInput = memo(
  ({
    image,
    alt,
    handleSendComment,
  }: {
    image: string;
    alt: string;
    handleSendComment: (bodyComment: string) => void;
  }) => {
    const [bodyComment, setBodyComment] = useState("");

    const handleSubmitComment = (e: React.MouseEvent<HTMLFormElement>) => {
      e.preventDefault();
      setBodyComment("");
      handleSendComment(bodyComment);
    };

    return (
      <form className="card comment-form" onSubmit={handleSubmitComment}>
        <div className="card-block">
          <TextArea
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
            value={bodyComment}
            setValue={setBodyComment}
          ></TextArea>
        </div>
        <div className="card-footer">
          <img src={image} alt={alt} className="comment-author-img" />
          <button className="btn btn-sm btn-primary">Post Comment</button>
        </div>
      </form>
    );
  }
);

export default CommentInput;
