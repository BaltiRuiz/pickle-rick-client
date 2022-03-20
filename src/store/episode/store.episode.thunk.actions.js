import { Resources } from "../../enums/resources.enums";
import { fetchResources } from "../../businesslogic/resource.business-logic";
import { setEpisodesData, setEpisodesError } from "./store.episode.actions";

export const reqFindEpisodes = (ids, name, code) => async (dispatch) => {
    try {
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
    }
}

export const reqGetAllEpisodes = () => async (dispatch) => {
    try {
        const allEpisodes = await fetchResources(Resources.Episode);

        dispatch(setEpisodesData(allEpisodes));
        dispatch(setEpisodesError(null));
    } catch (error) {
        dispatch(setEpisodesData(null));
        dispatch(setEpisodesError(error.response.data.message));
    }
};
