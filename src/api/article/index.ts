import { API_ROOT } from "../../constants/constants";

export const getAriclesAPI = async (params: {
  limit: number;
  offset: number;
}) => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
    };
    const response = await fetch(
      `${API_ROOT}/articles?limit=${params.limit}&offset=${params.offset}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

export const getAriclesByTagAPI = async (params: {
  tagname: string;
  limit: number;
  offset: number;
}) => {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${API_ROOT}/articles?limit=${params.limit}&offset=${params.offset}&tag=${params.tagname}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

export const getFeedFromUserAPI = async (params: {
  limit: number;
  offset: number;
}) => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
    };
    const response = await fetch(
      `${API_ROOT}/articles/feed?limit=${params.limit}&offset=${params.offset}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};
