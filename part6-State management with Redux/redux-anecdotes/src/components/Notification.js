import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return props.notification ? (
    <div style={style}>{props.notification}</div>
  ) : null;
};

const mapStateToProps = (state) => {
  return { notification: state.notifications };
};
const connectedNotification = connect(mapStateToProps)(Notification);
export default connectedNotification;