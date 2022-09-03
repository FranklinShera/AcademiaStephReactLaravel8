import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LogoShooting from "../../components/LogoShooting";

import {
    autoLoginClient,
    refreshClient,
    refreshUser,
} from "../../actions/AuthUserActions";
import { useAutoLoginClientMutation } from "../../app/api/AuthAPI";

const ClientLogin = () => {
    const [AutoLoginClient, { isLoading }] = useAutoLoginClientMutation();
    const [isLoggin, setIsLogging] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const authClient = useSelector((state) => state.authClient);
    const { loggedInClient, clientAuth, loading } = authClient;

    useEffect(() => {
        if (clientAuth) {
            location.state && location.state.next
                ? navigate(location.state.next)
                : navigate("/client/dashboard");
        }
    }, [clientAuth]);

    const GITHUB_PROVIDER = "github";
    const GOOGLE_PROVIDER = "google";
    const FACEBOOK_PROVIDER = "facebook";

    const socialLogin = (provider) => {
        axios
            .get(`/api/soc/authorize/${provider}/redirect`)
            .then((res) => {
                if (res.data.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch((err) => console.log(err));
    };

    const autoLogin = async (e) => {
        e.preventDefault();
        const {
            data: { message, ...authTime },
        } = await AutoLoginClient();

        dispatch(setAuthTime(authTime));
    };

    useEffect(() => {
        // dispatch(refreshClient());

        // setInterval(() => {
        //     dispatch(refreshClient(1));
        // }, 840000);

        window.scrollTo(0, 0);

        document.querySelector("title").text = "AcademiaSteph21 | Client Login";
    }, []);

    return (
        <div className="login-screen">
            <form
                className="w-11/12 md:w-3/5 lg:w-3/12 rounded-lg flex flex-col items-center bg-white py-10 sm:py-14 shadow-sm"
                onSubmit={(e) => e.preventDefault()}
            >
                <label className="w-full mb-3 font-bold text-3xl text-center">
                    Client Login
                </label>
                {loading && <LogoShooting />}
                <span className="text-green-600 font-semibold">
                    Get Started With Only one Click!
                </span>

                <hr className="bg-gray-200 h-px w-full my-5" />

                <div className=" flex flex-col items-center justify-center w-4/5">
                    <span
                        className="social-btn bg-github-1 text-github-2 border border-transparent hover:border-github-1 hover:text-github-1 hover:bg-github-2"
                        onClick={(e) => socialLogin(GITHUB_PROVIDER)}
                    >
                        <i className="ti-github"></i> Github
                    </span>

                    <span
                        className="social-btn bg-google-1 text-white border border-transparent hover:border-google-1 hover:text-google-1 hover:bg-github-2"
                        onClick={(e) => socialLogin(GOOGLE_PROVIDER)}
                    >
                        <i className="ti-google"></i> Google
                    </span>

                    <span
                        className="social-btn bg-facebook-1 text-white border border-transparent hover:border-facebook-1 hover:text-facebook-1 hover:bg-github-2"
                        onClick={(e) => socialLogin(FACEBOOK_PROVIDER)}
                    >
                        <i className="ti-facebook"></i> Facebook
                    </span>

                    <span
                        className="social-btn bg-gray-100 text-dark-5"
                        onClick={autoLogin}
                    >
                        Auto Login
                    </span>
                </div>
                <span className="text-black text-sm text-center w-4/5">
                    <strong>NB: </strong> Your account will be created
                    automatically!
                </span>
            </form>
        </div>
    );
};

export default ClientLogin;
