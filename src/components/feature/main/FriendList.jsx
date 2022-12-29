import React, { useEffect } from "react";
import styled from "styled-components";
import talk from "../../../assets/img/talk.png";
import PersonIcon from "@mui/icons-material/Person";
import SmsIcon from "@mui/icons-material/Sms";
import { useDispatch, useSelector } from "react-redux";
import { readAllRooms } from "../../../redux/modules/chatRoomSlice";
import { useNavigate } from "react-router";
import { createRoom } from "../../../redux/modules/chatRoomSlice";
import { useState } from "react";
import TextButton from "../../common/TextButton";

function FriendList() {
  const chatrooms = useSelector((state) => state.rooms.rooms);
  const userInfo = useSelector((state) => state.rooms.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomTitle, setRoomTitle] = useState("");

  function onLogout() {
    alert("로그아웃 되었습니다.");
    navigate("/login");
    localStorage.clear();
  }

  function enterRoom(roomId) {
    localStorage.setItem("wschat.nick", userInfo.nickname);
    localStorage.setItem("wschat.roomId", roomId);
    navigate(`/chat/room/${roomId}`);
  }

  async function createARoom(roomName) {
    if ("" === roomName) {
      alert("방 제목을 입력해 주십시요.");
      return;
    } else {
      await dispatch(createRoom(roomName));
      dispatch(readAllRooms());
      setRoomTitle("");
    }
  }

  useEffect(() => {
    dispatch(readAllRooms());
  }, [dispatch]);

  return (
    <OuterStyle>
      <nav>
        <div>
          <PersonIcon fontSize="large" />
        </div>
        <div>
          <SmsIcon fontSize="large" />
        </div>
        <div>
          <TextButton onClick={onLogout}>로그아웃</TextButton>
        </div>
      </nav>
      <SecondLine>
        <StHeader>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>Chats</div>
          <div>
            <input
              type="text"
              value={roomTitle}
              placeholder="채팅방 제목을 입력해주세요."
              onChange={(e) => {
                setRoomTitle(e.target.value);
              }}
            ></input>{" "}
            <button
              style={{
                backgroundColor: "rgb(230,230,230)",
                border: "1px solid gray",
                height: "1.8rem",
              }}
              onClick={() => {
                createARoom(roomTitle);
              }}
            >
              채팅방 만들기
            </button>
          </div>
        </StHeader>
        {chatrooms?.map((room) => {
          return (
            <div>
              <StButton
                onClick={() => {
                  enterRoom(room.roomId);
                }}
                key={room.roomId}
              >
                {" "}
                <img
                  alt="talk"
                  src={talk}
                  style={{ marginRight: "20px", height: "2.5rem" }}
                />
                {room.roomName}
              </StButton>
            </div>
          );
        })}
      </SecondLine>
    </OuterStyle>
  );
}

export default FriendList;

const OuterStyle = styled.div`
  outline: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  margin: 20px auto;
  max-width: 500px;
  min-width: 300px;
  max-height: 700px;
  min-height: 700px;
  box-sizing: contentBox;
  display: flex;
  overflow-y: scroll;
  nav {
    display: flex;
    flex-direction: column;
    border: none;
    background-color: rgb(230, 230, 230);
    text-align: center;
    padding-top: 30px;
    gap: 30px;
    position: fixed;
    height: 670px;
    width: 80px;
  }
`;

const SecondLine = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  width: 100%;

  gap: 20px;

  input {
    width: 14rem;
    height: 1.5rem;
  }
  button:hover {
    background-color: #eeeeee;
    border: none;
  }
`;

const StHeader = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  background-color: rgb(255, 255, 255);
  text-align: left;

  gap: 10px;

  position: fixed;
  width: 23rem;
  padding: 0.6rem 0.5rem 0.6rem 0.5rem;
`;

const StButton = styled.button`
  width: 100%;
  height: 3.5rem;
  border: none;
  background-color: white;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
