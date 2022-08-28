import React, { useState, useEffect } from "react";

import { Link, BrowserRouter, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Logo from ".././images/as21logo.png";

//actions
import { logoutUser, logoutClient } from "../actions/AuthUserActions";
import Notification from "./Notification";

const Header = ({ inAdminPanel }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authUser = useSelector((state) => state.authUser);
    const { loggedInUser, auth } = authUser;

    const authClient = useSelector((state) => state.authClient);
    const { loggedInClient, clientAuth } = authClient;

    const [dropNav, setdropNav] = useState(false);

    function navigateTo(linkto) {
        setdropNav(!dropNav);
        window.location.hash = linkto;
    }

    const logout = (e) => {
        e.preventDefault();

        auth && dispatch(logoutUser());

        clientAuth && dispatch(logoutClient());
    };

    const getDashboard = (e) => {
        e.preventDefault();

        auth && navigate("/in/dashboard");

        clientAuth && navigate("/client/dashboard");
    };

    useEffect(() => {}, []);

    return (
        <>
            <nav
                id="navigation"
                className={`fixed top-0 left-0 h-16 nav-main ${
                    inAdminPanel ? " nav-main-ap " : " nav-main-dp "
                }`}
            >
                <div className="nav-left">
                    <div className="logo">
                        <Link to="/">
                            <img
                                src={Logo}
                                className="h-8"
                                alt="academiasteph21 logo"
                            />
                            <span className="ml-2 text-lg">
                                AcademiaSteph21
                            </span>
                        </Link>
                    </div>
                </div>

                {(auth || clientAuth) && (
                    <Notification userType={auth ? 1 : clientAuth ? 0 : null} />
                )}

                <div
                    className={
                        dropNav
                            ? "toggler justify-center"
                            : "toggler justify-between"
                    }
                    onClick={(e) => setdropNav(!dropNav)}
                >
                    <span
                        className={
                            dropNav ? "menu-line frwdslash" : "menu-line"
                        }
                    ></span>
                    <span
                        className={
                            dropNav ? "menu-line backslash" : "menu-line"
                        }
                    ></span>
                    {!dropNav && <span className="menu-line"></span>}
                </div>

                <div className=" nav-right">
                    {!auth && !clientAuth ? (
                        <>
                            <li className=" navlink hover:border-b-2">
                                <a href="/#hero">Home</a>
                            </li>

                            <li className="navlink hover:border-b-2">
                                <a href="/#services">Services</a>
                            </li>

                            <li className="navlink hover:border-b-2">
                                <a href="/#contact">Contact</a>
                            </li>

                            <div className="login-links">
                                <Link to="/in">Admin</Link>

                                <Link to="/client">Client</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="flex cursor-pointer"
                                onClick={getDashboard}
                            >
                                <div>
                                    {auth && loggedInUser.name}
                                    {clientAuth && loggedInClient.name}
                                </div>

                                <div className="admin-logout" onClick={logout}>
                                    <svg
                                        className="w-6 h-6"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </nav>

            {dropNav && (
                <div
                    id="mobmenu"
                    className="flex items-center justify-center mobile-nav sm:hidden animate__animated animate__slideInDown"
                >
                    <div className="flex flex-col items-center justify-center mid">
                        <li
                            className="my-8 navlink hover:border-b-2"
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo("#hero");
                            }}
                        >
                            <a href="/#hero">Home</a>
                        </li>
                        <li
                            className="my-8 navlink hover:border-b-2"
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo("#services");
                            }}
                        >
                            <a href="/#services">Services</a>
                        </li>
                        <li
                            className="my-8 navlink hover:border-b-2"
                            onClick={(e) => {
                                e.preventDefault();
                                navigateTo("#contact");
                            }}
                        >
                            <a href="/#contact">Contact</a>
                        </li>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
