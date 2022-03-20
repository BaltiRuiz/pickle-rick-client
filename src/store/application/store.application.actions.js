import { storeEnums } from "../store.enums"

export const setAPIState = (state) => {
    return {
        payload: state,
        type: storeEnums.SetAPIState,
    }
}
