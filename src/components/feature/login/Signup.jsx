import React from "react";
import styled from "styled-components";
import Kakao360 from "../../../assets/img/kakao360.png";
import { useForm } from "react-hook-form";
import { postSignup } from "../../../redux/modules/authSlice";
import { useNavigate, Link } from "react-router-dom";
import TextButton from "../../common/TextButton";

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
      alert("회원가입이 완료되었습니다. 다시 로그인 해 주세요"),
      navigation("/login")
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              name="username"
              placeholder="이메일"
              {...register("username", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
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
                  value:
                    /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,16}$/,
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
            <input type="submit" value="회원가입" />
          </div>
          <Link to="/login">
            <TextButton>이메일로 로그인</TextButton>
          </Link>
        </StButtonGroup>
      </StTopContainer>
    </form>
  );
}

export default Signup;

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
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
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
