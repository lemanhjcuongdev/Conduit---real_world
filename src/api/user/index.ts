import { API_ROOT } from "../../constants/constants";

export const loginAPI = async (user: {}) => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${API_ROOT}/users/login`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

export const getCurrentUserAPI = async () => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
    };
    const response = await fetch(`${API_ROOT}/user`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

export const updateCurrentUserAPI = async (user: {}) => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${API_ROOT}/user`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

export const registerAPI = async (user: {}) => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${API_ROOT}/users`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};
