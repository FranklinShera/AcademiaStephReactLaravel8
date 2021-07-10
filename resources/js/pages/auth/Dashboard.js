import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory , useRouteMatch} from 'react-router'

import axios from 'axios'

import AdminLayout from '../../components/auth/AdminLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'



const Dashboard = () => {

    axios.defaults.withCredentials = true;



    const hist = useHistory();
    const dispatch = useDispatch()

    const authUser = useSelector( state => state.authUser)
    const { loggedInUser, auth } = authUser;


    useEffect(() => {

        if(!auth){
            hist.push("/in")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Dashboard'


    }, [auth])



    return (
        <div className="dashboard bg-gray-200">
            <AdminLayout>
             <div className="dash_overview">
                <div className="admin-section">
                    <h1 className="lead-title">ADMIN DASHBOARD</h1>

                    <div className="dashboard-analytics">

                        <div className="dash-analytics-area">

                            <h2 className="analytics-area-title"> ORDERS</h2>

                            <div className="analytics-area-groups">

                                <div className="analytics-area-group group-received ">
                                    <div className="area-group-name">Received</div>
                                    <div className="area-group-value">430</div>
                                </div>

                                <div className="analytics-area-group group-completed ml-7">
                                    <div className="area-group-name">Completed</div>
                                    <div className="area-group-value">400</div>
                                </div>


                                <div className="analytics-area-group group-active ml-7">
                                    <div className="area-group-name">Active</div>
                                    <div className="area-group-value">430</div>
                                </div>

                                <div className="analytics-area-group group-pending ml-7">
                                    <div className="area-group-name">Pending</div>
                                    <div className="area-group-value">14</div>
                                </div>

                                <div className="analytics-area-group group-cancelled ml-7">
                                    <div className="area-group-name">Cancelled</div>
                                    <div className="area-group-value">400</div>
                                </div>




                            </div>

                        </div>



                         <div className="dash-analytics-area">

                            <h2 className="analytics-area-title">Control Items</h2>

                                <div className="analytics-area-groups group-norm">

                                    <div className="analytics-area-group  ">
                                        <div className="area-group-name">Levels</div>
                                        <div className="area-group-value">5</div>
                                    </div>

                                    <div className="analytics-area-group ml-7">
                                        <div className="area-group-name">Subjects</div>
                                        <div className="area-group-value">14</div>
                                    </div>



                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Types</div>
                                        <div className="area-group-value">7</div>
                                    </div>

                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Formats</div>
                                        <div className="area-group-value">4</div>
                                    </div>



                                </div>

                        </div>





                         <div className="dash-analytics-area">

                            <h2 className="analytics-area-title">Misc</h2>

                                <div className="analytics-area-groups group-norm">

                                    <div className="analytics-area-group ">
                                        <div className="area-group-name">Messages</div>
                                        <div className="area-group-value">715</div>
                                    </div>

                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Payments</div>
                                        <div className="area-group-value">$56,714</div>
                                    </div>



                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Clients</div>
                                        <div className="area-group-value">74</div>
                                    </div>

                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Admins</div>
                                        <div className="area-group-value">2</div>
                                    </div>



                                </div>

                        </div>






                    </div>

                </div>
             </div>
            </AdminLayout>
        </div>
    )
}

export default Dashboard
