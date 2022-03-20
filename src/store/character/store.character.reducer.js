import { storeEnums } from "../store.enums";

const initialState = {
    data: null,
    error: null,
};

export const characterReducer = (state = initialState, action) => {
    switch (action.type) {
        case storeEnums.SetCharactersData:
            return {
                ...state,
                data: action.payload,
            };
        case storeEnums.SetCharactersError:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
