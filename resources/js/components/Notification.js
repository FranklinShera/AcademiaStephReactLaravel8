import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const Notification = ({userType}) => {

    const authUser = useSelector( state => state.authUser)
    const { notifications } = authUser;

    const[user,setUser] = useState("")
    const[countDown,setCountDown] = useState()

    useEffect(()=>{

        setUser((userType == 1) ? "Admin " : (userType == 0) ? "Client " : "x")

    },[])

    return (
       <>
           {(notifications != "") && (
               <div className={`notification flex items-center `}>
                   <i className="ti-comment-alt mr-2 text-primary-1"></i>
                   <h1>{notifications}</h1>
               </div>
           )}
       </>
    )

}


export default Notification;
