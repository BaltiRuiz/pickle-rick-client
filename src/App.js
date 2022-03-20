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

import { StorageEnums } from "./enums/storage.enums";

import { initAxiosConfiguration } from "./config/axios.config";

function PrivateRoute(props) {
    const userToken = localStorage.getItem(StorageEnums.UserToken);

    const userState = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userToken) {
            dispatch(reqGetUser(userToken));
        }
    }, [userToken, dispatch]);

    if (userState.name) {
        return (
            <div>
                <div className="centered-block">
                    {`Welcome, ${userState.name} from dimension C-137`}
                </div>
                <div>
                    <ul>
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
                    {props.children}
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
