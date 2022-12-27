import React, { useEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { useParams } from "react-router-dom";

function Chat() {
  const SockJs = new SockJS("http://sangt.shop/ws/chat");
  const ws = Stomp.over(SockJs);
  const reconnect = 0;
  const param = useParams();
  const rommId = param.id;
  const sender = localStorage.getItem("wschat.nick");
  function roomSubscribe() {
    ws.connect(
      {},
      function (frame) {
        ws.subscribe(`/topic/chat/room/${rommId}`, function (response) {
          const recv = JSON.parse(response.body);
          console.log(recv);
        });
        ws.send(
          "ws://sangt.shop/app/chat/message",
          {},
          JSON.stringify({
            type: "ENTER",
            roomId: rommId,
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
    roomSubscribe();
  }, []);
  return (
    <StTopContainer>
      <StBorder>
        <StChatBorder></StChatBorder>
        <hr></hr>
        <StBottomBorder>
          <div>
            <StText></StText>
          </div>
          <div>
            <button>전송</button>
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
