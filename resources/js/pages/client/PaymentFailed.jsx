import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import ClientLayout from "../../components/client/ClientLayout";

const PaymentFailed = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authClient = useSelector((state) => state.authClient);
    const { clientAuth } = authClient;

    useEffect(() => {
        if (!clientAuth) {
            navigate("/client");
        }

        window.scrollTo(0, 0);

        document.querySelector("title").text =
            "AcademiaSteph21 | Order Payment Failed";
    }, [clientAuth]);

    useEffect(() => {
        setTimeout(() => {
            navigate("/client/dashboard/orders/pending");
        }, 3500);
    }, []);

    return (
        <div className="dashboard">
            <ClientLayout>
                <div className="dash_overview">
                    <div className="payment-failed-page">
                        <img
                            src="/storage/images/paypal.svg"
                            alt="PayPal Icon"
                            className="h-56"
                        />
                        <h1 className="text-4xl text-red-600 text-semibold">
                            Payment Faild!
                        </h1>
                    </div>
                </div>
            </ClientLayout>
        </div>
    );
};

export default PaymentFailed;
