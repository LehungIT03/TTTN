import { createActions, createAction } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};
//
export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (err) => err,
});

export const createPost = createActions({
  createPostRequest: (payload) => payload,
  createPostSuccess: (payload) => payload,
  createPostFailure: (err) => err,
});

export const updatePost = createActions({
  updatePostRequest: (payload) => payload,
  updatePostSuccess: (payload) => payload,
  updatePostFailure: (err) => err,
});

//User



export const createUser = createActions({
  createUserRequest: (payload) => payload,
  createUserSuccess: (payload) => payload,
  createUserFailure: (err) => err,
});

export const updateUser = createActions({
  updateUserRequest: (payload) => payload,
  updateUserSuccess: (payload) => payload,
  updateUserFailure: (err) => err,
});

export const getUsers = createActions({
  getUsersRequest: undefined,
  getUsersSuccess: (payload) => payload,
  getUsersFailure: (err) => err,
});

//Car
export const getCars = createActions({
  getCarsRequest: undefined,
  getCarsSuccess: (payload) => payload,
  getCarsFailure: (err) => err,
});

export const createCar = createActions({
  createCarRequest: (payload) => payload,
  createCarSuccess: (payload) => payload,
  createCarFailure: (err) => err,
});

export const updateCar = createActions({
  updateCarRequest: (payload) => payload,
  updateCarSuccess: (payload) => payload,
  updateCarFailure: (err) => err,
});

export const showModal_Post = createAction('SHOW_CREATE_POST_MODAL');
export const hideModal_Post = createAction('HIDE_CREATE_POST_MODAL');

export const showModal_User = createAction('SHOW_CREATE_USER_MODAL');
export const hideModal_User = createAction('HIDE_CREATE_USER_MODAL');


export const showModal_Car = createAction('SHOW_CREATE_CAR_MODAL');
export const hideModal_Car = createAction('HIDE_CREATE_CAR_MODAL');

/*
  getType(getPosts.getPostSuccess)
  =>  
  {
    type: 'getPostSuccess',
    payload: {
      name: 'Test'
    }
  }
*/
