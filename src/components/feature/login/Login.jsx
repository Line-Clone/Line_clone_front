import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Banner from "../../../assets/img/line_banner.png";

function Login() {
  return (
    <StTopContainer>
      <div>
        <img alt="banner" src={Banner} height="150px" />
      </div>
      <StInputGroup>
        <div>
          <input placeholder="이메일"></input>
        </div>
        <div>
          <input placeholder="비밀번호"></input>
        </div>
      </StInputGroup>
      <StButtonGroup>
        <div>
          <button>로그인</button>
        </div>
        <Link to="/signup">
          <button>신규 가입</button>
        </Link>
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
`;

const StButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: auto;
  gap: 20px;
`;
