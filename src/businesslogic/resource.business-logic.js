import axios from "axios";
import { isEmpty } from "lodash";

const _ = {
    isEmpty,
}

const checkFields = (fields) => {
    if (fields) {
        return Object.keys(fields).some(resourceField => !_.isEmpty(fields[resourceField]));
    } else {
        return false;
    }
}

export const fetchResources = async (resourceType, ids = null, fields = null) => {
    let axiosResult;

    let axiosURL = `http://localhost:3000/${resourceType}`;

    const areIDsValid = !_.isEmpty(ids);
    const areFieldsValid = checkFields(fields);

    if (areFieldsValid) {
        axiosResult = await axios.get(
            axiosURL,
            { params: fields },
        );
    } else if (areIDsValid) {
        axiosResult = await axios.get(`${axiosURL}/${ids}`);
    } else {
        axiosResult = await axios.get(axiosURL);
    }

    return axiosResult.data;
}

export const markOrRemoveResourceAsFavourite = async (resourceType, resourceID) => {
    return await axios.post(`http://localhost:3000/favourite/${resourceType}/${resourceID}`);
}
