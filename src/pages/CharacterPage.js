import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAPIStateFetching } from "../App";

import { CharacterGender, CharacterStatus } from "../enums/character.enums";
import { reqFindCharacters, reqGetAllCharacters, reqMarkOrRemoveCharacterAsFavourite } from "../store/character/store.character.thunk.actions";

function CharacterBox(props) {
    const { characterData } = props;

    const dispatch = useDispatch();

    const isAPIFetching = useAPIStateFetching();

    const handleFavouriteClick = () => {
        dispatch(reqMarkOrRemoveCharacterAsFavourite(characterData.id, characterData.favourite));
    }

    return (
        <div>
            <div className="row-block">
                <div className="row-block-element">
                    <img id="favourite-icon" src={characterData.image} alt={`character-${characterData.id}`}/>
                </div>
                <div className="row-block-element">
                    <p className="bold-element">
                        {`${characterData.id}: ${characterData.name}`}
                        <span className="inline-element">
                            <input
                                type="image"
                                src={characterData.favourite ? "favourite.png" : "notfavourite.png"}
                                alt="favourite-icon"
                                disabled={isAPIFetching}
                                onClick={handleFavouriteClick}
                            />
                        </span>
                    </p>
                    <p>{`${characterData.status} - ${characterData.species} - ${characterData.gender}`}</p>
                    <p>{`Origin: ${characterData.origin.name}`}</p>
                    <p>{`Appears in ${characterData.episode.length} episode(s)`}</p>
                    <p>{`Last known location: ${characterData.location.name}`}</p>
                </div>
            </div>
        </div>
    );
}

function CharacterContainer(props) {
    const characterError = useSelector(state => state.character.error);

    const { charactersData } = props;

    if (charactersData && charactersData.data) {
        return charactersData.data.map((characterResult, index) => {
            return (
                <div key={`character-box-${index}`}>
                    <CharacterBox characterData={characterResult}/>
                    <hr/>
                </div>
            );
        });
    } else {
        return <p>{characterError}</p>;
    }
}

function CharacterFinder() {
    const [ids, setIDs] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [species, setSpecies] = useState("");
    const [type, setType] = useState("");
    const [gender, setGender] = useState("");

    const dispatch = useDispatch();

    const handleButtonClick = () => {
        dispatch(reqFindCharacters(ids, name, status, species, type, gender));
    }

    const isAPIFetching = useAPIStateFetching();

    return (
        <div>
            <div>
                <label htmlFor="character-ids">ID: </label>
                <input
                    type="text"
                    id="character-ids"
                    disabled={isAPIFetching}
                    onChange={(e) => setIDs(e.currentTarget.value)}
                />
            </div>
            <div>
                <label htmlFor="character-name">Name: </label>
                <input
                    type="text"
                    id="character-name"
                    disabled={isAPIFetching}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
            </div>
            <div>
                <label htmlFor="character-status">Status: </label>
                <select
                    id="character-status"
                    value={status}
                    disabled={isAPIFetching}
                    onChange={(e) => setStatus(e.currentTarget.value)}
                >
                    <option key="character-status-0" value="">Do not search</option>
                    {Object.keys(CharacterStatus).map((statusValue, index) =>
                        <option key={`character-status-${index + 1}`} value={CharacterStatus[statusValue]}>{statusValue}</option>
                    )}
                </select>
            </div>
            <div>
                <label htmlFor="character-species">Species: </label>
                <input
                    type="text"
                    id="character-species"
                    disabled={isAPIFetching}
                    onChange={(e) => setSpecies(e.currentTarget.value)}
                />
            </div>
            <div>
                <label htmlFor="character-type">Type: </label>
                <input
                    type="text"
                    id="character-type"
                    disabled={isAPIFetching}
                    onChange={(e) => setType(e.currentTarget.value)}
                />
            </div>
            <div>
                <label htmlFor="character-gender">Gender: </label>
                <select
                    id="character-gender"
                    value={gender}
                    disabled={isAPIFetching}
                    onChange={(e) => setGender(e.currentTarget.value)}
                >
                    <option key="character-gender-0" value="">Do not search</option>
                    {Object.keys(CharacterGender).map((genderValue, index) =>
                        <option key={`character-gender-${index + 1}`} value={CharacterGender[genderValue]}>{genderValue}</option>
                    )}
                </select>
            </div>
            <div>
                <button
                    type="button"
                    disabled={isAPIFetching}
                    onClick={handleButtonClick}
                >
                    Find Characters
                </button>
            </div>
        </div>
    );
}

export function CharacterPage() {
    const characterData = useSelector(state => state.character.data);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reqGetAllCharacters());
    }, [dispatch]);

    return (
        <div className="centered-block">
            <CharacterFinder/>
            <hr/>
            <CharacterContainer charactersData={characterData}/>
        </div>
    );
}
