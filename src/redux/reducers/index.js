const initialState = {};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ciao":
            return {...state}
        default:
            return state;
    }

}

export default appReducer;