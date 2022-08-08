import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import AdminLayout from "../../components/auth/AdminLayout";

//actions
import { logoutUser } from "../../actions/AuthUserActions";

const Profile = () => {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const authUser = useSelector((state) => state.authUser);
    const { loggedInUser, auth } = authUser;

    useEffect(() => {
        if (!auth) {
            navigate("/in");
        }

        window.scrollTo(0, 0);

        document.querySelector("title").text = "AcademiaSteph21 | Profile";
    }, [auth]);

    return (
        <div className="dashboard">
            <AdminLayout>
                <div className="dash_overview">
                    <div className="profile bg-gray-50 ">
                        <h1 className="lead-title">Profile Page</h1>
                        <div className="profile-hub">
                            <div className="profile-primary-details">
                                <h2>Primary Details</h2>

                                <div className="profile-detail">
                                    <label>Name</label>
                                    <span>{loggedInUser.name}</span>
                                </div>

                                <div className="profile-detail">
                                    <label>Email</label>
                                    <span>{loggedInUser.email}</span>
                                </div>

                                {/*<div className="profile-detail">*/}
                                {/*    <label >Joined</label>*/}
                                {/*    <span>{loggedInUser.created_at}</span>*/}
                                {/*</div>*/}
                            </div>

                            {/*<div className="profile-sec-details">*/}

                            {/*    <h2 className="mb-3">Social Accounts</h2>*/}

                            {/*    /!*{loggedInUser.social_accounts.map(socialAccount => (*!/*/}

                            {/*    /!*    <div className={`profile-detail  bg-${socialAccount.provider}-1 p-3`}>*!/*/}
                            {/*    /!*        <div className="icon-label-provider">*!/*/}
                            {/*    /!*            <i className={ `ti-${socialAccount.provider}  text-${socialAccount.provider}-1  bg-white p-2 rounded-full`}></i>*!/*/}
                            {/*    /!*            <label >{socialAccount.provider}</label>*!/*/}
                            {/*    /!*        </div>*!/*/}
                            {/*    /!*        <div className="provider-date-time">*!/*/}
                            {/*    /!*            <span>{socialAccount.created_date}</span>*!/*/}
                            {/*    /!*            <span className="mr-3">{socialAccount.created_time}</span>*!/*/}
                            {/*    /!*        </div>*!/*/}
                            {/*    /!*    </div>*!/*/}

                            {/*    /!*))}*!/*/}

                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </div>
    );
};

export default Profile;
