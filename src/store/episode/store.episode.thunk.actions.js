import { Resources } from "../../enums/resources.enums";
import { APIState } from "../../enums/api.enums";
import { fetchResources } from "../../businesslogic/resource.business-logic";
import { setEpisodesData, setEpisodesError } from "./store.episode.actions";
import { setAPIState } from "../application/store.application.actions";

export const reqFindEpisodes = (ids, name, code) => async (dispatch) => {
    try {
        dispatch(setAPIState(APIState.Fetching));

        const episodes = await fetchResources(
            Resources.Episode,
            ids,
            {
                name,
                episode: code,
            },
        );

        dispatch(setEpisodesData(episodes));
        dispatch(setEpisodesError(null));
    } catch (error) {
        dispatch(setEpisodesData(null));
        dispatch(setEpisodesError(error.response.data.message));
    } finally {
        dispatch(setAPIState(APIState.Fetched));
    }
}

export const reqGetAllEpisodes = () => async (dispatch) => {
    try {
        dispatch(setAPIState(APIState.Fetching));

        const allEpisodes = await fetchResources(Resources.Episode);

        dispatch(setEpisodesData(allEpisodes));
        dispatch(setEpisodesError(null));
    } catch (error) {
        dispatch(setEpisodesData(null));
        dispatch(setEpisodesError(error.response.data.message));
    } finally {
        dispatch(setAPIState(APIState.Fetched));
    }
};
