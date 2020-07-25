import React from 'react';

const Message = ({ message }) => {
  if (!message) return null;

  return <div className={`${message.type} message`}>{message.text}</div>;
};

export default Message;
