import { INIT_STATE } from '../../constant';
import { getUsers, getType, createUser, updateUser } from '../actions';

export default function usersReducers(state = INIT_STATE.users, action) {
  switch (action.type) {
    case getType(getUsers.getUsersRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getUsers.getUsersSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getUsers.getUsersFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createUser.createUserSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updateUser.updateUserSuccess):
      return {
        ...state,
        data: state.data.map((user) =>
        user._id === action.payload._id ? action.payload : user
        ),
      };
    default:
      return state;
  }
}
