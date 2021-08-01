import React,{ useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {useRouteMatch} from 'react-router-dom'

import SideBar from './SideBar'

import DesktopOnly from '../../images/desk_screen.svg'


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
                    name:"Received Orders",
                    url: `/in/dashboard/orders/received`
                },
                {
                    name:"Pending Orders",
                    url: `/in/dashboard/orders/pending`
                },
                {
                    name:"Unassigned Orders",
                    url: `/in/dashboard/orders/unassigned`
                },
                {
                    name:"Cancelled Orders",
                    url: `/in/dashboard/orders/cancelled`
                },
                {
                    name:"Active Orders",
                    url: `/in/dashboard/orders/active`
                },

                {
                    name:"Completed Orders",
                    url: `/in/dashboard/orders/completed`
                },
            ]
        },
        {
            name : "Writers",
            links: [
                {
                    name:"All Writers",
                    url: `/in/dashboard/writers`
                }
            ]
        },
        {
            name : "Messages",
            links: [
                {
                    name:"Conversations",
                    url: `/in/dashboard/conversations`
                },
                {
                    name:"Direct Contacts",
                    url: `/in/dashboard/direct-contacts`
                }
            ]
        },
        {
            name : "Payment",
            links: [
                {
                    name:"Received",
                    url: `/in/dashboard/payments`
                }
            ]
        },
        {
            name : "Control",
            links: [
                {
                    name: "Order Input",
                    url: "/in/dashboard/control/order-input"
                }
            ],

        },
        {
            name : "My Profile",
            links: [
                {
                    name:"Personal Information",
                    url: `/in/dashboard/profile`
                }
            ]
        }
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
        <>
            <div className="lg:hidden flex flex-col justify-center items-center">
                <img src={DesktopOnly}  className="mb-1" alt=""/>
                <span class="text-center text-xl font-bold">Ooops!</span>
                <span class="text-center text-sm">Dashboard currently supports Desktop Screen Only</span>
            </div>
            <div className="backend-layout">
                <SideBar className="sidebar_component" isAdmin={true} links={linkForSidebar}/>
                <div className="dash_items_component">
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default AdminLayout
