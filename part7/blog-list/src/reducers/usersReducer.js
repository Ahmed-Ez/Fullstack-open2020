import usersServices from '../services/users';
import { setAlert } from './alertsReducer';
const reducer = (state = { loggedUser: null, users: [] }, action) => {
  switch (action.type) {
    case 'INITUSERS': {
      return { ...state, users: action.data };
    }
    case 'LOGIN': {
      return { ...state, loggedUser: action.data };
    }
    case 'LOGOUT': {
      return { ...state, loggedUser: null };
    }
    default:
      return state;
  }
};

export const initUsers = () => {
  return async (dispatch) => {
    const res = await usersServices.getAll();
    dispatch({
      type: 'INITUSERS',
      data: res.data,
    });
  };
};

export const login = (user, password) => {
  return async (dispatch) => {
    try {
      const res = await usersServices.login(user, password);
      window.localStorage.setItem('blog-key', JSON.stringify(res.data));
      dispatch({
        type: 'LOGIN',
        data: res.data,
      });
      dispatch(setAlert({ text: 'Logged in successfully !', type: 'success' }));
    } catch (error) {
      dispatch(
        setAlert({ text: 'invalid username or password', type: 'error' })
      );
    }
  };
};

export const logout = () => {
  window.localStorage.removeItem('blog-key');
  return {
    type: 'LOGOUT',
  };
};

export const setUser = (user) => {
  return {
    type: 'LOGIN',
    data: user,
  };
};

export default reducer;
