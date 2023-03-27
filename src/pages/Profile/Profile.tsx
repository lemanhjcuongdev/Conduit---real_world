import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfileAPI } from "../../api/profile";
import useAuthContext from "../../hooks/useAuthContext";
import IUserProps from "../Login/type";

function ProfilePage() {
  const { profile } = useParams();

  const { state } = useAuthContext();
  const { user } = state;

  const [author, setAuthor] = useState<IUserProps | null>(null);
  const [currentTab, setCurrentTab] = useState("my-article");

  useEffect(() => {
    if (currentTab === "my-article" && profile) {
      getProfileAPI(profile).then((data) => {
        setAuthor(data.profile);
      });
    }
  }, []);

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
              {user && user.username == author?.username ? (
                <Link
                  className="btn btn-sm btn-outline-secondary action-btn"
                  to="/settings"
                >
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </Link>
              ) : (
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {author?.username}
                </button>
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
                  <a className="nav-link active" href="">
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="">
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            <div className="article-preview">
              <div className="article-meta">
                <a href="">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    Eric Simons
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 29
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>

            <div className="article-preview">
              <div className="article-meta">
                <a href="">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    Albert Pai
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 32
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">Music</li>
                  <li className="tag-default tag-pill tag-outline">Song</li>
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
