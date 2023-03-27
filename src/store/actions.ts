import { LOGIN, LOGOUT, UPDATE_USER, REGISTER } from "../constants/constants";

export const loginAction = (payload: {}) => ({
  type: LOGIN,
  payload,
});

export const logoutAction = () => ({
  type: LOGOUT,
});

export const updateUserAction = (payload: {}) => ({
  type: UPDATE_USER,
  payload,
});

export const registerAction = (payload: {}) => ({
  type: REGISTER,
  payload,
});
