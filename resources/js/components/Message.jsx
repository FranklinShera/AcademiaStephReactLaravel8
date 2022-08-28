import React from 'react'

const Message = ({msg ,clientName,isAdmin}) => {
    return (
        <div className={((!isAdmin && msg.direction == 0) ||  (isAdmin && msg.direction == 1)) ? "message self-start bg-blue-400" : "message self-end "}>

            {(msg.direction == 0 && !isAdmin) && (
                <div className="msg-owner">
                    SUPPORT
                </div>
            )}


             {(msg.direction == 1 && isAdmin) && (
                <div className="msg-owner">
                    {clientName}
                </div>
            )}



            <div className="msg-content">
                {msg.content}
            </div>
            <div className="italic font-light text-xs self-end">{msg.created_at}</div>
        </div>
    )
}

export default Message;
