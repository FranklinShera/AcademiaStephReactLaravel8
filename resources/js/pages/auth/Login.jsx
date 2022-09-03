import axios from "axios";
import React, { useEffect, useState } from "react";
import InputField from "../../components/InputField";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser, setAuthTime } from "../../app/store/slices/AuthSlice";
//actions
import { loginUser, refreshUser } from "../../actions/AuthUserActions";
import LogoShooting from "../../components/LogoShooting";
import {
    useLoginUserMutation,
    useGetUserMutation,
} from "../../app/api/AuthAPI";

const Login = ({ location }) => {
    const [loginUser, { isLoading, isError, isSuccess }] =
        useLoginUserMutation();

    const [getUser] = useGetUserMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loggedInUser, auth, loading } = useSelector(selectAuthUser);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const fetchUser = () => {
        console.log("Feting User");
        getUser()
            .unwrap()
            .then((result) => console.log("GET USER RES", result))
            .catch((err) => console.log("GET USER ERROR", err));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        loginUser(user)
            .unwrap()
            .then((res) => {
                const { message, ...authTime } = res;

                dispatch(setAuthTime(authTime));
                fetchUser();
            })
            .catch((error) => console.log("LOGIN FAIL", error));
    };

    const noAccount = (e) => {
        e.preventDefault();

        navigate("/in/register");
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        document.querySelector("title").text = "AcademiaSteph21 | Admin Login";
    }, []);

    useEffect(() => {
        if (auth) {
            location.state && location.state.next
                ? navigate(location.state.next)
                : navigate("/in/dashboard");
        }
    }, [auth]);

    return (
        <div className="login-screen">
            <form
                className="w-11/12 md:w-4/5 lg:w-2/5 bg-white p-10 sm:p-14 shadow-sm rounded-lg"
                onSubmit={handleLogin}
            >
                <label className="w-full mb-5 text-3xl font-bold sm:text-4xl text-center">
                    Admin Login
                </label>
                {isLoading && <LogoShooting></LogoShooting>}

                <InputField
                    labelText="Username"
                    parentClasses="w-full"
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Enter Email"
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />

                <InputField
                    labelText="Password"
                    parentClasses="w-full"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter  Password"
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />

                {/*<label className="block">Don't Have An Account? <span className="ml-2 font-bold cursor-pointer text-primary-3" onClick={noAccount}>Register Here</span></label>*/}
                <button
                    type="submit"
                    className="w-full sm:text-2xl font-bold sm:w-1/2 lg:w-1/3 btn-pri"
                >
                    {isLoading ? "Logging In" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
