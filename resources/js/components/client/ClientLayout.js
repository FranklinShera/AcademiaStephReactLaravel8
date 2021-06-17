import React,{ useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {useRouteMatch} from 'react-router-dom'

import SideBar from '../auth/SideBar'



//actions
import {  authUserIn, authUserOut } from '../../actions/AuthUserActions'

const AdminLayout = (props) => {

    const dispatch = useDispatch()

    const authUserInAdmin = useSelector((state) => (state.adminPanel))

    const { inAdminPanel , sidebarPosition } = authUserInAdmin

    const linkForSidebar = [
        {
            name : "Orders",
            links: [
                {
                    name:"New Order",
                    url: `/client/dashboard/place-order`
                },
                {
                    name:"Sent Orders",
                    url: `/client/dashboard/orders/sent`
                },
                {
                    name:"Pending Orders",
                    url: `/client/dashboard/orders/pending`
                },
                {
                    name:"Cancelled Orders",
                    url: `/client/dashboard/orders/cancelled`
                },
                {
                    name:"Completed Orders",
                    url: `/client/dashboard/orders/completed`
                },
            ]
        },
        {
            name : "Messages",
            links: [
                {
                    name:"New Messages",
                    url: `/client/dashboard/messages`
                }
            ]
        },
        {
            name : "Payment",
            links: [
                {
                    name:"Received",
                    url: `/client/dashboard/payments`
                }
            ]
        },
        {
            name : "My Profile",
            links: [
                {
                    name:"Personal Information",
                    url: `/client/dashboard/profile`
                },
                {
                    name:"Account Information",
                    url: `/client/dashboard/profile`
                }
            ]
        },

    ]


    useEffect(() => {

        // if(!inAdminPanel){
          dispatch(authUserIn())
        // }


        return () => {
            dispatch(authUserOut())
        }

    }, [])



    return (
        <div className="admin-layout">
            <SideBar className="sidebar_component" links={linkForSidebar}/>
            <div className="dash_items_component">
             {props.children}
            </div>
        </div>
    )
}

export default AdminLayout
