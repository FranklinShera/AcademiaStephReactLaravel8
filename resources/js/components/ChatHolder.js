import React from 'react'
import Message from "./Message";
import DotLoader from "./DotLoader";

const ChatHolder = ({ messages , isAdmin , clientsName , loading , divRef }) =>{



    return (
        <>

            {(messages.length != 0 && !loading ) && <> {messages.map((msg, index) => (
                    <Message msg={msg} key={index} clientName={clientsName} isAdmin={isAdmin}/>
                ))}

                <div className="w-full h-4 py-2 flex justify-center items-center " ref={divRef}>
                    <span className="text-center italic text-xs text-gray-400 bg-gray-50 py-1 px-3 rounded-2xl">Today</span>
                </div>

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

export default ChatHolder;
