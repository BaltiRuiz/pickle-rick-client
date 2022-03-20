import { Resources } from "../../enums/resources.enums";
import { APIState } from "../../enums/api.enums";
import { fetchResources } from "../../businesslogic/resource.business-logic";
import { setLocationsData, setLocationsError } from "./store.location.actions";
import { setAPIState } from "../application/store.application.actions";

export const reqFindLocations = (ids, name, type, dimension) => async (dispatch) => {
    try {
        dispatch(setAPIState(APIState.Fetching));

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
    } finally {
        dispatch(setAPIState(APIState.Fetched));
    }
}

export const reqGetAllLocations = () => async (dispatch) => {
    try {
        dispatch(setAPIState(APIState.Fetching));

        const allLocations = await fetchResources(Resources.Location);

        dispatch(setLocationsData(allLocations));
        dispatch(setLocationsError(null));
    } catch (error) {
        dispatch(setLocationsData(null));
        dispatch(setLocationsError(error.response.data.message));
    } finally {
        dispatch(setAPIState(APIState.Fetched));
    }
};
