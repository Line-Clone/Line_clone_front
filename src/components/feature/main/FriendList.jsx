import React, { useEffect } from "react";
import styled from "styled-components";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SmsIcon from "@mui/icons-material/Sms";
import { useDispatch, useSelector } from "react-redux";
import { readAllRooms } from "../../../redux/modules/chatRoomSlice";
import { useNavigate } from "react-router";

function FriendList() {
  const state = useSelector((state) => state);
  console.log("전체 state:", state);

  const chatrooms = useSelector((state) => state.rooms.rooms);
  console.log("chatrooms:", chatrooms);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onLogout() {
    alert("로그아웃 되었습니다.");
    navigate("/login");
    localStorage.clear();
  }

  function enterRoom(roomId) {
    console.log("id:", roomId);
    const nick = prompt("닉네임을 적어주세요.");
    if (nick !== "") {
      localStorage.setItem("wschat.nick", nick);
      localStorage.setItem("wschat.roomId", roomId);
      navigate(`/chat/room/${roomId}`);
    }
  }

  useEffect(() => {
    dispatch(readAllRooms());
  }, []);

  return (
    <div style={OuterStyle}>
      <div style={firstLine}>
        <div>
          <PersonIcon fontSize="large" />
        </div>
        <div>
          <SmsIcon fontSize="large" />
        </div>
        <div></div>
      </div>
      <div style={secondtLine}>
        <div>
          전체 친구
          <MinimizeIcon />
          <CheckBoxOutlineBlankIcon />
          <CloseIcon />
          <button onClick={onLogout}>로그아웃</button>
        </div>
        <hr></hr>
        <div style={firstRowLine}>나의 닉네임</div>
        <hr />
        채팅방목록
        <hr />
        {chatrooms?.map((room) => {
          return (
            <div style={rowLine}>
              {" "}
              <AccountCircleIcon />
              {room.roomName}
              <button
                type="button"
                onClick={() => {
                  enterRoom(room.roomId);
                }}
              >
                입장하기
              </button>
            </div>
          );
        })}
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
