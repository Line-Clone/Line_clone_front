import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SmsIcon from "@mui/icons-material/Sms";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import TextButton from "../../common/TextButton";
import { useNavigate } from "react-router-dom";

function FriendList() {
  const navigate = useNavigate();

  const onLogout = () => {
    alert("로그아웃 되었습니다.");
    navigate("/login");
    localStorage.clear();
  };

  return (
    <div style={OuterStyle}>
      <div style={firstLine}>
        <div>
          <PersonIcon fontSize="large" />
        </div>
        <div>
          <SmsIcon fontSize="large" />
        </div>
        <div>
          <PersonAddAlt1Icon fontSize="large" />
        </div>
        <div>
          <TextButton onClick={onLogout}>로그아웃</TextButton>
        </div>
      </div>
      <div style={secondtLine}>
        <div>
          전체 친구
          <MinimizeIcon />
          <CheckBoxOutlineBlankIcon />
          <CloseIcon />
        </div>
        <hr></hr>
        <div style={firstRowLine}>나의 닉네임</div>
        <hr />
        친구
        <hr />
        <div>
          <div style={rowLine}>
            <AccountCircleIcon /> 친구 닉네임
          </div>
          <div style={rowLine}>
            <AccountCircleIcon /> 친구 닉네임
          </div>
          <div style={rowLine}>
            <AccountCircleIcon /> 친구 닉네임
          </div>
          <div style={rowLine}>
            <AccountCircleIcon /> 친구 닉네임
          </div>
          <div style={rowLine}>
            <AccountCircleIcon /> 친구 닉네임
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendList;

const OuterStyle = {
  border: "1px solid black",
  margin: "0 auto",
  maxWidth: "650px",
  minWidth: "300px",
  maxHeight: "1100px",
  minHeight: "700px",
  boxSizing: "contentBox",
  display: "grid",
  gridTemplateColumns: "60px 1fr",
};

const firstLine = {
  border: "1px solid black",
  backgroundColor: "green",
  textAlign: "center",
};

const secondtLine = {
  border: "1px solid black",
};

const firstRowLine = {
  height: "34px",
};
const rowLine = {
  height: "50px",
};
