import { authInstance } from "../../core/api/axios";

export const postSignup = async (data) => {
  try {
    const response = await authInstance.post("/api/user/signup", data);
    console.log("slice response:", response);
    return response;
  } catch (error) {
    return console.log("slice error:", error);
  }
};

export const postLogin = async (data) => {
  try {
    const response = await authInstance.post("/api/user/login", data);
    console.log("login slice:", response);
    return response;
  } catch (error) {
    console.log(error);
    if (error.response.data.status === 400) {
      alert("올바른 아이디나 비밀번호를 찾을 수 없습니다.");
    }
  }
};
