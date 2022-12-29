import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useParams } from "react-router-dom";
import { readBeforeChat } from "../../../redux/modules/chatSlice";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Chat() {
  let SockJs = new SockJS("http://sangt.shop/ws/chat");
  let ws = Stomp.over(SockJs);
  let reconnect = 0;
  const dispatch = useDispatch();
  const param = useParams();
  const roomId = param.id;
  const beforechat = useSelector((state) => state.chat.messageList);
  console.log("beforechat:", beforechat);
  const messages = [];
  const sender = localStorage.getItem("wschat.nick");
  const [message, setMessage] = useState("");
  const [viewMessages, setViewMessages] = useState([]);
  const chatlist = useSelector((state) => state.rooms);
  console.log("chatlist:", chatlist);

  console.log("message:", message);
  console.log("view:", viewMessages);

  function sendMessage() {
    ws.send(
      "/app/chat/message",
      {},
      JSON.stringify({
        type: "TALK",
        roomId: roomId,
        sender: sender,
        message: message,
      })
    );
  }

  function recvMessage(recv) {
    messages.push({
      type: recv.type,
      sender: recv.type === "ENTER" ? "" : recv.sender,
      message: recv.type === "ENTER" ? `[알림] ${recv.message}` : recv.message,
    });
    setViewMessages([...messages]);
  }

  function roomSubscribe() {
    ws.connect(
      {},
      function (frame) {
        ws.subscribe(`/topic/chat/room/${roomId}`, function (response) {
          var recv = JSON.parse(response.body);
          recvMessage(recv);
        });
        ws.send(
          "/app/chat/message",
          {},
          JSON.stringify({
            type: "ENTER",
            roomId: roomId,
            sender: sender,
          })
        );
      },
      function (error) {
        if (reconnect++ <= 5) {
          setTimeout(function () {
            SockJs = new SockJS("http://sangt.shop/ws/chat");
            ws = Stomp.over(SockJs);
            roomSubscribe();
          }, 10 * 1000);
        }
      }
    );
  }

  useEffect(() => {
    dispatch(readBeforeChat(param.id));
    roomSubscribe();
  }, []);

  return (
    <StTopContainer>
      <StTopBorder>
        {beforechat?.map((item, index) => {
          if (localStorage.getItem("wschat.nick") === item.sender) {
            return (
              <div>
                <RightSenderName>{item.sender}</RightSenderName>
                <BeforeBox>
                  <div key={index}>{item.message}</div>
                </BeforeBox>
              </div>
            );
          } else {
            return (
              <div>
                <LeftSenderName>{item.sender}</LeftSenderName>
                <AfterBox key={index}>
                  <div>{item.message}</div>
                </AfterBox>
              </div>
            );
          }
        })}
        {viewMessages?.map((item, index) => {
          if (localStorage.getItem("wschat.nick") === item.sender) {
            return (
              <div>
                <RightSenderName>{item.sender}</RightSenderName>
                <BeforeBox key={index}>
                  <div>{item.message}</div>
                </BeforeBox>
              </div>
            );
          } else if (item.sender === "") {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "rgba(112, 101, 101, 0.5)",
                  borderRadius: "10px",
                  border: "none)",
                  color: "rgba(207, 207, 207, 0.8)",
                }}
              >
                {item.message}
              </div>
            );
          } else {
            return (
              <div>
                <LeftSenderName>{item.sender}</LeftSenderName>
                <AfterBox key={index}>
                  <div>{item.message}</div>
                </AfterBox>
              </div>
            );
          }
        })}
      </StTopBorder>
      <StBottomBorder>
        <div>
          <StTextarea>
            <textarea
              type="text"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </StTextarea>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              sendMessage();
              setMessage("");
            }}
          >
            전송
          </button>
        </div>
      </StBottomBorder>
    </StTopContainer>
  );
}

export default Chat;

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
  justify-content: center;
  align-items: center;

  background-color: rgb(190, 205, 222);
`;

const StTopBorder = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 500px;
  height: 35rem;

  border-bottom-style: solid;
  border-bottom-color: rgb(230, 230, 230);
  border-bottom-width: 1px;

  overflow-y: auto;
  overflow-x: hidden;

  gap: 10px;
`;

const StBottomBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;

  width: 500px;
  height: 10rem;

  background-color: white;

  button {
    align-items: flex-end;
    width: 5rem;
    height: 2.5rem;

    border: none;
    border-radius: 5px;
    background-color: rgb(242, 242, 242);
  }
`;

const StTextarea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  * {
    background-color: white;
    border: none;

    width: 496px;
    height: 6rem;
  }

  textarea:focus {
    outline: none;
  }
`;

const BeforeBox = styled.div`
  color: black;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    position: relative;
    background-color: rgb(251, 229, 77);
    border-radius: 0.4em;
    height: auto;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    max-width: calc(100% - 90px);
    padding: 10px;
  }

  div:after {
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-left-color: rgb(251, 229, 77);
    border-right: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-right: -20px;
  }
`;

const AfterBox = styled.div`
  color: black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    position: relative;
    background: #ffffff;
    border-radius: 0.4em;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    max-width: calc(100% - 90px);
    padding: 10px;
  }

  div:after {
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: #ffffff;
    border-left: 0;
    border-bottom: 0;
    margin-top: -10px;
    margin-left: -20px;
  }
`;

const RightSenderName = styled.div`
  float: right;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  margin-right: 0.5rem;
  width: fit-content;
  padding: 2px;
`;

const LeftSenderName = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  margin-left: 0.5rem;
  width: fit-content;
  padding: 2px;
`;
