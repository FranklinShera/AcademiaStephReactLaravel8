import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const Notification = ({userType}) => {

    const authUser = useSelector( state => state.authUser)
    const { notifications } = authUser;

    const[user,setUser] = useState("")

    useEffect(()=>{

        setUser((userType == 1) ? "Admin " : (userType == 0) ? "Client " : "x")

    },[])

    return (
       <>
           {(notifications.length != 0) && (
               <div className="notification flex items-center">
                   <i className="ti-comment-alt mr-2 text-primary-1"></i>
                   <h1>{notifications[0]?.show && notifications[0]?.msg }</h1>
               </div>
           )}
       </>
    )

}


export default Notification;
