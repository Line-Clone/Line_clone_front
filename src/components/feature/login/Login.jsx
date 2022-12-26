import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../../assets/img/line_banner.png";
import { useForm } from "react-hook-form";
import { postLogin } from "../../../redux/modules/authSlice";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigate();

  const onValid = async (data) => {
    console.log("login data:", data);
    // const jsonData = JSON.stringify({ data });
    await postLogin(data).then(
      (response) => localStorage.setItem("id", response.headers.authorization),
      navigation("/")
    );
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <StTopContainer>
        <div>
          <img alt="banner" src={Banner} height="150px" />
        </div>
        <StInputGroup>
          <div>
            <input
              {...register("username", {
                required: "이메일은 필수 입력입니다.",
              })}
              type="email"
              name="username"
              placeholder="이메일"
            ></input>
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
              })}
              type="password"
              name="password"
              placeholder="비밀번호"
            ></input>
            {errors.password && ( //div로 감싸서 100% 주면 부모 디브 밖으로 안 넘어간다
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.password.message}
              </p>
            )}
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
