import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory} from 'react-router'

import axios from 'axios'

import ClientLayout from '../../components/client/ClientLayout'

import PayPalIcon from '../../../images/paypal.svg'



const PaymentSuccess = () => {

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

        document.querySelector('title').text = 'AcademiaSteph21 | Order Payment Success'


    }, [clientAuth])


        useEffect(() => {


            setTimeout(() => {

                hist.push('/client/dashboard/orders/sent')

            },3500)

        } , [])

    return (
        <div className="dashboard">
            <ClientLayout>
             <div className="dash_overview">
                <div className="payment-successful-page">
                    <img src={PayPalIcon} alt="PayPal Icon" className="h-56"/>
                    <h1 className="text-3xl text-paypal-1">Payment Successful!</h1>

                </div>
             </div>
            </ClientLayout>
        </div>
    )
}

export default PaymentSuccess
