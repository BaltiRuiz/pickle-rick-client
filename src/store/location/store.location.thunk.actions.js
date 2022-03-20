import { Resources } from "../../enums/resources.enums";
import { fetchResources } from "../../businesslogic/resource.business-logic";
import { setLocationsData, setLocationsError } from "./store.location.actions";

export const reqFindLocations = (ids, name, type, dimension) => async (dispatch) => {
    try {
        const locations = await fetchResources(
            Resources.Location,
            ids,
            {
                name,
                type,
                dimension,
            },
        );

        dispatch(setLocationsData(locations));
        dispatch(setLocationsError(null));
    } catch (error) {
        dispatch(setLocationsData(null));
        dispatch(setLocationsError(error.response.data.message));
    }
}

export const reqGetAllLocations = () => async (dispatch) => {
    try {
        const allLocations = await fetchResources(Resources.Location);

        dispatch(setLocationsData(allLocations));
        dispatch(setLocationsError(null));
    } catch (error) {
        dispatch(setLocationsData(null));
        dispatch(setLocationsError(error.response.data.message));
    }
};
