import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory, useParams} from 'react-router'

import axios from 'axios'

import ClientLayout from '../../components/client/ClientLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'
import {ClientFetchOrders} from "../../actions/OrderActions";
import DotLoader from "../../components/DotLoader";



const Orders = ({ location }) => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const routeParams = useParams();

    const authClient = useSelector( state => state.authClient)

    const { clientAuth } = authClient;


    const clientOrders = useSelector( state => state.clientOrders)

    const  { orders , links , loading} = clientOrders


    const SENT_ORDER_URI = '/api/auth/client/orders';
    const PENDING_ORDER_URI = '/api/auth/client/orders-pending';
    const COMPLETED_ORDER_URI = '/api/auth/client/orders-completed';



    const getOrders = (orderLink) =>{
        dispatch(ClientFetchOrders(orderLink))
    }


    const titleCase = (word) =>{

        return word.charAt(0).toUpperCase() + word.slice(1)

    }


    useEffect(() => {


        if(!clientAuth){
            hist.push("/client")
        }



        dispatch(ClientFetchOrders(SENT_ORDER_URI))

        window.scrollTo(0,0)

        document.querySelector('title').text = `AcademiaSteph21 | Client ${ titleCase(routeParams.category) } Orders`


    }, [clientAuth])



    return (
        <div className="dashboard">
            <ClientLayout>
             <div className="dash_overview">
                    <div className="orderview-header">
                        <h1 className=" text-2xl font-bold">{routeParams.category.toUpperCase()} ORDERS</h1>
                        <div className="orderview-controls">
                            <span className={ (links.prev) ? "p-2 cursor-pointer" : "p-2 text-gray-400"}
                                  onClick={e => {
                                      e.preventDefault()
                                      getOrders(links.prev)
                                  }}>
                                <i className="ti-angle-left"></i>PREV
                            </span>
                            <span className={ (links.next) ? "p-2 cursor-pointer ml-4" : "p-2 text-gray-400 ml-4"}
                                onClick={e => {
                                    e.preventDefault()
                                    getOrders(links.next)
                                }}>NEXT
                                <i className="ti-angle-right"></i>
                            </span>
                        </div>
                    </div>
                     <div className="orders-views">

                         <div className="order-view order-view-head">

                             <div className="order-topic">
                                 TOPIC
                             </div>

                              <div className="order-type">
                                 TYPE OF PAPER
                              </div>

                             <div className="order-format">
                                 PROGRESS
                             </div>


                              <div className="order-urgency">
                                 URGENCY
                              </div>

                         </div>
                         { loading && <DotLoader/>}
                         { (orders.length == 0 && !loading) && <h1>We Could not Find Your Orders</h1> }

                         {orders.map( (order , index) => (
                             <div className="order-view bg-gray-100 hover:shadow cursor-pointer p-2">
                                 <div className="order-topic">
                                     {index + 1+". "}{order.topic}
                                 </div>

                                 <div className="order-type">
                                     {order.type_of_paper}
                                 </div>


                                 <div className="order-format">
                                     {(order.stage == 0) && <span className="text-yellow-600"> <i className="ti-info-alt"></i> Pending </span>}
                                     {(order.stage == 1) && <span className="text-green-600"> <i className="ti-thumb-up"></i> Completed </span>}
                                     {(order.stage == 2) && <span className="text-red-600"> <i className="ti-thumb-down"></i> Cancelled </span>}
                                 </div>

                                 <div className="order-urgency">
                                     {order.urgency}
                                 </div>
                             </div>
                         ))}

                     </div>
              </div>
            </ClientLayout>
        </div>
    )
}

export default Orders
