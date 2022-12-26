import { authInstance } from "../../core/api/axios";

export const postSignup = async (data) => {
  console.log("slice data:", data);
  try {
    const response = await authInstance.post("/api/user/signup", data);
    console.log("slice response:", response);
    return response;
    // 리턴된 값을 로그인 컴포넌트에서 받도록 한다 (생각보다 간단함)
    // 캐치문에서 받게되는 에러도 이렇게 핸들하면 될거같음
    // 참고로 if은 모든 케이스가 "정상"일 때 사용하고, 진짜 "에러"가 동작하는 경우를 리턴하려면 try catch를 사용한다.
    // setState로 텍스트 관리하지말고 custom훅을 사용하자 (사용하는 비슷한 훅이 많을 경우: 예시로 useForm 검색)
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

// export const idDupCheck = async (loginId) => {
//   console.log("id:", loginId);
//   try {
//     const data = await authInstance.post("/api/auth/idDupleCheck", loginId);
//     return data;
//     // 조회되고 처리된 값이 data에 담겨오고,
//   } catch (error) {
//     // alert("이미 사용중인 ID 입니다.");
//     // error.response.로 찍어보면 error 객체가 잘 나온다
//     // state는 따로 또 찍어서 정확한 코드를 알아내고, if문으로 에러 핸들링을 하고 ui로 추가 처리하기
//   }
// };

// export const nickDupCheck = async (nickname) => {
//   try {
//     const data = await authInstance.post("/api/auth/nickDupleCheck", nickname);
//     return data;
//   } catch (error) {
//     return console.log(error);
//     // 중복 체크일 경우, 프론트에서 400에러를 받고 에러 핸들링이 필요하다.
//   }
// };

// // 리스폰스 때 에러를 인터셉트 한다.
// // 첫번째 인자에 들어가는게 에러가 아니라 제대로 들어온 값이고 (변수를 넣는다), 400 이상일 경우, 두번째 파라미터로 넣는다.
// //
