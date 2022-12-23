import React from "react";
import styled from "styled-components";
import Banner from "../../../assets/img/line_banner.png";

function Signup() {
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
          <input placeholder="닉네임"></input>
        </div>
        <div>
          <input placeholder="비밀번호"></input>
        </div>
      </StInputGroup>
      <StButtonGroup>
        <div>
          <button>회원가입</button>
        </div>
        <StLink>
          <a href="/login">이메일로 로그인</a>
        </StLink>
      </StButtonGroup>
    </StTopContainer>
  );
}

export default Signup;

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

const StLink = styled.div`
  a {
    font-weight: 400;
    text-decoration: none;
    color: #4d4f50;
  }
`;
