import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserError } from "../store/user/store.user.actions";
import { reqRegisterUser } from "../store/user/store.user.thunk.actions";

export function RegisterUserPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const userState = useSelector(state => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleConfirmClick = () => {
        dispatch(reqRegisterUser(name, password, passwordConfirmation));
    }

    const handleBackClick = () => {
        navigate("/login");
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
        <div className="screen-centered-block" style={{ marginLeft: "-150px" }}>
            <form>
                <div>
                    <label htmlFor="register-name">Name: </label>
                    <input
                        type="text"
                        id="register-name"
                        autoComplete="username"
                        autoFocus={true}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label htmlFor="register-password">Password: </label>
                    <input
                        type="password"
                        id="register-password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <label htmlFor="register-password-confirmation">Password confirmation: </label>
                    <input
                        type="password"
                        id="register-password-confirmation"
                        autoComplete="current-password"
                        onChange={(e) => setPasswordConfirmation(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleConfirmClick}
                    >
                        Confirm
                    </button>
                </div>
            </form>
            <div>
                <button
                    type="button"
                    onClick={handleBackClick}
                >
                    Back
                </button>
            </div>
            <div>
                <p>{userState.error}</p>
            </div>
        </div>
    );
}
