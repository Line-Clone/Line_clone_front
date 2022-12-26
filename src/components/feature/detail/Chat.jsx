import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

function Chat() {
  let sockJS = new SockJS("/ws/chat");
  let stompClient = Stomp.over(sockJS);

  const initialState = {
    roomId: "",
    room: {},
    sender: "",
    message: "",
    messages: [],
  };

  const [username, setUsername] = useState();
  const [content, setContent] = useState();
  const [nickname, setNickname] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/roomId", (data) => {
        const newMessage = JSON.parse(data.body);
        addMessage(newMessage);
      });
    });
  }, [content]);

  const handleEnter = (nickname, content) => {
    const newMessage = { nickname, content };
    stompClient.send("/hello", {}, JSON.stringify(newMessage));
    setMessage("");
  };

  const addMessage = (message) => {
    setContent((prev) => [...prev, message]);
  };

  return <div>엉엉엉</div>;
}

export default Chat;

// ws는 (TCP, UCP가 양방향 프로토콜의 이름인데 웹소켓은 TCP를 사용하는 프로토콜의 이름)

// 라이브러리 사용 시 공식 문서를 먼저 봐라 -> 공식 문서의 예제 코드를 보자 (sockJs)
// 라이브러리 이름 + 프레임워크 이름을 붙여서 검색
// 채팅에서 중요한 개념 - subscribe (해당 채팅방에서만 보낼 수 있어야 한다. 통신 연결 시점을 잘 잡아야 하는데, 채팅방에 들어와서부터 구독을 해야한다)
// 웹에서 구독은 데이터를 가져와서 사용하는 것.
// 서버가 가진 내용을 구독한다 = 서버가 가진 채팅 데이터를 가져온다.
// vue에서 순서를 보고 어떤 기능을 썼는지만 보고, 리액트 예제 코드를 더 잘 봐라
// useSelector도 스토어를 구독하고 있다 - 데이터를 가져와서 사용한다
