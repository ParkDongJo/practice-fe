import React, { useState } from "react";
import styled from "styled-components";

/*
You’re presented with a component called MessageFeed. This component has already been designed. Your task is to write the necessary logic to make it work as expected.

MessageFeed displays a feed box with past messages. Below the feed box, you can find an input element where the user can type in their message. Add the necessary code to append the user message to the existing message feed when the user presses Shift + Enter on their keyboard.

Directions
You don’t need to worry about styling your application as we have already done it for you. But if you wish to update the styles, you can use styled-components, inline style or tailwindcss.
Do not edit the data-testid attributes.
You only need to add the message submission logic.
Do not let users submit empty messages.
*/

const MessageFeed = () => {
  const [messages, setMessages] = useState([
    "The minute she landed she understood the reason this was a fly-over state.",
    "She thought there'd be sufficient time if she hid her watch.",
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setMessages([...messages, inputValue]);
      setInputValue("");
    }
  };

  return (
    <MessageFeedContainer>
      <MessageContainer data-testid="message-container">
        {messages.map((message, index) => (
          <Message data-testid="message" key={index}>
            {message}
          </Message>
        ))}
      </MessageContainer>
      <MessageInput
        data-testid="message-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message and press Shift + Enter to send"
      />
    </MessageFeedContainer>
  );
};

export default MessageFeed;

const MessageFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 80vh;
  margin-bottom: 10px;
`;

const Message = styled.div`
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const MessageInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  &:focus {
    border-color: #999;
  }
`;
