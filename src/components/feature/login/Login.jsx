import React from "react";
import styled from "styled-components";

function Login() {
  //   const [loginId, setLoginId] = useState("");
  //   const [password, setPassword] = useState("");

  // 오류 메세지 출력

  //   const navigation = useNavigate();

  //   const onLogin = () => {
  //     postLogin({
  //       loginId,
  //       password,
  //     })
  //       .then((res) => {
  //         // 백으로 받은 리스폰스 (토큰 값))
  //         // 로컬스토리지에 저장했다 id라는 키값에
  //         // 이 코드를 거치면 로컬스토리지에 토큰값이 저장되어있다,.
  //         //localStorage.setItem, getItem 이미 있는 내장함수 (검색해보기)
  //         localStorage.setItem("id", res.headers.authorization); // 헤더에 id 토큰값을 실어왔다
  //         navigation("/");
  //       })
  //       .catch((error) => {
  //         console.log("error 들어옴:", error);
  //       });
  //   };

  return (
    <StTopContainer>
      <h1>감자마켓</h1>
      <h3>감사히 자-알 쓰겠습니다!</h3>
      <StInputGroup>
        <div>
          <input
            // value={loginId}
            // onChange={(event) => {
            //   setLoginId(event.target.value);
            // }}
            type="text"
            name="id"
            label="ID를 입력하세요."
            width={"250px"}
          ></input>
        </div>
        <div>
          <input
            // onChange={(event) => {
            //   setPassword(event.target.value);
            // }}
            type="password"
            name="password"
            label="비밀번호를 입력하세요."
            width={"250px"}
          ></input>
        </div>
      </StInputGroup>
      <StButtonGroup>
        <div>
          <button>login</button>
          {/* <Button width={"250px"} onClick={onLogin}>
            Login
          </Button> */}
        </div>
        <StLink>
          <div>
            Don't have an account? Please{" "}
            <span style={{ fontWeight: "bold" }}>Sign Up.</span>
          </div>
          {/* <Link to="/signup"> */}
          {/* </Link> */}
        </StLink>
      </StButtonGroup>
    </StTopContainer>
  );
}

export default Login;

const StTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

  gap: 50px;
`;

const StInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;

  gap: 30px;
`;

const StButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: auto;
  gap: 20px;
`;

const StLink = styled.div`
  a {
    font-weight: 400;
    text-decoration: none;
    color: #4d4f50;
  }
`;
