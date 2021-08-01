import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory , useRouteMatch} from 'react-router'

import axios from 'axios'

import ClientLayout from '../../components/client/ClientLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'



const ClientDashboard = () => {

    axios.defaults.withCredentials = true;



    const hist = useHistory();
    const dispatch = useDispatch()

    const authClient = useSelector( state => state.authClient)
    const { loggedInClient, clientAuth } = authClient;


    const[analytics,setAnalytics] = useState({})


    const loadAnalytics = () =>{
        axios.get('/api/auth/client/analytics')
            .then((res) =>{
                setAnalytics(res.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }



    useEffect(() => {

        if(!clientAuth){
            hist.push("/client")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Client Dashboard'

        loadAnalytics();

    }, [clientAuth])



    return (
        <div className="client-dashboard bg-gray-100">

            <ClientLayout>
             <div className="dash_overview">
                 <div className="admin-section">
                     <h1 className="lead-title">CLIENT DASHBOARD</h1>

                     <div className="dashboard-analytics">

                         <div className="dash-analytics-area">

                             <h2 className="analytics-area-title"> ORDERS</h2>

                             <div className="analytics-area-groups">

                                 <div className="analytics-area-group group-received ">
                                     <div className="area-group-name">Sent</div>
                                     <div className="area-group-value">{analytics.order?.sent || "N/A"}</div>
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

                                 <div className="analytics-area-group group-cancelled ml-7">
                                     <div className="area-group-name">Cancelled</div>
                                     <div className="area-group-value">{analytics.order?.cancelled || "N/A"}</div>
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

                                 {/*<div className="analytics-area-group  ml-7">*/}
                                 {/*    <div className="area-group-name">Transactions</div>*/}
                                 {/*    <div className="area-group-value">{analytics.misc?.transactions || "N/A"}</div>*/}
                                 {/*</div>*/}

                                 <div className="analytics-area-group  ml-7">
                                     <div className="area-group-name">Payments</div>
                                     <div className="area-group-value">{analytics.misc?.payments || "N/A"}</div>
                                 </div>


                             </div>

                         </div>






                     </div>

                 </div>
             </div>
            </ClientLayout>
        </div>
    )
}

export default ClientDashboard
