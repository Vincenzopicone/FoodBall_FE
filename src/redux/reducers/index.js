import {
  SAVE_MY_PROFILE,
  LOGOUT_MY_PROFILE,
  SAVE_MY_RESERVATION,
} from "../action";

const initialState = {
  myProfile: {},
  myReservation: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MY_PROFILE:
      return { ...state, myProfile: action.payload };
    case LOGOUT_MY_PROFILE:
      return { ...state, myProfile: action.payload };
    case SAVE_MY_RESERVATION:
      return { ...state, myReservation: action.payload };
    default:
      return state;
  }
};

export default appReducer;
