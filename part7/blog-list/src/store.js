import { createStore, combineReducers, applyMiddleware } from 'redux';
import blogsReducer from './reducers/blogsReducer';
import alertsReducer from './reducers/alertsReducer';
import usersReducer from './reducers/usersReducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  blogs: blogsReducer,
  alert: alertsReducer,
  users: usersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
