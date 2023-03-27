import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import AuthProvider from "./store/AuthContext/AuthProvider";
import { publicRoutes } from "./routes/routes";
import Header from "./layouts/Header/Header";
import { useEffect } from "react";
import useAuthContext from "./hooks/useAuthContext";
import { loginAction } from "./store/actions";

function App() {
  // const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
  // const { dispatch } = useAuthContext();

  // if (Object.keys(user_data).length > 0) {
  //   dispatch(loginAction(user_data));
  // }

  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <Container>
            <Routes>
              {publicRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
}

const Container = styled.div`
  /* width: 1140px; */
`;

export default App;
