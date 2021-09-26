import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

const ProtectedRoute = ({ role = "*", component: Component, ...rest }) => {
    const authUser = useSelector((state) => state.authUser);
    const { loggedInUser, auth } = authUser;

    let location = useLocation();

    const isAllowed = () => {

        if (loggedInUser != null && auth) {

            if (role === "*" || loggedInUser.role == int.parse(role)) {

                return true;

            }

        }

        return false;
    };

    return (
        <Route
            {...rest}

            render={(props) => {

                if (isAllowed) {
                    return <Component {...props} />;
                }


                return (
                    <Redirect
                        to={{
                            pathname: "/in",
                            state: { next: location.pathname },
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
