import React from "react";
import styled from "styled-components";

function Chat() {
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
