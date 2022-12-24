import React, { useState } from "react";
import styled from "styled-components";
import Banner from "../../../assets/img/line_banner.png";
import { useForm } from "react-hook-form";
import { postSignup } from "../../../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigate();

  const onSubmit = async (data) => {
    console.log("data:", data);
    await postSignup(data).then(
      (response) => localStorage.setItem("id", response.headers.authorization),
      alert("회원가입이 완료되었습니다. 다시 로그인 해 주세요"),
      navigation("/login")
    );
  };

  return (
    <StTopContainer>
      <div>
        <img alt="banner" src={Banner} height="150px" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StInputGroup>
          <div>
            <input
              name="username"
              placeholder="이메일"
              {...register("username", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "올바른 이메일 형식이 아닙니다.",
                },
              })}
            ></input>
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              name="nickname"
              placeholder="닉네임"
              {...register("nickname", {
                required: "닉네임을 입력해주세요.",
              })}
            ></input>
            {errors.nickname && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.nickname.message}
              </p>
            )}
          </div>
          <div>
            {" "}
            <input // 얘 100%
              name="password"
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
            {errors.password && ( //div로 감싸서 100% 주면 부모 디브 밖으로 안 넘어간다
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.password.message}
              </p>
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
