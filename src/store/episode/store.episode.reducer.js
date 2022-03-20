import { storeEnums } from "../store.enums";

const initialState = {
    data: null,
    error: null,
};

export const episodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case storeEnums.SetEpisodesData:
            return {
                ...state,
                data: action.payload,
            };
        case storeEnums.SetEpisodesError:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
