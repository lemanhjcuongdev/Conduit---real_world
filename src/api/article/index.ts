import { API_ROOT } from "../../constants/constants";

//get all articles
export const getArticlesAPI = async (params: {
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

export const getArticlesByTagAPI = async (params: {
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

//get articles by profile
export const getArticlesByProfileAPI = async (params: { author: string }) => {
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
      `${API_ROOT}/articles?author=${params.author}&limit=200&offset=0`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

//get favorited articles
export const getFavoritedArticlesAPI = async (params: {
  favoritedUsername: string;
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
      `${API_ROOT}/articles?favorited=${params.favoritedUsername}&limit=200&offset=0`,
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

export const createArticlesAPI = async (article: {}) => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
      body: JSON.stringify(article),
    };
    const response = await fetch(`${API_ROOT}/articles`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

//get an article
export const getArticleDetailAPI = async (slug: string) => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
    };
    const response = await fetch(`${API_ROOT}/articles/${slug}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

//update an article
export const updateArticleDetailAPI = async (slug: string, article: {}) => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
      body: JSON.stringify(article),
    };
    const response = await fetch(`${API_ROOT}/articles/${slug}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

//delete an article
export const deleteArticleDetailAPI = async (slug: string) => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
    };
    const response = await fetch(`${API_ROOT}/articles/${slug}`, options);

    return response;
  } catch (error) {
    throw new Error();
  }
};
