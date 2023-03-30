/* eslint-disable no-restricted-globals */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getArticleDetailAPI } from "../../api/article";
import {
  createArticleCommentAPI,
  deleteArticleCommentAPI,
  getArticleCommentsAPI,
} from "../../api/comments";
import { postFavoriteAPI, postUnfavoriteAPI } from "../../api/favorite";
import { followAPI, unfollowAPI } from "../../api/profile";
import ArticleComment from "../../components/ArticleComment/ArticleComment";
import ArticleMeta from "../../components/ArticleMeta/ArticleMeta";
import CommentInput from "../../components/CommentInput/CommentInput";
import useAuthContext from "../../hooks/useAuthContext";
import { IArticleObjectProps, ICommentProps } from "./types";

function ArticlePage() {
  const [articleData, setArticleData] = useState<IArticleObjectProps | null>(
    null
  );
  const [comments, setComments] = useState<ICommentProps[]>([]);

  const { state } = useAuthContext();
  const { user, isAuthenticated } = state;

  //get slug from pathname
  const slug = location.pathname.split("/").pop() || "";

  //navigate
  const navigate = useNavigate();

  //call API
  useEffect(() => {
    getArticleDetailAPI(slug)
      .then((data: IArticleObjectProps) => {
        if (!data.errors) {
          //change page's title
          document.title = `${data.article.title} - Conduit`;

          setArticleData(data);
          setFollowing(data.article.author.following);
          setFavoriteCount(data.article.favoritesCount);
          setFavorite(data.article.favorited);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getArticleCommentsAPI(slug).then((data: { comments: ICommentProps[] }) => {
      setComments(data.comments);
    });
  }, []);

  const [isFollowing, setFollowing] = useState(
    articleData?.article.author.following
  );

  const handleFollow = useCallback(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (isFollowing) {
      unfollowAPI(articleData?.article.author.username || "").then((data) =>
        setFollowing(data.profile.following)
      );
    } else {
      followAPI(articleData?.article.author.username || "").then((data) =>
        setFollowing(data.profile.following)
      );
    }
  }, [isFollowing, articleData]);

  const [isFavorite, setFavorite] = useState(
    articleData?.article.author.following
  );
  const [favoriteCount, setFavoriteCount] = useState(
    articleData?.article.favoritesCount
  );

  const handleFavorite = useCallback(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (isFavorite) {
      postUnfavoriteAPI(articleData?.article.slug || "").then((data) => {
        setFavorite(data.article.favorited);
        setFavoriteCount(data.article.favoritesCount);
      });
    } else {
      postFavoriteAPI(articleData?.article.slug || "").then((data) => {
        setFavorite(data.article.favorited);
        setFavoriteCount(data.article.favoritesCount);
      });
    }
  }, [isFavorite, favoriteCount, articleData]);

  const handleDeleteComment = (id: number) => {
    articleData?.article.slug &&
      confirm("Are you sure to delete this comment?") &&
      deleteArticleCommentAPI(articleData.article.slug, id).then(() => {
        let newComments = comments.filter((c) => c.id !== id);
        setComments(newComments);
      });
  };

  const handleSendComment = (bodyComment: string) => {
    createArticleCommentAPI(slug, {
      comment: {
        body: bodyComment,
      },
    }).then((data) => {
      if (!data.errors) setComments((prev) => [...prev, data.comment]);
      else console.log(data.errors);
    });
  };

  return (
    <div className="article-page">
      {articleData && (
        <>
          <div className="banner">
            <div className="container">
              <h1>{articleData?.article.title}</h1>
              <ArticleMeta
                articleData={articleData}
                user={user}
                isFollowing={isFollowing || false}
                isFavorite={isFavorite || false}
                favoriteCount={favoriteCount || 0}
                handleFollow={handleFollow}
                handleFavorite={handleFavorite}
              />
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{articleData?.article.body}</p>
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <ArticleMeta
                articleData={articleData}
                user={user}
                isFollowing={isFollowing || false}
                isFavorite={isFavorite || false}
                favoriteCount={favoriteCount || 0}
                handleFollow={handleFollow}
                handleFavorite={handleFavorite}
              />
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                {isAuthenticated ? (
                  <>
                    <CommentInput
                      image={user?.image || ""}
                      alt={user?.username || ""}
                      handleSendComment={handleSendComment}
                    />

                    {comments.length > 0 &&
                      comments.map((comment) => (
                        <ArticleComment
                          key={comment.id}
                          comment={comment}
                          user={user}
                          handleDeleteComment={handleDeleteComment}
                        />
                      ))}
                  </>
                ) : (
                  <p style={{ display: "inherit" }}>
                    <Link to="/login">Sign in</Link> or{" "}
                    <Link to="/register">Sign up</Link> to add comments on this
                    article.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ArticlePage;
