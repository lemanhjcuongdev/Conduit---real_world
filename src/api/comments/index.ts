import { API_ROOT } from "../../constants/constants";

//get an article's comments
export const getArticleCommentsAPI = async (slug: string) => {
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
      `${API_ROOT}/articles/${slug}/comments`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

//delete a my comment
export const deleteArticleCommentAPI = async (slug: string, id: number) => {
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
      `${API_ROOT}/articles/${slug}/comments/${id}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};

//delete a my comment
export const createArticleCommentAPI = async (
  slug: string,
  comment: {
    comment: {
      body: string;
    };
  }
) => {
  const token = JSON.parse(localStorage.getItem("user_data") || "{}").token;

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Token " + token : "",
      },
      body: JSON.stringify(comment),
    };
    const response = await fetch(
      `${API_ROOT}/articles/${slug}/comments`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};
