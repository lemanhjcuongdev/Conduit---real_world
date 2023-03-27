import { useEffect, useReducer } from "react";
import { loginAction } from "../actions";
import AuthContext from "./AuthContext";
import reducer, { initState } from "./authReducer";

const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    const user_data = localStorage.getItem("user_data");

    if (user_data) {
      const user = JSON.parse(user_data ? user_data : "{}");

      //if user = {}
      if (Object.keys(user).length > 0) {
        dispatch(loginAction(user));
      }
    }
  }, [state.isAuthenticated]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
