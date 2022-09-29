import { Buffer } from "buffer";

const API_URL = "http://localhost:8080";

export const createToken = async (username: string, password: string) => {
  return await fetch(`${API_URL}/token/create`, {
    headers: {
      Authorization: `Basic ${Buffer.from(username + ":" + password).toString(
        "base64"
      )}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return { success: false, error: "Response invalid!" };
      }
    })
    .then((json) => {
      localStorage.setItem("token", json.token);
      return { success: true, error: "" };
    })
    .catch((err) => {
      console.error(err);
      return { success: false, error: "Error occurred!" };
    });
};
