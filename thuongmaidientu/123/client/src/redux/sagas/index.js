import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchPostsSaga(action) {
  try {
    const posts = yield call(api.fetchPosts);
    yield put(actions.getPosts.getPostsSuccess(posts.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getPosts.getPostsFailure(err));
  }
}

function* createPostSaga(action) {
  try {
    const post = yield call(api.createPost, action.payload);
    yield put(actions.createPost.createPostSuccess(post.data));
  } catch (err) {
    console.error(err);
    yield put(actions.createPost.createPostFailure(err));
  }
}

function* updatePostSaga(action) {
  try {
    const updatedPost = yield call(api.updatePost, action.payload);
    yield put(actions.updatePost.updatePostSuccess(updatedPost.data));
  } catch (err) {
    console.error(err);
    yield put(actions.updatePost.updatePostFailure(err));
  }
}

// User fetch

function* fetchUsersSaga(action) {
  try {
    const users = yield call(api.fetchUsers);
    yield put(actions.getUsers.getUsersSuccess(users.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getUsers.getUsersFailure(err));
  }
}

function* createUserSaga(action) {
  try {
    const user = yield call(api.createUser, action.payload);
    yield put(actions.createUser.createUserSuccess(user.data));
  } catch (err) {
    console.error(err);
    yield put(actions.createUser.createUserFailure(err));
  }
}

function* updateUserSaga(action) {
  try {
    const updatedUsers = yield call(api.updateUser, action.payload);
    yield put(actions.updateUser.updateUserSuccess(updatedUsers.data));
  } catch (err) {
    console.error(err);
    yield put(actions.updateUser.updateUserFailure(err));
  }
}

//Car fetch

function* fetchCarsSaga(action) {
  try {
    const cars = yield call(api.fetchCars);
    yield put(actions.getCars.getCarsSuccess(cars.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getCars.getCarsFailure(err));
  }
}

function* createCarSaga(action) {
  try {
    const car = yield call(api.createCar, action.payload);
    yield put(actions.createCar.createCarSuccess(car.data));
  } catch (err) {
    console.error(err);
    yield put(actions.createCar.createCarFailure(err));
  }
}

function* updateCarSaga(action) {
  try {
    const updatedCars = yield call(api.updateCar, action.payload);
    yield put(actions.updateCar.updateCarSuccess(updatedCars.data));
  } catch (err) {
    console.error(err);
    yield put(actions.updateCar.updateCarFailure(err));
  }
}

//
function* mySaga() {
  yield takeLatest(actions.getUsers.getUsersRequest, fetchUsersSaga);
  yield takeLatest(actions.createUser.createUserRequest, createUserSaga);
  yield takeLatest(actions.updateUser.updateUserRequest, updateUserSaga);

  yield takeLatest(actions.getCars.getCarsRequest, fetchCarsSaga);
  yield takeLatest(actions.createCar.createCarRequest, createCarSaga);
  yield takeLatest(actions.updateCar.updateCarRequest, updateCarSaga);

  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
}

// generator function ES6

export default mySaga;
