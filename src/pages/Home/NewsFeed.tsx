import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAriclesAPI,
  getAriclesByTagAPI,
  getFeedFromUserAPI,
} from "../../api/article";
import ArticleItem from "../../components/ArticleItem/ArticleItem";
import IArticleProps from "../../components/ArticleItem/types";
import { ARTICLES_COUNT_PER_PAGE } from "../../constants/constants";
import useAuthContext from "../../hooks/useAuthContext";
import Tags from "./Tags";

interface INewsFeedProps {}

function NewsFeed(props: INewsFeedProps) {
  const [articles, setArticles] = useState<IArticleProps[] | null>(null);
  const [pageCount, setPageCount] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTag, setSelectedTag] = useState("");
  const [currentTab, setCurrentTab] = useState("global-feed");

  //get authenticated state
  const { state } = useAuthContext();
  const { isAuthenticated } = state;

  useEffect(() => {
    currentTab === "your-feed"
      ? getFeedFromUserAPI({
          limit: 200,
          offset: 0,
        }).then((data: { articles: IArticleProps[] }) => {
          const dataLength = data.articles.length;

          const pageCount = Math.ceil(dataLength / ARTICLES_COUNT_PER_PAGE);

          const articlesPerPage = data.articles.slice(
            currentPage * ARTICLES_COUNT_PER_PAGE,
            (currentPage + 1) * ARTICLES_COUNT_PER_PAGE
          );

          setArticles(articlesPerPage);
          setPageCount(pageCount);
        })
      : // if you haven't clicked on any tags yet
      selectedTag !== ""
      ? getAriclesByTagAPI({
          limit: 200,
          offset: 0,
          tagname: selectedTag,
        }).then((data: { articles: IArticleProps[] }) => {
          const dataLength = data.articles.length;

          const pageCount = Math.ceil(dataLength / ARTICLES_COUNT_PER_PAGE);

          const articlesPerPage = data.articles.slice(
            currentPage * ARTICLES_COUNT_PER_PAGE,
            (currentPage + 1) * ARTICLES_COUNT_PER_PAGE
          );

          setArticles(articlesPerPage);
          setPageCount(pageCount);
        })
      : getAriclesAPI({
          limit: ARTICLES_COUNT_PER_PAGE,
          offset: currentPage * ARTICLES_COUNT_PER_PAGE,
        }).then((data: { articles: IArticleProps[] }) => {
          setArticles(data.articles);
        });
  }, [currentPage, selectedTag, currentTab, isAuthenticated]);

  const handleSelectTag = (tagname: string) => {
    setSelectedTag(tagname);
    setCurrentPage(0);
    setCurrentTab("");
    setArticles(null);
  };

  return (
    <>
      <div className="col-md-9">
        <div className="news_feed">
          <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
              {isAuthenticated && (
                <li className="nav-item">
                  <Link
                    className={
                      currentTab === "your-feed"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="#"
                    onClick={() => {
                      setCurrentPage(0);
                      setCurrentTab("your-feed");
                      setSelectedTag("");
                      setArticles(null);
                    }}
                  >
                    Your Feed
                  </Link>
                </li>
              )}
              <li className="nav-item ">
                <Link
                  className={
                    currentTab === "global-feed"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="#"
                  onClick={(e) => {
                    setCurrentPage(0);
                    setPageCount(20);
                    setSelectedTag("");
                    setCurrentTab("global-feed");
                    setArticles(null);
                  }}
                >
                  Global Feed
                </Link>
              </li>
              {selectedTag !== "" && (
                <li className="nav-item ">
                  <Link
                    className="nav-link active"
                    to="#"
                    onClick={() => setCurrentPage(0)}
                  >
                    <i className="ion-pound"></i> {selectedTag}{" "}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {articles && articles.length === 0 ? (
            <div className="article-preview">No articles are here... yet.</div>
          ) : articles === null ? (
            <div className="article-preview">Loading articles...</div>
          ) : (
            articles &&
            articles.map((article, index) => (
              <ArticleItem key={index} article={article} />
            ))
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
      <div className="col-md-3">
        <Tags handleSelectTag={handleSelectTag} />
      </div>
    </>
  );
}

export default NewsFeed;
