import React from 'react'

const Message = ({msg ,isAdmin}) => {
    return (
        <div className={(!isAdmin && msg.direction == 0) ? "message self-start bg-blue-400" : "message self-end "}>

            {(msg.direction == 0 && !isAdmin) && (
                <div className="msg-owner">
                    SUPPORT
                </div>
            )}

            <div className="msg-content">
                {msg.content} {(msg.direction == 1) ? "" : "^SK"}
            </div>
            <div className="italic font-light text-xs self-end">{msg.created_at}</div>
        </div>
    )
}

export default Message;
