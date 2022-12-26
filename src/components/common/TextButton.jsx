import React from "react";
import styled from "styled-components";

const TextClick = styled.button`
  border: none;
  text-decoration: underline;
  font-size: ${(props) => props.fontSize || "13px"};
  background-color: transparent;
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  cursor: pointer;
  color: white;
  padding: 5px;
`;

function TextButton({ width, height, children, fontsize, onClick, margin }) {
  return (
    <TextClick
      width={width}
      height={height}
      fontsize={fontsize}
      onClick={onClick}
      margin={margin}
    >
      <span>{children}</span>
    </TextClick>
  );
}

export default TextButton;
