import { storeEnums } from "../store.enums";

const initialState = {
    name: null,
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case storeEnums.SetUserName:
            return {
                ...state,
                name: action.payload,
            };
        case storeEnums.SetUserError:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
