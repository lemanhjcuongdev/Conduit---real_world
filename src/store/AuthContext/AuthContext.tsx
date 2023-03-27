import React, { createContext } from "react";

import { IAction, initState, IState } from "./authReducer";

interface IAuthContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

const AuthContext = createContext<IAuthContext>({
  state: initState,
  dispatch: (() => null) as React.Dispatch<IAction>,
});

export default AuthContext;
