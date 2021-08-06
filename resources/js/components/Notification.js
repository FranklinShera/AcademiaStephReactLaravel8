import React, {useEffect, useState} from "react";

const Notification = ({userType}) => {

    const[user,setUser] = useState("")

    useEffect(()=>{

        setUser((userType == 1) ? "Admin " : (userType == 0) ? "Client " : "x")

    },[])

    return (
        <div className="notification flex items-center">
            <i className="ti-comment-alt mr-2 text-primary-1"></i>
            {user}
            <h1>You Have New Notifications Now!</h1>
        </div>
    )

}


export default Notification;
