import axios from "axios";

export const authInstance = axios.create({
  baseURL: "",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

authInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("id");
  config.headers["Authorization"] = `${token}`;
  return config;
});

export const resInterceptor = (response) => {
  return response;
};

const errorInterceptor = (error) => {
  if (error.response.status === 401) {
    window.location.replace("/login");
    alert("로그인 기간이 만료되었습니다. 다시 로그인 해주세요.");
    localStorage.clear();
  }

  return Promise.reject(error);
};

authInstance.interceptors.response.use(resInterceptor, errorInterceptor);
