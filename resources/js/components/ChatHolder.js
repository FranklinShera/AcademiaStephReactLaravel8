import React from 'react'
import Message from "./Message";
import DotLoader from "./DotLoader";

const ChatHolder = ({ messages , isAdmin , clientsName , loading , divRef }) =>{



    return (
        <>

            {(messages.length != 0 && !loading ) && <>
                {messages.map((msg, index) => (
                    <Message msg={msg} key={index} clientName={clientsName} isAdmin={isAdmin}/>
                ))}
                <div className="w-full h-4 my-1" ref={divRef} />
            </>}

            {loading && <DotLoader/>}

            {(messages.length == 0  && !loading) && <>
                <div className="no-messages">
                    <h3>You Don't Have Messages!</h3>
                </div>
            </> }

        </>
    )
}

export default ChatHolder
