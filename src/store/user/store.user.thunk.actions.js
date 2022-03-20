import jwtDecode from "jwt-decode";

import { StorageEnums } from "../../enums/storage.enums";
import { setUserError, setUserName } from "./store.user.actions";

import { AuthService } from "../services/auth.service";

export const reqGetUser = (token) => async (dispatch) => {
    try {
        const decodedToken = jwtDecode(token);

        dispatch(setUserName(decodedToken.name));
    } catch (error) {
        console.log(`There was an error while retrieving user information: ${error}`);
    }
}

export const reqLoginUser = (name, password) => async (dispatch) => {
    try {
        const userToken = await AuthService.loginUser(name, password);
        const decodedToken = jwtDecode(userToken);

        localStorage.setItem(StorageEnums.UserToken, userToken);

        dispatch(setUserName(decodedToken.name));
        dispatch(setUserError(null));
    } catch (error) {
        dispatch(setUserError(error.response.data));
    }
};

export const reqRegisterUser = (name, password, passwordConfirmation) => async (dispatch) => {
    try {
        const userToken = await AuthService.registerUser(name, password, passwordConfirmation);
        const decodedToken = jwtDecode(userToken);

        localStorage.setItem(StorageEnums.UserToken, userToken);

        dispatch(setUserName(decodedToken.name));
        dispatch(setUserError(null));
    } catch (error) {
        dispatch(setUserError(error.response.data));
    }
}

export const reqLogoutUser = () => (dispatch) => {
    AuthService.logoutUser();
}
