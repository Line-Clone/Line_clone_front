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
  const messages = [];
  const sender = localStorage.getItem("wschat.nick");
  const [message, setMessage] = useState("");
  const [viewMessages, setViewMessages] = useState([]);
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
    console.log("메세지 수신");
    messages.push({
      type: recv.type,
      sender: recv.type == "ENTER" ? "[알림]" : recv.sender,
      message: recv.message,
    });
    setViewMessages([...messages]);
  }

  function roomSubscribe() {
    ws.connect(
      {},
      function (frame) {
        ws.subscribe("/topic/chat/room/" + roomId, function (message) {
          var recv = JSON.parse(message.body);
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
            console.log("connection reconnect");
            SockJs = new SockJS("/ws/chat");
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
      <StBorder>
        <StChatBorder>
          {beforechat?.map((item, index) => {
            if (localStorage.getItem("wschat.nick") === item.sender) {
              return (
                <div style={writerBox} key={index}>
                  {item.sender} :{item.message}
                </div>
              );
            } else {
              return (
                <div key={index}>
                  {item.sender} :{item.message}
                </div>
              );
            }
          })}
          {viewMessages?.map((item, index) => {
            if (localStorage.getItem("wschat.nick") === item.sender) {
              return (
                <div style={writerBox} key={index}>
                  {item.sender} :{item.message}
                </div>
              );
            } else {
              return (
                <div key={index}>
                  {item.sender} :{item.message}
                </div>
              );
            }
          })}
        </StChatBorder>
        <hr></hr>
        <StBottomBorder>
          <div>
            <input
              type="text"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            ></input>
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
      </StBorder>
    </StTopContainer>
  );
}

export default Chat;

const StTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  gap: 50px;
`;

const StBorder = styled.div`
  border: 1px solid #484848;
  height: 600px;
  width: 800px;
`;

const StChatBorder = styled.div`
  height: 450px;
  width: 800px;
`;

const StBottomBorder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  height: 150px;
  width: 800px;
`;

const StText = styled.textarea`
  height: 100px;
  width: 650px;
`;

const writerBox = {
  color: "red",
};
