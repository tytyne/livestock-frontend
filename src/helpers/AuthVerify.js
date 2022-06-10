import React from "react";
import { withRouter } from "react-router-dom";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = ({ history, logOut }) => {
    history.listen(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const decodedJwt = parseJwt(user.token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                logOut();
            }
        }
    });
    return <div></div>;
};
export default withRouter(AuthVerify);
