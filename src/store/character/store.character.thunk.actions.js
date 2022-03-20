import { Resources } from "../../enums/resources.enums";
import { APIState } from "../../enums/api.enums";
import { fetchResources } from "../../businesslogic/resource.business-logic";
import { markOrRemoveResourceAsFavourite } from "../../businesslogic/resource.business-logic";
import { setCharactersData, setCharactersError } from "./store.character.actions";
import { setAPIState } from "../application/store.application.actions";

export const reqFindCharacters = (ids, name, status, species, type, gender) => async (dispatch) => {
    try {
        dispatch(setAPIState(APIState.Fetching));

        const characters = await fetchResources(
            Resources.Character,
            ids,
            {
                name,
                status,
                species,
                type,
                gender,
            },
        );

        dispatch(setCharactersData(characters));
        dispatch(setCharactersError(null));
    } catch (error) {
        dispatch(setCharactersData(null));
        dispatch(setCharactersError(error.response.data.message));
    } finally {
        dispatch(setAPIState(APIState.Fetched));
    }
}

export const reqGetAllCharacters = () => async (dispatch) => {
    try {
        dispatch(setAPIState(APIState.Fetching));

        const allCharacters = await fetchResources(Resources.Character);

        dispatch(setCharactersData(allCharacters));
        dispatch(setCharactersError(null));
    } catch (error) {
        dispatch(setCharactersData(null));
        dispatch(setCharactersError(error.response.data.message));
    } finally {
        dispatch(setAPIState(APIState.Fetched));
    }
};

export const reqMarkOrRemoveCharacterAsFavourite = (characterID, currentStatus) => async (dispatch, getState) => {
    try {
        dispatch(setAPIState(APIState.Fetching));

        const charactersState = { ...getState().character.data };

        await markOrRemoveResourceAsFavourite(Resources.Character, characterID);

        const editedCharacterIndex = charactersState.data.findIndex(character => character.id === characterID);

        charactersState.data[editedCharacterIndex].favourite = !currentStatus;

        dispatch(setCharactersData(charactersState));
        dispatch(setCharactersError(null));
    } catch (error) {
        dispatch(setCharactersData(null));
        dispatch(setCharactersError(error.response.data));
    } finally {
        dispatch(setAPIState(APIState.Fetched));
    }
}
