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


    useEffect(() => {

        if(!clientAuth){
            hist.push("/client")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Client Dashboard'


    }, [clientAuth])



    return (
        <div className="client-dashboard">

            <ClientLayout>
             <div className="dash_overview">
                <h1 className="text-xl">DASHBOARD .JS</h1>
             </div>
            </ClientLayout>
        </div>
    )
}

export default ClientDashboard
