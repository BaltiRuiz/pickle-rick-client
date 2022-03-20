import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserError } from "../store/user/store.user.actions";
import { reqLoginUser } from "../store/user/store.user.thunk.actions";

export function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const userState = useSelector(state => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLoginClick = () => {
        dispatch(reqLoginUser(name, password));
    }

    const handleRegisterClick = () => {
        navigate("/register");
    }

    useEffect(() => {
        dispatch(setUserError(null));
    }, [dispatch]);

    useEffect(() => {
        if (userState.name) {
            navigate("/");
        }
    }, [userState.name, navigate]);

    return (
        <div className="screen-centered-block">
            <form>
                <div>
                    <label htmlFor="login-name">Name: </label>
                    <input
                        type="text"
                        id="login-name"
                        autoComplete="username"
                        autoFocus={true}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label htmlFor="login-password">Password: </label>
                    <input
                        type="password"
                        id="login-password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleLoginClick}
                    >
                        Login
                    </button>
                </div>
            </form>
            <div>
                <button
                    type="button"
                    onClick={handleRegisterClick}
                >
                    Register User
                </button>
            </div>
            <div>
                <p>{userState.error}</p>
            </div>
        </div>
    );
}
