import { SAVE_MY_PROFILE, LOGOUT_MY_PROFILE } from "../action";

const initialState = {
  myProfile: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MY_PROFILE:
      return { ...state, myProfile: action.payload };
    case LOGOUT_MY_PROFILE:
      return { ...state, myProfile: action.payload };
    default:
      return state;
  }
};

export default appReducer;
