import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory} from 'react-router'

import axios from 'axios'

import ClientLayout from '../../components/client/ClientLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'



const Profile = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const authClient = useSelector( state => state.authClient)
    const { clientAuth , loggedInClient } = authClient;


    useEffect(() => {

        if(!clientAuth){
            hist.push("/client")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Client Profile'


    }, [clientAuth])




    return (
        <div className="dashboard">
            <ClientLayout>
             <div className="dash_overview">
               <div className="profile">
                   <h1>Profile Page</h1>
                   <div className="profile-hub">

                       <div className="profile-primary-details">

                           <h2>Primary Details</h2>

                           <div className="profile-detail">
                               <label >Name</label>
                               <span>{loggedInClient.name}</span>
                           </div>


                           <div className="profile-detail">
                               <label >Email</label>
                               <span>{loggedInClient.email}</span>
                           </div>

                           <div className="profile-detail">
                               <label >Joined</label>
                               <span>{loggedInClient.created_at}</span>
                           </div>


                       </div>

                       <div className="profile-sec-details">

                           <h2>Social Accounts</h2>

                           {loggedInClient.social_accounts.map(socialAccount => (

                               <div className="profile-detail">
                                   <i className={ `ti-${socialAccount.provider}`}></i>
                                   <label >{socialAccount.provider}</label>
                                   <span>{socialAccount.provider_client_id}</span>
                               </div>

                           ))}


                       </div>


                   </div>


               </div>
             </div>
            </ClientLayout>
        </div>
    )
}

export default Profile
