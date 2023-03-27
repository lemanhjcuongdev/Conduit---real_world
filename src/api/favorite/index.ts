import axios from "axios";
import { API_ROOT } from "../../constants/constants";

export const postFavoriteAPI = async (slug: string) => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
    };
    const response = await fetch(
      `${API_ROOT}/articles/${slug}/favorite`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

export const postUnfavoriteAPI = async (slug: string) => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
    };
    const response = await fetch(
      `${API_ROOT}/articles/${slug}/favorite`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};
