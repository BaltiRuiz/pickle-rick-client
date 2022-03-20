import { APIState } from "../../enums/api.enums";
import { storeEnums } from "../store.enums";

const initialState = {
    apiState: APIState.Idle
};

export const applicationReducer = (state = initialState, action) => {
    switch (action.type) {
        case storeEnums.SetAPIState:
            return {
                ...state,
                apiState: action.payload,
            };
        default:
            return state;
    }
}
