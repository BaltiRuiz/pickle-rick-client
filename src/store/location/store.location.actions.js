import { storeEnums } from "../store.enums"

export const setLocationsData = (data) => {
    return {
        payload: data,
        type: storeEnums.SetLocationsData,
    }
}

export const setLocationsError = (message) => {
    return {
        payload: message,
        type: storeEnums.SetLocationsError,
    }
}
