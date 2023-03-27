import { useContext } from "react";

import AuthContext from "../store/AuthContext/AuthContext";

const useAuthContext = () => {
  const { state, dispatch } = useContext(AuthContext);

  return { state, dispatch };
};

export default useAuthContext;
