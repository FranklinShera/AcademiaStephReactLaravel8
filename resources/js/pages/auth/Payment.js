import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory} from 'react-router'

import axios from 'axios'

import AdminLayout from '../../components/auth/AdminLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'
import DotLoader from "../../components/DotLoader";



const Payment = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const authUser = useSelector( state => state.authUser)
    const { loggedInUser, auth } = authUser;



    const[orderPayments,setOrderPayments] = useState([])
    const[loading,setLoading] = useState(true)

    const getMyPayments = () =>{

        axios.get('/api/auth/admin/order-payments')
            .then(response => {

                setOrderPayments(response.data.data);

            }).catch(err => {
            console.log(err)
        })

        setLoading(false)
    }



    useEffect(() => {

        if(!auth){
            hist.push("/in")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Payment'

       getMyPayments();
    }, [auth])





    return (
        <div className="dashboard">
            <AdminLayout>
             <div className="dash_overview">
                 <div className="payments-page">
                     <h1 className="lead-title">My Payments</h1>

                     <div className="payments-list">

                         <div className="payments-list-head">


                             <div className="payment-id">
                                 PAYMENT ID
                             </div>

                             <div className="payment-order-id">
                                 ORDER ID
                             </div>

                             <div className="payment-order-title">
                                 ORDER TITLE
                             </div>

                             <div className="payment-date">
                                 DATE
                             </div>

                             <div className="payment-amount">
                                 AMOUNT($)
                             </div>


                         </div>
                         <div className="payments-list-body">

                             {(orderPayments.length == 0 && loading) && <DotLoader/>}

                             {orderPayments.length != 0 && orderPayments.map(orderPayment => (
                                 <div className="payment-item">

                                     <div className="payment-id">
                                         { orderPayment.payment.paypal_order_id}
                                     </div>

                                     <div className="payment-order-id">
                                         { orderPayment.payment.order_id }
                                     </div>

                                     <div className="payment-order-title">
                                         {  (orderPayment.topic.length > 50) ? orderPayment.topic.slice(0,50)+'...' : orderPayment.topic }
                                     </div>

                                     <div className="payment-date">
                                         { orderPayment.payment.created_at }
                                     </div>

                                     <div className="payment-amount">
                                         ${ orderPayment.payment.amount }
                                     </div>

                                 </div>
                             ))}


                         </div>

                     </div>

                 </div>
             </div>
            </AdminLayout>
        </div>
    )
}

export default Payment
