import React from "react";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { NotifyHelper } from "../helper/NotifyHelper";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = (props) => {
    props.history.listen(() => {

        if (localStorage.x_accessToken) {
            const user = jwt_decode(localStorage.x_accessToken);
            if (user) {
                if (new Date(user.exp) * 1000 <  Date.now()) {
                    console.log("user");
                    console.log(user.exp);
                    console.log(Date.now());
                    // localStorage.removeItem("x_accessToken");
                    // localStorage.removeItem("x_refreshToken");
                    props.logOut();
                }
            }
        }



    });

    return <div></div>;
};

export default withRouter(AuthVerify);