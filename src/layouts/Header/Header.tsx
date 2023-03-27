import { NavLink, useLocation } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

import { StyledHeader } from "./styles";

const Header = () => {
  let location = useLocation();
  let currentRoute = location.pathname;
  const { state, dispatch } = useAuthContext();
  const { user, isAuthenticated } = state;

  return (
    <StyledHeader>
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            conduit
          </NavLink>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink
                className={
                  currentRoute === "/" ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={
                      currentRoute === "/editor"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/editor"
                  >
                    {" "}
                    <i className="ion-compose"></i>&nbsp;New Article{" "}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={
                      currentRoute === "/settings"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/settings"
                  >
                    {" "}
                    <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={user?.username || ""}>
                    {" "}
                    <img
                      src={user?.image}
                      alt={user?.username}
                      className="user-pic"
                    />
                    {user?.username}
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={
                      currentRoute === "/login" ? "nav-link active" : "nav-link"
                    }
                    to="/login"
                  >
                    Sign in
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={
                      currentRoute === "/register"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/register"
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </StyledHeader>
  );
};

export default Header;
