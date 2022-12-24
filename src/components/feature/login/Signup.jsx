import React, { useState } from "react";
import styled from "styled-components";
import Banner from "../../../assets/img/line_banner.png";
import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <StTopContainer>
      <div>
        <img alt="banner" src={Banner} height="150px" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StInputGroup>
          <div>
            <input
              name="email"
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "올바른 이메일 형식이 아닙니다.",
                },
              })}
            ></input>
            {errors.email && (
              <p style={{ color: "red" }}>{errors.email.message}</p>
            )}
          </div>
          <div>
            <input placeholder="닉네임"></input>
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
                  message:
                    "비밀번호는 8~16자로 영문 소문자, 숫자, 특수기호를 조합해서 사용하세요.",
                },
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password.message}</p>
            )}
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
      </form>
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
