import {
  LOGIN,
  LOGOUT,
  REGISTER,
  UPDATE_USER,
} from "../../constants/constants";

export interface IState {
  isAuthenticated: boolean;
  user: null | {
    bio: null;
    email: string;
    image: string;
    token: string;
    username: string;
  };
}

export type IAction = { type: string; payload?: any };

const initState: IState = {
  isAuthenticated: false,
  user: null,
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    default:
      throw new Error(`Invalid action`);
  }
};

export { initState };
export default reducer;
