import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import "./App.css";

import { store } from "./store/store.service";
import { reqGetUser } from "./store/user/store.user.thunk.actions";

import { CharacterPage } from "./pages/CharacterPage";
import { LocationPage } from "./pages/LocationPage";
import { EpisodePage } from "./pages/EpisodePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterUserPage } from "./pages/RegisterUserPage";
import { LogoutPage } from "./pages/LogoutPage";

import { APIState } from "./enums/api.enums";
import { StorageEnums } from "./enums/storage.enums";

import { initAxiosConfiguration } from "./config/axios.config";

export function useAPIStateFetching() {
    const applicationState = useSelector(state => state.application);

    return applicationState.apiState === APIState.Fetching;
}

function PrivateRoute(props) {
    const userToken = localStorage.getItem(StorageEnums.UserToken);

    const userState = useSelector(state => state.user);

    const dispatch = useDispatch();

    const isAPIFetching = useAPIStateFetching();

    useEffect(() => {
        if (userToken) {
            dispatch(reqGetUser(userToken));
        }
    }, [userToken, dispatch]);

    const linkPointerEvents = isAPIFetching ? "none" : "auto";
    const applicationOpacity = isAPIFetching ? 0.5 : 1;

    if (userState.name) {
        return (
            <div>
                <div className="centered-block">
                    {`Welcome, ${userState.name} from dimension C-137`}
                </div>
                <div>
                    <ul style={{ pointerEvents: linkPointerEvents }}>
                        <li>
                            <Link to="/character">Characters</Link>
                        </li>
                        <li>
                            <Link to="/location">Locations</Link>
                        </li>
                        <li>
                            <Link to="/episode">Episodes</Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </ul>
                    <hr/>
                    <div style={{ opacity: applicationOpacity }}>
                        {props.children}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <Navigate to="/login"/>
        );
    }
}

function AppRouter() {
    return (
        <Routes>
            <Route exact path="/" element={<PrivateRoute><CharacterPage/></PrivateRoute>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterUserPage/>}/>
            <Route path="/logout" element={<LogoutPage/>}/>
            <Route path="/character" element={<PrivateRoute><CharacterPage/></PrivateRoute>}/>
            <Route path="/location" element={<PrivateRoute><LocationPage/></PrivateRoute>}/>
            <Route path="/episode" element={<PrivateRoute><EpisodePage/></PrivateRoute>}/>
        </Routes>
    );
}

function App() {
    useEffect(() => {
        initAxiosConfiguration();
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <AppRouter/>
            </Router>
        </Provider>
    );
}

export default App;
