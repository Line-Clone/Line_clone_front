import axios from "axios";

export const authInstance = axios.create({
  baseURL: "http://sangt.shop",
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
// 한번 수행되고 끝이 아니라 axios 내부에서 요청 할때마다 이게 실행된다 (id 값이 있는지 확인한다)
// config는 axios 콘솔 찍었을 때 나오던 요청 config를 의미한다.
// 기본으로 설정된 요청을 의미한다.

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

// token이 넘어오면 그걸 받아서 토큰을 받으면 프론트에서 관리를 한다 - 어딘가에 저장한다.
// 보통 웹스토리지에 저장 (로컬스토리지, 세션스토리지)
// 저장하고 필요할때마다 갖고와서 사용한다.

// 인스턴스에서 제공하는 메소드가 있다 (Interceptor request)
// api 요청을 보낼 때 중간에 잡아서 공통적으로 실행하고싶은 로직을 실행한다.
// 그냥 공통적으로 다 토큰을 보낸다 request header에 담아서 보낸다.

// 리퀘스터 사용법이랑 토큰 헤더에 담아서 보내는법 검색해보기

// 헤더엔 저장된 토큰값을 헤더에 실어서 보낸다.

// import axios from "axios";
// import { Cookies } from "react-cookie";

// export const instance = axios.create({
//   baseURL: "http://localhost:3001",
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   },
// });

// export const baseURL = axios.create({
//   baseURL: "http://localhost:3001",
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   },
// });

// baseURL.interceptors.request.use((config) => {
//   if (config.headers === undefined) return;
//   const cookies = new Cookies();
//   const token = cookies.get("accessToken");
//   config.headers["Authorization"] = `${token}`;
//   return config;
// });
