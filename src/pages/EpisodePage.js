import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { APIState } from "../enums/api.enums";

import { reqFindEpisodes, reqGetAllEpisodes } from "../store/episode/store.episode.thunk.actions";

function EpisodeBox(props) {
    const { episodeData } = props;

    return (
        <div>
            <p>{`${episodeData.id}: ${episodeData.name} | ${episodeData.episode}`}</p>
            <p>{`Released on ${episodeData.air_date}`}</p>
            <p>{`Features ${episodeData.characters.length} character(s)`}</p>
        </div>
    )
}

function EpisodeContainer(props) {
    const episodeError = useSelector(state => state.episode.error);

    const { episodesData } = props;

    if (episodesData && episodesData.data) {
        return episodesData.data.map((episodeResult, index) => {
            return (
                <div key={`episode-box-${index}`}>
                    <EpisodeBox episodeData={episodeResult}/>
                    <hr/>
                </div>
            );
        });
    } else {
        return <p>{episodeError}</p>;
    }
}

function EpisodeFinder() {
    const [ids, setIDs] = useState("");
    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const applicationState = useSelector(state => state.application);

    const dispatch = useDispatch();

    const handleButtonClick = () => {
        dispatch(reqFindEpisodes(ids, name, code));
    }

    const inputDisabled = applicationState.apiState === APIState.Fetching;

    return (
        <div>
            <div>
                <label htmlFor="episode-ids">ID: </label>
                <input
                    type="text"
                    id="episode-ids"
                    disabled={inputDisabled}
                    onChange={(e) => setIDs(e.currentTarget.value)}
                />
            </div>
            <div>
                <label htmlFor="episode-name">Name: </label>
                <input
                    type="text"
                    id="episode-name"
                    disabled={inputDisabled}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
            </div>
            <div>
                <label htmlFor="episode-code">Code: </label>
                <input
                    type="text"
                    id="episode-code"
                    disabled={inputDisabled}
                    onChange={(e) => setCode(e.currentTarget.value)}
                />
            </div>
            <div>
                <button
                    type="button"
                    disabled={inputDisabled}
                    onClick={handleButtonClick}
                >
                    Find Episodes
                </button>
            </div>
        </div>
    );
}

export function EpisodePage() {
    const episodeData = useSelector(state => state.episode.data);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reqGetAllEpisodes());
    }, [dispatch]);

    return (
        <div className="centered-block">
            <EpisodeFinder/>
            <hr/>
            <EpisodeContainer episodesData={episodeData}/>
        </div>
    );
}
