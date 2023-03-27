import { API_ROOT } from "../../constants/constants";

export const getProfileAPI = async (params: string) => {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(`${API_ROOT}/profiles/${params}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error();
  }
};
