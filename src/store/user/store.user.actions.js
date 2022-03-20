import { storeEnums } from "../store.enums"

export const setUserName = (name) => {
    return {
        payload: name,
        type: storeEnums.SetUserName,
    }
}

export const setUserError = (message) => {
    return {
        payload: message,
        type: storeEnums.SetUserError,
    }
}
