import React from 'react';

const Alert = ({ alert }) => {
  return (
    <div>
      <p className={`${alert.type} message`}> {alert.text}</p>
    </div>
  );
};

export default Alert;
