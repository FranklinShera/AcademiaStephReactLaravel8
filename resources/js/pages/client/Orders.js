import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {Redirect, useHistory, useParams} from 'react-router'

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


    const clientOrders = useSelector( state => state.Orders)

    const  { orders , links , loading} = clientOrders


    const SENT_ORDER_URI = '/api/auth/client/orders';
    const PENDING_ORDER_URI = '/api/auth/client/orders-pending';
    const CANCELLED_ORDER_URI = '/api/auth/client/orders-cancelled';
    const ACTIVE_ORDER_URI = '/api/auth/client/orders-active';
    const COMPLETED_ORDER_URI = '/api/auth/client/orders-completed';


    const showOrder = (id , topic) => {

        let topicSlug = topic.replace(/\s/g, '-').toLowerCase();

        hist.push(`/client/dashboard/order-view/${id}/${topicSlug}`);

    }

    const getOrders = (orderLink) =>
    {

        dispatch(ClientFetchOrders(orderLink))

    }


    const titleCase = (word) =>{

        return word.charAt(0).toUpperCase() + word.slice(1)

    }


    useEffect(() => {


        if(!clientAuth){
            hist.push("/client")
        }



        (routeParams.category.toUpperCase() === "SENT") && getOrders(SENT_ORDER_URI);

        (routeParams.category.toUpperCase() === "PENDING") && getOrders(PENDING_ORDER_URI);

        (routeParams.category.toUpperCase() === "CANCELLED") && getOrders(CANCELLED_ORDER_URI);

        (routeParams.category.toUpperCase() === "ACTIVE") && getOrders(ACTIVE_ORDER_URI);

        (routeParams.category.toUpperCase() === "COMPLETED") && getOrders(COMPLETED_ORDER_URI);




        window.scrollTo(0,0)

        document.querySelector('title').text = `AcademiaSteph21 | Client ${ titleCase(routeParams.category) } Orders`


    }, [clientAuth,routeParams.category])



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


                             <div className="order-progress">
                                 PROGRESS
                             </div>


                              <div className="order-urgency">
                                 URGENCY
                              </div>


                              <div className="order-created">
                                 POSTED
                              </div>

                         </div>
                         { loading && <DotLoader/>}
                         { (orders.length == 0 && !loading) && <div className="flex justify-center items-center mt-44">
                             <h1 className="text-3xl text-red-600">
                                 We Could not Find {titleCase(routeParams.category)} Orders
                             </h1>
                         </div> }

                         {orders.map( (order , index) => (
                             <div className="order-view bg-gray-100 hover:shadow cursor-pointer p-2" key={index} onClick={e => {
                                 e.preventDefault();
                                 showOrder(order.id , order.topic)
                             }}>

                                 <div className="order-topic">
                                     { index + 1+". " }{ order.topic.slice(0,50) + "..."}
                                 </div>

                                 <div className="order-type">
                                     { order.type_of_paper }
                                 </div>


                                 <div className="order-progress">
                                     { (order.stage == 0) && <span className="text-yellow-600"> <i className="ti-info-alt"></i> Pending </span> }
                                     { (order.stage == 1) && <span className="text-blue-600"> <i className="ti-thumb-up"></i> Completed </span> }
                                     { (order.stage == 2) && <span className="text-green-600"> <i className="ti-pulse"></i> Active </span> }
                                     { (order.stage == 3) && <span className="text-red-600"> <i className="ti-thumb-down"></i> Cancelled </span> }
                                 </div>

                                 <div className="order-urgency">
                                     { order.urgency }
                                 </div>

                                 <div className="order-created">

                                     <div className="created-date">
                                         { order.created_at_date }
                                     </div>

                                     <div className="created-time">
                                         { order.created_at_time }
                                     </div>

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
