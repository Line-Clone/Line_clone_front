import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Chat() {
  let SockJs = new SockJS("http://sangt.shop/ws/chat");
  let ws = Stomp.over(SockJs);
  let reconnect = 0;
  const param = useParams();
  const roomId = param.id;
  const sender = localStorage.getItem("wschat.nick");
  const [message, setMessage] = useState("");
  const messages = [];
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
      sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
      message: recv.message,
    });
    setViewMessages(messages);
  }

  function roomSubscribe() {
    ws.connect(
      {},
      function (frame) {
        ws.subscribe(`/topic/chat/room/${roomId}`, function (response) {
          var recv = JSON.parse(response.body);
          recvMessage(recv);
          messages.push(recv);
          setViewMessages(messages);
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
  //   console.log("msgs", messages);

  useEffect(() => {
    roomSubscribe();
  }, []);

  // useEffect(() => {
  //   dispatch(getChat(roomId));
  // }, []);

  return (
    <StTopContainer>
      <StTopBorder>
        {viewMessages?.map((item) => {
          if (localStorage.getItem("wschat.nick") === item.sender) {
            return (
              <WriterBox>
                {item.sender} :{item.message}
              </WriterBox>
            );
          } else {
            return (
              <WriterBox>
                {item.sender} :{item.message}
              </WriterBox>
            );
          }
        })}
      </StTopBorder>
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
  align-items: center;
  text-align: center;
`;

const StTopBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: 35rem;

  border: 1px solid red;
`;

const StBottomBorder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 500px;
  height: 10rem;

  gap: 20px;
`;

const WriterBox = styled.div`
  color: black;
`;
