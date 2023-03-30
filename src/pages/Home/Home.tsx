import useAuthContext from "../../hooks/useAuthContext";
import NewsFeed from "./NewsFeed";

function HomePage() {
  //change page's title
  document.title = "Home - Conduit";

  const { state } = useAuthContext();
  const { isAuthenticated } = state;

  return (
    <div className="home-page">
      {!isAuthenticated && (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}
      <div className="container page">
        <div className="row">
          <NewsFeed />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
