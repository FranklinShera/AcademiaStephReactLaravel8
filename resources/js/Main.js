import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Swal2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// STATE
import { useDispatch, useSelector } from "react-redux";

//ACTIONS
import { refreshUser, refreshClient } from "./actions/AuthUserActions";
import Register from "./pages/auth/Register";

// AUTH COMPONENTS
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ClientProtectedRoute from "./components/client/ClientProtectedRoute";

// COMPONENTS
import Loader from "./components/Loader";
import ProviderLoginResolve from "./pages/client/ProviderLoginResolve";
import OrderShow from "./pages/client/OrderShow";
import Messages from "./pages/auth/Messages";
import Overlay from "./components/Overlay";

// PAGES
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ClientLogin from "./pages/client/ClientLogin";
import Dashboard from "./pages/auth/Dashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import Payment from "./pages/auth/Payment";
import Orders from "./pages/auth/Orders";
import OrderView from "./pages/auth/OrderView";
import OrderControl from "./pages/auth/OrderControl";
import Conversations from "./pages/auth/Conversations";
import Writers from "./pages/auth/Writers";
import DirectContacts from "./pages/auth/DirectContacts";
import Profile from "./pages/auth/Profile";
import ClientPayment from "./pages/client/Payment";
import ClientPaymentSuccess from "./pages/client/PaymentSuccess";
import ClientPaymentFailed from "./pages/client/PaymentFailed";
import ClientOrders from "./pages/client/Orders";
import ClientMessages from "./pages/client/Messages";
import ClientProfile from "./pages/client/Profile";
import PlaceNewOrder from "./pages/client/PlaceNewOrder";

// SWEETALERT2 SETUP
const Swal = withReactContent(Swal2);

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

// SWEETALERT2 HOOK
window.Toast = Toast;
window.Swal = Swal;

function App() {
    const dispatch = useDispatch();

    const authUser = useSelector((state) => state.authUser);

    const authClient = useSelector((state) => state.authClient);

    const userInAdmin = useSelector((state) => state.adminPanel);

    const { inAdminPanel } = userInAdmin;

    const { auth } = authUser;

    const { clientAuth } = authClient;

    useEffect(() => {
        // check if location is not /client
        if (!auth && location.pathname === "/in") {
            dispatch(refreshUser());
        }

        // check if location is /client
        if (!clientAuth && location.pathname === "/client") {
            dispatch(refreshClient());
        }

        setInterval(() => {
            auth && location.pathname === "/in"
                ? dispatch(refreshUser(1))
                : clientAuth &&
                  location.pathname === "/client" &&
                  dispatch(refreshClient(1));
        }, 840000);
    }, [location.pathname]);

    const BlankPage = () => {
        return <div></div>;
    };

    return (
        <>
            <Overlay />
            <Loader />
            <Router>
                <Header inAdminPanel={inAdminPanel} />
                <Routes>
                    {/*<Route path="/find-writer" exact component={FindWriter}/>*/}
                    {/*<Route path="/in/register" exact component={Register}/>*/}

                    <Route
                        path={`/in/dashboard/orders/:category`}
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={`/in/dashboard/order-view/:id/:topicSlug`}
                        element={
                            <ProtectedRoute>
                                <OrderView />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={`/in/dashboard/conversation/:id/:clientName`}
                        element={
                            <ProtectedRoute>
                                <Messages />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={`/in/dashboard/control/order-input`}
                        element={
                            <ProtectedRoute role="0">
                                <OrderControl />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={`/in/dashboard/conversations`}
                        element={
                            <ProtectedRoute>
                                <Conversations />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={`/in/dashboard/writers`}
                        element={
                            <ProtectedRoute>
                                <Writers />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={`/in/dashboard/direct-contacts`}
                        element={
                            <ProtectedRoute>
                                <DirectContacts />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={`/in/dashboard/payments`}
                        element={
                            <ProtectedRoute>
                                <Payment />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={`/in/dashboard/profile`}
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/in/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/client/dashboard"
                        element={
                            <ClientProtectedRoute>
                                <ClientDashboard />
                            </ClientProtectedRoute>
                        }
                    />
                    <Route
                        path={`/client/dashboard/place-order`}
                        element={
                            <ClientProtectedRoute>
                                <PlaceNewOrder />
                            </ClientProtectedRoute>
                        }
                    />
                    <Route
                        path={`/paypal/:payment/:orderid`}
                        element={
                            <ClientProtectedRoute>
                                <BlankPage />
                            </ClientProtectedRoute>
                        }
                    />
                    <Route
                        path={`/paypal/:paymentredirect`}
                        element={
                            <ClientProtectedRoute>
                                <BlankPage />
                            </ClientProtectedRoute>
                        }
                    />
                    <Route
                        path={`/client/dashboard/orders/:category`}
                        element={
                            <ClientProtectedRoute>
                                <ClientOrders />
                            </ClientProtectedRoute>
                        }
                    />
                    <Route
                        path={`/client/dashboard/order-view/:id/:topicSlug`}
                        element={
                            <ClientProtectedRoute>
                                <OrderShow />
                            </ClientProtectedRoute>
                        }
                    />
                    <Route
                        path={`/client/dashboard/messages`}
                        element={
                            <ClientProtectedRoute>
                                <ClientMessages />
                            </ClientProtectedRoute>
                        }
                    />
                    <Route
                        path={`/client/dashboard/payments`}
                        element={
                            <ClientProtectedRoute>
                                <ClientPayment />
                            </ClientProtectedRoute>
                        }
                    />
                    <Route
                        path={`/client/dashboard/payment-successful`}
                        element={
                            <ClientProtectedRoute>
                                <ClientPaymentSuccess />
                            </ClientProtectedRoute>
                        }
                    />

                    <Route
                        path={`/client/dashboard/payment-failed`}
                        element={
                            <ClientProtectedRoute>
                                <ClientPaymentFailed />
                            </ClientProtectedRoute>
                        }
                    />

                    <Route
                        path={`/client/dashboard/profile`}
                        element={
                            <ClientProtectedRoute>
                                <ClientProfile />
                            </ClientProtectedRoute>
                        }
                    />

                    <Route path="/in" element={<Login />} />
                    <Route path="/client" element={<ClientLogin />} />
                    <Route
                        path="/social/authorize/:provider"
                        element={<ProviderLoginResolve />}
                    />
                    <Route path="/" element={<Home />} />
                    <Route element={<NotFound />} />
                </Routes>

                {!inAdminPanel && <Footer />}
            </Router>
        </>
    );
}

export default App;
