import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ClientProtectedRoute = ({ children }) => {
    const authClient = useSelector((state) => state.authClient);
    const { loggedInClient, clientAuth } = authClient;

    let location = useLocation();

    return loggedInClient != null && clientAuth ? (
        children
    ) : (
        <Navigate to="/client" state={{ next: location.pathname }} />
    );
};

export default ClientProtectedRoute;
