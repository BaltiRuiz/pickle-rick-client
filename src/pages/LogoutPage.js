import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { reqLogoutUser } from "../store/user/store.user.thunk.actions";

export function LogoutPage() {
    const userState = useSelector(state => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (userState.name) {
            dispatch(reqLogoutUser());
        } else {
            navigate("/");
        }
    });

    return (
        <div className="screen-centered-block">
            {userState.error ? userState.error : "Redirecting to login page..."}
        </div>
    );
}
