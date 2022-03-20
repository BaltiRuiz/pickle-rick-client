import axios from "axios";

import { StorageEnums } from "../enums/storage.enums";

import { AuthService } from "../store/services/auth.service";

const setRequestInterceptors = () => {
    axios.interceptors.request.use(config => {
        const userToken = localStorage.getItem(StorageEnums.UserToken);

        if (userToken) {
            config.headers["Authorization"] = userToken;
        }

        return config;
    });
}

const setResponseInterceptors = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status === 401) {
                AuthService.logoutUser();
            }

            return Promise.reject(error);
        }
    );
}

export const initAxiosConfiguration = () => {
    setRequestInterceptors();
    setResponseInterceptors();
}
