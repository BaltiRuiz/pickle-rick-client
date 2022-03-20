import { storeEnums } from "../store.enums";

const initialState = {
    data: null,
    error: null,
};

export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case storeEnums.SetLocationsData:
            return {
                ...state,
                data: action.payload,
            };
        case storeEnums.SetLocationsError:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
