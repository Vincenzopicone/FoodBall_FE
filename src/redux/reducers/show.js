import { SHOW_RESERVATION, SHOW_CREATE_RESERVATION } from "../action";
const initialState = {
  showReservation: false,
  shoeCreateReservation: false,
};

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_RESERVATION:
      return { ...state, showReservation: action.payload };
    case SHOW_CREATE_RESERVATION:
      return { ...state, showCreateReservation: action.payload };
    default:
      return state;
  }
};

export default showReducer;
