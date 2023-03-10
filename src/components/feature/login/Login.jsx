import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Kakao360 from "../../../assets/img/kakao360.png";
import { useForm } from "react-hook-form";
import { postLogin } from "../../../redux/modules/authSlice";
import TextButton from "../../common/TextButton";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigate();

  const onValid = async (data) => {
    await postLogin(data).then((response) =>
      localStorage.setItem("id", response.headers.authorization)
    );
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onValid(data).then(() => {
          navigation("/main");
        });
      })}
    >
      <StTopContainer>
        <div>
          <img
            alt="banner"
            src={Kakao360}
            style={{ width: "9rem", paddingTop: "50px" }}
          />
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
            {errors.password && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.password.message}
              </p>
            )}
          </div>
        </StInputGroup>
        <StButtonGroup>
          <div>
            <input type="submit" value="로그인" />
          </div>

          <Link to="/signup">
            <TextButton>이메일로 회원가입</TextButton>
          </Link>
        </StButtonGroup>
      </StTopContainer>
    </form>
  );
}

export default Login;

const StTopContainer = styled.div`
  outline: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  margin: 20px auto;

  max-width: 500px;
  min-width: 300px;
  max-height: 700px;
  min-height: 700px;

  box-sizing: contentBox;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  background-color: #f7e600;

  gap: 50px;
`;

const StInputGroup = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  gap: 5px;
  input:focus {
    outline: none;
  }
  * {
    width: 15rem;
    height: 2rem;
    font-size: 0.8rem;
  }
`;

const StButtonGroup = styled.div`
  display: grid;
  place-items: center;
  input {
    width: 15rem;
    height: 2rem;
    font-size: 0.8rem;
  }
  input:hover {
    transition: 0.2s;
    background-color: rgb(54, 29, 28);
    border: none;
    color: white;
  }

  gap: 20px;
`;
