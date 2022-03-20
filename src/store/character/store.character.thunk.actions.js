import { Resources } from "../../enums/resources.enums";
import { fetchResources } from "../../businesslogic/resource.business-logic";
import { markOrRemoveResourceAsFavourite } from "../../businesslogic/resource.business-logic";
import { setCharactersData, setCharactersError } from "./store.character.actions";

export const reqFindCharacters = (ids, name, status, species, type, gender) => async (dispatch) => {
    try {
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
    }
}

export const reqGetAllCharacters = () => async (dispatch) => {
    try {
        const allCharacters = await fetchResources(Resources.Character);

        dispatch(setCharactersData(allCharacters));
        dispatch(setCharactersError(null));
    } catch (error) {
        dispatch(setCharactersData(null));
        dispatch(setCharactersError(error.response.data.message));
    }
};

export const reqMarkOrRemoveCharacterAsFavourite = (characterID, currentStatus) => async (dispatch, getState) => {
    try {
        const charactersState = { ...getState().character.data };

        await markOrRemoveResourceAsFavourite(Resources.Character, characterID);

        const editedCharacterIndex = charactersState.data.findIndex(character => character.id === characterID);

        charactersState.data[editedCharacterIndex].favourite = !currentStatus;

        dispatch(setCharactersData(charactersState));
        dispatch(setCharactersError(null));
    } catch (error) {
        dispatch(setCharactersData(null));
        dispatch(setCharactersError(error.response.data));
    }
}
