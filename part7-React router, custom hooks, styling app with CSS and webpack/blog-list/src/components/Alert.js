import React from 'react';
import { Alert as BootAlert } from 'react-bootstrap';

const Alert = ({ alert }) => {
  return (
    <div>
      <BootAlert variant={alert.type}>{alert.text}</BootAlert>
    </div>
  );
};

export default Alert;
