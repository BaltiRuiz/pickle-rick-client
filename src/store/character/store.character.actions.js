import { storeEnums } from "../store.enums"

export const setCharactersData = (data) => {
    return {
        payload: data,
        type: storeEnums.SetCharactersData,
    }
}

export const setCharactersError = (message) => {
    return {
        payload: message,
        type: storeEnums.SetCharactersError,
    }
}
