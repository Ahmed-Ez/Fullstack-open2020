const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ALERT': {
      return { text: action.data.text, type: action.data.type };
    }
    case 'CLEAR_ALERT': {
      return null;
    }
    default:
      return state;
  }
};

let timeOutId;

export const setAlert = ({ text, type }) => {
  return async (dispatch) => {
    clearTimeout(timeOutId);
    dispatch({
      type: 'SET_ALERT',
      data: {
        text,
        type,
      },
    });
    timeOutId = setTimeout(() => dispatch({ type: 'CLEAR_ALERT' }), 5000);
  };
};
export default reducer;
