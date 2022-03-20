import { storeEnums } from "../store.enums"

export const setEpisodesData = (data) => {
    return {
        payload: data,
        type: storeEnums.SetEpisodesData,
    }
}

export const setEpisodesError = (message) => {
    return {
        payload: message,
        type: storeEnums.SetEpisodesError,
    }
}
