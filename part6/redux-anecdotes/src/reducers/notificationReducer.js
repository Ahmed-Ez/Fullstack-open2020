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

let timeOutId;

export const addNotification = (notification, timeOut) => {
  return async (dispatch) => {
    console.log(timeOutId);
    clearTimeout(timeOutId);
    dispatch({ type: 'ADD_NOTIFICATION', data: notification });
    timeOutId = setTimeout(
      () => dispatch({ type: 'CLEAR_NOTIFICATION' }),
      timeOut * 1000
    );
  };
};

export default reducer;
