import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory} from 'react-router'

import axios from 'axios'

import AdminLayout from '../../components/auth/AdminLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'



const Payment = () => {

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

        document.querySelector('title').text = 'AcademiaSteph21 | Payment'
        
       
    }, [auth])



   

        // window.Toast.fire({
        //     icon: 'success',
        //     title: 'T REQ PRESSED!'
        //   })
  

  

    return (
        <div className="dashboard">
            <AdminLayout>
             <div className="dash_overview">
                <h1>Payment Page</h1>
             </div>
            </AdminLayout>
        </div>
    )
}

export default Payment
