import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory} from 'react-router'

import axios from 'axios'

import ClientLayout from '../../components/client/ClientLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'
import {ClientFetchOrders} from "../../actions/OrderActions";



const Orders = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const authClient = useSelector( state => state.authClient)

    const { clientAuth } = authClient;


    const clientOrders = useSelector( state => state.clientOrders)

    const  { orders , links } = clientOrders


    const ORDER_URI = '/api/auth/client/orders';

    const getOrders = (orderLink) =>{
        dispatch(ClientFetchOrders(orderLink))
    }

    useEffect(() => {


        if(!clientAuth){
            hist.push("/client")
        }

        dispatch(ClientFetchOrders(ORDER_URI))

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Client Orders'


    }, [clientAuth])



    return (
        <div className="dashboard">
            <ClientLayout>
             <div className="dash_overview">
                    <div className="orderview-header">
                        <h1 className=" text-2xl font-bold">SENT ORDERS</h1>
                        <div className="orderview-controls">
                            <span className={ (links.prev) ? "p-2 cursor-pointer" : "p-2 text-gray-200"}
                                  onClick={e => {
                                      e.preventDefault()
                                      getOrders(links.prev)
                                  }}>
                                <i className="ti-angle-left"></i>PREV
                            </span>
                            <span className={ (links.next) ? "p-2 cursor-pointer ml-4" : "p-2 text-gray-200 ml-4"}
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
                                 PAPER FORMAT
                             </div>


                              <div className="order-urgency">
                                 URGENCY
                              </div>

                         </div>

                         {orders.map( (order , index) => (
                             <div className="order-view bg-gray-100 p-2">
                                 <div className="order-topic">
                                     {index + 1+". "}{order.topic}
                                 </div>

                                 <div className="order-type">
                                     {order.type_of_paper}
                                 </div>


                                 <div className="order-format">
                                     {order.paper_format}
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
