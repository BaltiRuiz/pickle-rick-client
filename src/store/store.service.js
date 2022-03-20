import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { userReducer } from "./user/store.user.reducer";
import { characterReducer } from "./character/store.character.reducer";
import { episodeReducer } from "./episode/store.episode.reducer";
import { locationReducer } from "./location/store.location.reducer";

const storeReducers = combineReducers(
    {
        user: userReducer,
        character: characterReducer,
        episode: episodeReducer,
        location: locationReducer,
    }
);

export const store = createStore(
    storeReducers,
    applyMiddleware(thunk),
);
