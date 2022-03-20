import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { reqFindLocations, reqGetAllLocations } from "../store/location/store.location.thunk.actions";

function LocationBox(props) {
    const { locationData } = props;

    return (
        <div>
            <p>{`${locationData.id}: ${locationData.name}`}</p>
            <p>{`${locationData.type} - ${locationData.dimension}`}</p>
            <p>{`It has ${locationData.residents.length} residents`}</p>
        </div>
    );
}

function LocationContainer(props) {
    const locationError = useSelector(state => state.location.error);

    const { locationsData } = props;

    if (locationsData && locationsData.data) {
        return locationsData.data.map((locationResult, index) => {
            return (
                <div key={`location-key-${index}`}>
                    <LocationBox locationData={locationResult}/>
                    <hr/>
                </div>
            );
        });
    } else {
        return <p>{locationError}</p>;
    }
}

function LocationFinder() {
    const [ids, setIDs] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [dimension, setDimension] = useState("");

    const dispatch = useDispatch();

    const handleButtonClick = () => {
        dispatch(reqFindLocations(ids, name, type, dimension));
    }

    return (
        <div>
            <div>
                <label htmlFor="location-ids">ID: </label>
                <input
                    type="text"
                    id="location-ids"
                    onChange={(e) => setIDs(e.currentTarget.value)}
                />
            </div>
            <div>
                <label htmlFor="location-name">Name: </label>
                <input
                    type="text"
                    id="location-name"
                    onChange={(e) => setName(e.currentTarget.value)}
                />
            </div>
            <div>
                <label htmlFor="location-type">Type: </label>
                <input
                    type="text"
                    id="location-type"
                    onChange={(e) => setType(e.currentTarget.value)}
                />
            </div>
            <div>
                <label htmlFor="location-dimension">Dimension: </label>
                <input
                    type="text"
                    id="location-dimension"
                    onChange={(e) => setDimension(e.currentTarget.value)}
                />
            </div>
            <div>
                <button
                    type="button"
                    onClick={handleButtonClick}
                >
                    Find Locations
                </button>
            </div>
        </div>
    );
}

export function LocationPage() {
    const locationData = useSelector(state => state.location.data);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reqGetAllLocations());
    }, [dispatch]);

    return (
        <div className="centered-block">
            <LocationFinder/>
            <hr/>
            <LocationContainer locationsData={locationData}/>
        </div>
    );
}
