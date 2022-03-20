import axios from "axios";

import { store } from "../store.service";

import { setUserError, setUserName } from "../user/store.user.actions";

export class AuthService {
    static async loginUser(name, password) {
        const axiosResult = await axios.post(
            "http://localhost:3000/login",
            { name, password },
        );

        return axiosResult.data;
    }

    static async registerUser(name, password, passwordConfirmation) {
        const axiosResult = await axios.post(
            "http://localhost:3000/user",
            { name, password, passwordConfirmation },
        );

        return axiosResult.data;
    }

    static logoutUser() {
        try {
            localStorage.clear();

            store.dispatch(setUserName(null));
            store.dispatch(setUserError(null));
        } catch (error) {
            store.dispatch(setUserError(error.response.data));
        }
    }
}
