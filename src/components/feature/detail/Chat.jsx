import React from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

function Chat() {
  const sock = new SockJS("/ws/chat");
  const stomp = Stomp.over(sock);
  return <div>아아아</div>;
}

export default Chat;
