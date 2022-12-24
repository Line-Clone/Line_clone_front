import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Banner from "../../../assets/img/line_banner.png";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit, getValues } = useForm();

  const onValid = (data) => {
    console.log(data);
  };

  const { email, password } = getValues();

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <StTopContainer>
        <div>
          <img alt="banner" src={Banner} height="150px" />
        </div>
        <StInputGroup>
          <div>
            <input
              {...register("email", { required: "이메일은 필수 입력입니다." })}
              id="email"
              type="email"
              name="email"
              placeholder="이메일"
            ></input>
          </div>
          <div>
            <input
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
              })}
              id="password"
              type="password"
              name="password"
              placeholder="비밀번호"
            ></input>
          </div>
        </StInputGroup>
        <StButtonGroup>
          <div>
            <button type="submit">로그인</button>
          </div>
          <Link to="/signup">
            <button>신규 가입</button>
          </Link>
        </StButtonGroup>
      </StTopContainer>
    </form>
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
