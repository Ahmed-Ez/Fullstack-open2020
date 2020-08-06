const reducer = (state = null, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return (state = action.data);

    case 'CLEAR_NOTIFICATION':
      return null;

    default:
      return state;
  }
};

export const addNotification = (notification, timeOut) => {
  return async (dispatch) => {
    dispatch({ type: 'ADD_NOTIFICATION', data: notification });
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), timeOut * 1000);
  };
};

export default reducer;
