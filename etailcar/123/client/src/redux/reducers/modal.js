import { INIT_STATE } from '../../constant';
import { getType, hideModal_Post, hideModal_User,hideModal_Car, showModal_Post, showModal_User, showModal_Car } from '../actions';

export default function modalReducers(state = INIT_STATE.modal, action) {
  switch (action.type) {
    case getType(showModal_Post):
      return {
        isShow: true,
      };
    case getType(hideModal_Post):
      return {
        isShow: false,
      };
    case getType(showModal_User):
      return {
        isShow: true,
      };
    case getType(hideModal_User):
      return {
        isShow: false,
      };
    case getType(showModal_Car):
        return {
          isShow: true,
        };
    case getType(hideModal_Car):
        return {
          isShow: false,
        };
    default:
      return state;
  }
}
