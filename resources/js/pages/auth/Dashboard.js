import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory , useRouteMatch} from 'react-router'

import axios from 'axios'

import AdminLayout from '../../components/auth/AdminLayout'







const Dashboard = () => {

    axios.defaults.withCredentials = true;



    const hist = useHistory();
    const dispatch = useDispatch()

    const authUser = useSelector( state => state.authUser)
    const { loggedInUser, auth } = authUser;

    const[analytics,setAnalytics] = useState({})


    const loadAnalytics = () =>{
            axios.get('/api/auth/admin/analytics')
                .then((res) =>{
                   setAnalytics(res.data)
                })
                .catch(err =>{
                    
            })
    }


    useEffect(() => {

        if(!auth){
            hist.push("/in")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Dashboard'

        loadAnalytics();

    }, [auth])



    return (
        <div className="dashboard bg-gray-100">
            <AdminLayout>
             <div className="dash_overview">
                <div className="admin-section">
                    <h1 className="lead-title">ADMIN DASHBOARD</h1>

                    <div className="dashboard-analytics">

                        <div className="dash-analytics-area">

                            <h2 className="analytics-area-title"> Orders</h2>

                            <div className="analytics-area-groups">

                                <div className="analytics-area-group group-received ">
                                    <div className="area-group-name">Received</div>
                                    <div className="area-group-value">{analytics.order?.received || "N/A"}</div>
                                </div>

                                <div className="analytics-area-group group-completed ml-7">
                                    <div className="area-group-name">Completed</div>
                                    <div className="area-group-value">{analytics.order?.completed || "N/A"}</div>
                                </div>


                                <div className="analytics-area-group group-active ml-7">
                                    <div className="area-group-name">Active</div>
                                    <div className="area-group-value">{analytics.order?.active || "N/A"}</div>
                                </div>

                                <div className="analytics-area-group group-pending ml-7">
                                    <div className="area-group-name">Pending</div>
                                    <div className="area-group-value">{analytics.order?.pending || "N/A"}</div>
                                </div>

                                <div className="analytics-area-group group-unassigned ml-7">
                                    <div className="area-group-name">Unassigned</div>
                                    <div className="area-group-value">{analytics.order?.unassigned || "N/A"}</div>
                                </div>

                                <div className="analytics-area-group group-cancelled ml-7">
                                    <div className="area-group-name">Cancelled</div>
                                    <div className="area-group-value">{analytics.order?.cancelled || "N/A"}</div>
                                </div>




                            </div>

                        </div>



                         <div className="dash-analytics-area">

                            <h2 className="analytics-area-title">Control Items</h2>

                                <div className="analytics-area-groups group-norm">

                                    <div className="analytics-area-group  ">
                                        <div className="area-group-name">Levels</div>
                                        <div className="area-group-value">{analytics.control?.academic_levels || "N/A"}</div>
                                    </div>

                                    <div className="analytics-area-group ml-7">
                                        <div className="area-group-name">Subjects</div>
                                        <div className="area-group-value">{analytics.control?.subject_areas || "N/A"}</div>
                                    </div>



                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Types</div>
                                        <div className="area-group-value">{analytics.control?.paper_types || "N/A"}</div>
                                    </div>

                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Formats</div>
                                        <div className="area-group-value">{analytics.control?.paper_formats || "N/A"}</div>
                                    </div>



                                </div>

                        </div>





                         <div className="dash-analytics-area">

                            <h2 className="analytics-area-title">Misc</h2>

                                <div className="analytics-area-groups group-norm">

                                    <div className="analytics-area-group ">
                                        <div className="area-group-name">Messages</div>
                                        <div className="area-group-value">{analytics.misc?.messages || "N/A"}</div>
                                    </div>

                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Transactions</div>
                                        <div className="area-group-value">{analytics.misc?.transactions || "N/A"}</div>
                                    </div>

                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Payments</div>
                                        <div className="area-group-value">${analytics.misc?.payments || "N/A"}</div>
                                    </div>

                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Writers</div>
                                        <div className="area-group-value">{analytics.misc?.writers || "N/A"}</div>
                                    </div>

                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Clients</div>
                                        <div className="area-group-value">{analytics.misc?.clients || "N/A"}</div>
                                    </div>

                                    <div className="analytics-area-group  ml-7">
                                        <div className="area-group-name">Admins</div>
                                        <div className="area-group-value">{analytics.misc?.admins || "N/A"}</div>
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
