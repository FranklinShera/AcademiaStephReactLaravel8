import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useRouteMatch } from "react-router-dom";

import axios from "axios";

import AdminLayout from "../../components/auth/AdminLayout";

//actions
import { logoutUser } from "../../actions/AuthUserActions";
import AcademicLevel from "../../components/auth/AcademicLevel";
import PaperType from "../../components/auth/PaperType";
import SubjectArea from "../../components/auth/SubjectArea";
import PrefferedEnglish from "../../components/auth/PrefferedEnglish";
import PaperFormat from "../../components/auth/PaperFormat";

const OrderControl = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authUser = useSelector((state) => state.authUser);
    const { loggedInUser, auth } = authUser;

    const [currTab, setCurrTab] = useState(1);

    useEffect(() => {
        if (!auth) {
            navigate("/in");
        }

        window.scrollTo(0, 0);

        document.querySelector("title").text =
            "AcademiaSteph21 | Order Control";
    }, [auth]);

    return (
        <div className="dashboard">
            <AdminLayout>
                <div className="dash_overview">
                    <div className="order-control">
                        <div className="order--control--tabs">
                            <div
                                className={`order--control--tab   ${
                                    currTab == 1
                                        ? " active-control-tab bg-green-900"
                                        : "bg-green-500"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrTab(1);
                                }}
                            >
                                Academic Level
                            </div>

                            <div
                                className={`order--control--tab ${
                                    currTab == 2
                                        ? " active-control-tab bg-blue-900"
                                        : "bg-blue-500"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrTab(2);
                                }}
                            >
                                Paper Type
                            </div>

                            <div
                                className={`order--control--tab ${
                                    currTab == 3
                                        ? " active-control-tab bg-pink-900"
                                        : "bg-pink-500"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrTab(3);
                                }}
                            >
                                Subject Area
                            </div>

                            <div
                                className={`order--control--tab ${
                                    currTab == 4
                                        ? " active-control-tab bg-indigo-900"
                                        : "bg-indigo-500"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrTab(4);
                                }}
                            >
                                Preffered English
                            </div>

                            <div
                                className={`order--control--tab ${
                                    currTab == 5
                                        ? " active-control-tab bg-purple-900"
                                        : "bg-purple-500"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrTab(5);
                                }}
                            >
                                Paper Format
                            </div>
                        </div>

                        <div className="order--control-tabview">
                            {currTab == 1 && (
                                <AcademicLevel
                                    themeClass={`bg-green-900 hover:bg-green-900`}
                                />
                            )}
                            {currTab == 2 && (
                                <PaperType
                                    themeClass={`bg-blue-900 hover:bg-blue-900`}
                                />
                            )}
                            {currTab == 3 && (
                                <SubjectArea
                                    themeClass={`bg-pink-900 hover:bg-pink-900`}
                                />
                            )}
                            {currTab == 4 && (
                                <PrefferedEnglish
                                    themeClass={`bg-indigo-900 hover:bg-indigo-900`}
                                />
                            )}
                            {currTab == 5 && (
                                <PaperFormat
                                    themeClass={`bg-purple-900 hover:bg-purple-900`}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </div>
    );
};

export default OrderControl;
