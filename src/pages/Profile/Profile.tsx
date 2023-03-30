import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getArticlesByProfileAPI,
  getFavoritedArticlesAPI,
} from "../../api/article";
import { followAPI, getProfileAPI, unfollowAPI } from "../../api/profile";
import ArticleItem from "../../components/ArticleItem/ArticleItem";
import FollowButton from "../../components/FollowButton/FollowButton";
import useAuthContext from "../../hooks/useAuthContext";
import { ARTICLES_COUNT_PER_PROFILE_PAGE } from "../../constants/constants";

function ProfilePage() {
  const { profile } = useParams();

  const { state } = useAuthContext();
  const { user, isAuthenticated } = state;

  //change page's title
  document.title = `@${user?.username} - Conduit`;

  const [author, setAuthor] = useState<{
    bio: string;
    following: boolean;
    image: string;
    username: string;
  } | null>(null);
  const [currentTab, setCurrentTab] = useState("my-articles");
  const [articles, setArticles] = useState<[] | null>(null);
  const [pageCount, setPageCount] = useState<number>();
  const [currentPage, setCurrentPage] = useState(0);

  //call API
  useEffect(() => {
    if (currentTab === "my-articles" && profile) {
      getProfileAPI(profile).then((data) => {
        setAuthor(data.profile);
        const profileUsername = data.profile.username.replaceAll(" ", "+");
        getArticlesByProfileAPI({ author: profileUsername }).then(
          (articlesData) => {
            const dataLength = articlesData.articles.length;

            const pageCount = Math.ceil(
              dataLength / ARTICLES_COUNT_PER_PROFILE_PAGE
            );

            const articlesPerPage = articlesData.articles.slice(
              currentPage * ARTICLES_COUNT_PER_PROFILE_PAGE,
              (currentPage + 1) * ARTICLES_COUNT_PER_PROFILE_PAGE
            );

            setArticles(articlesPerPage);
            setPageCount(pageCount);
          }
        );
      });
    } else if (currentTab === "favorited-articles" && profile) {
      getProfileAPI(profile).then((data) => {
        setAuthor(data.profile);
        const profileUsername = data.profile.username.replaceAll(" ", "+");
        getFavoritedArticlesAPI({ favoritedUsername: profileUsername }).then(
          (articlesData) => {
            const dataLength = articlesData.articles.length;

            const pageCount = Math.ceil(
              dataLength / ARTICLES_COUNT_PER_PROFILE_PAGE
            );

            const articlesPerPage = articlesData.articles.slice(
              currentPage * ARTICLES_COUNT_PER_PROFILE_PAGE,
              (currentPage + 1) * ARTICLES_COUNT_PER_PROFILE_PAGE
            );

            setArticles(articlesPerPage);
            setPageCount(pageCount);
          }
        );
      });
    }
  }, [currentTab, currentPage]);

  //navigate
  const navigate = useNavigate();
  //follow user
  const [isFollowing, setFollowing] = useState(author?.following);

  const handleFollow = useCallback(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (isFollowing) {
      unfollowAPI(author?.username || "").then((data) =>
        setFollowing(data.profile.following)
      );
    } else {
      followAPI(author?.username || "").then((data) =>
        setFollowing(data.profile.following)
      );
    }
  }, [isFollowing, author]);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                src={author?.image}
                alt={author?.username}
                className="user-img"
              />
              <h4>{author?.username}</h4>
              <p>{author?.bio}</p>
              {user && user.username === author?.username ? (
                <Link
                  className="btn btn-sm btn-outline-secondary action-btn"
                  to="/settings"
                >
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </Link>
              ) : (
                <FollowButton
                  username={author?.username || ""}
                  isFollowing={isFollowing || false}
                  handleFollow={handleFollow}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    className={
                      currentTab === "my-articles"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="#"
                    onClick={() => {
                      setCurrentPage(0);
                      setCurrentTab("my-articles");
                      setArticles(null);
                    }}
                  >
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      currentTab === "favorited-articles"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="#"
                    onClick={() => {
                      setCurrentPage(0);
                      setCurrentTab("favorited-articles");
                      setArticles(null);
                    }}
                  >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>
            {articles && articles.length === 0 ? (
              <div className="article-preview">
                No articles are here ... yet
              </div>
            ) : articles === null ? (
              <div className="article-preview">Loading...</div>
            ) : (
              <>
                {articles &&
                  articles.map((article, index) => {
                    return <ArticleItem key={index} article={article} />;
                  })}
              </>
            )}
            <ul className="pagination">
              {pageCount && pageCount !== 0
                ? new Array(pageCount).fill(undefined).map((page, index) => (
                    <li
                      className={
                        currentPage === index
                          ? "page-item ng-scope active"
                          : "page-item ng-scope"
                      }
                      style={{
                        cursor: "pointer",
                      }}
                      key={index}
                      onClick={() => setCurrentPage(index)}
                    >
                      <div className="page-link ng-binding">{index + 1}</div>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
