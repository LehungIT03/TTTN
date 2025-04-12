import { combineReducers } from 'redux';
import posts from './posts';
import users from './users';
import cars from './cars';
import modal from './modal';

export default combineReducers({
  posts,
  users,
  cars,
  modal,
});
