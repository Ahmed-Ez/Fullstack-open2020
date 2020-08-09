import blogsServices from '../services/blogs';
import { setAlert } from './alertsReducer';
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_STATE': {
      return action.data;
    }
    case 'ADD_BLOG': {
      return [...state, action.data];
    }
    case 'LIKE_BLOG': {
      const blog = state.find((blog) => blog.id === action.data);
      const newBlog = { ...blog, likes: blog.likes + 1 };
      return state.map((blog) => (blog.id === action.data ? newBlog : blog));
    }
    case 'DELETE_BLOG': {
      return state.filter((blog) => blog.id !== action.data);
    }
    default:
      return state;
  }
};

export const initState = () => {
  return async (dispatch) => {
    const res = await blogsServices.getAll();
    dispatch({ type: 'INIT_STATE', data: res.data });
  };
};

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const res = await blogsServices.createBlog(blog);
      dispatch({
        type: 'ADD_BLOG',
        data: res.data,
      });
      dispatch(setAlert({ text: 'Blog addes successfully', type: 'success' }));
    } catch (error) {
      dispatch(setAlert({ text: 'please provide all values', type: 'error' }));
    }
  };
};

export const likeBlog = (id, likes) => {
  return async (dispatch) => {
    await blogsServices.likeBlog(id, likes);
    dispatch({
      type: 'LIKE_BLOG',
      data: id,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogsServices.deleteBlog(id);
      dispatch({
        type: 'DELETE_BLOG',
        data: id,
      });
      dispatch(
        setAlert({ text: 'blog deleted successfully', type: 'success' })
      );
    } catch (error) {
      dispatch(setAlert({ text: 'Blog is already deleted', type: 'error' }));
    }
  };
};

export default reducer;
