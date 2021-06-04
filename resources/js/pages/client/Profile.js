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
    const { clientAuth } = authClient;


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
               <h1>Profile Page</h1>
             </div>
            </ClientLayout>
        </div>
    )
}

export default Profile
