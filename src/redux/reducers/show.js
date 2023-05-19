import {
  SHOW_RESERVATION,
  SHOW_CREATE_RESERVATION,
  SHOW_CARD_EVENT,
  REFRESH_RESERVATION,
  SHOW_PERSONALPAGE,
  SHOW_CREATE_EVENT,
  SHOW_EVENT_ADMIN,
} from "../action";
const initialState = {
  showReservation: false,
  showCreateReservation: true,
  showCardEvent: false,
  refreshReservation: false,
  showPersonalPage: false,
  showEventAdmin: true,
  showCreateEventAdmin: false,
};

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_RESERVATION:
      return { ...state, showReservation: action.payload };
    case SHOW_CREATE_RESERVATION:
      return { ...state, showCreateReservation: action.payload };
    case SHOW_CARD_EVENT:
      return { ...state, showCardEvent: action.payload };
    case REFRESH_RESERVATION:
      return { ...state, refreshReservation: action.payload };
    case SHOW_PERSONALPAGE:
      return { ...state, showPersonalPage: action.payload };
    case SHOW_EVENT_ADMIN:
      return { ...state, showEventAdmin: action.payload };
    case SHOW_CREATE_EVENT:
      return { ...state, showCreateEventAdmin: action.payload };
    default:
      return state;
  }
};

export default showReducer;
