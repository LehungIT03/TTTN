import { INIT_STATE } from '../../constant';
import { getCars, getType, createCar, updateCar } from '../actions';

export default function carsReducers(state = INIT_STATE.cars, action) {
  switch (action.type) {
    case getType(getCars.getCarsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getCars.getCarsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getCars.getCarsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createCar.createCarSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updateCar.updateCarSuccess):
      return {
        ...state,
        data: state.data.map((car) =>
        car._id === action.payload._id ? action.payload : car
        ),
      };
    default:
      return state;
  }
}
