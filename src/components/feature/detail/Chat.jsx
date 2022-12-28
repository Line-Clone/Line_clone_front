import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../../../redux/modules/chatSlice";

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
      sender: recv.type == "ENTER" ? "[알림]" : recv.sender,
      message: recv.message,
    });
    setViewMessages(messages);
  }

  function roomSubscribe() {
    ws.connect(
      {},
      function (frame) {
        ws.subscribe(`/topic/chat/room/${rommId}`, function (response) {
          var recv = JSON.parse(response.body);
          recvMessage(recv);
          // messages.push(recv);
          // setViewMessages(messages);
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
      <StBorder>
        <StChatBorder>
          {viewMessages?.map((item) => {
            if (localStorage.getItem("wschat.nick") === item.sender) {
              return (
                <div style={writerBox}>
                  {item.sender} :{item.message}
                </div>
              );
            } else {
              return (
                <div>
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
