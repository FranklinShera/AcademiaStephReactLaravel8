import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role = "*" }) => {
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

    return isAllowed() ? (
        children
    ) : (
        <Navigate to="/in" state={{ next: location.pathname }} />
    );
};

export default ProtectedRoute;
