import React from "react";

const CreateMessage = ({ newMsg , sendMessage , setNewMsg }) => {
    return (
        <div className="create-msg">

            <input name="new-message" id="new-message" placeholder="Type Your Message..." value={newMsg} onKeyPress={e => {
                (e.charCode == 13) && sendMessage();
            }} onChange={e => setNewMsg(e.target.value)}/>

            <button onClick={ e => {
                e.preventDefault();
                sendMessage();
            }
            }><i className="ti-location-arrow" /></button>

        </div>
    )
}

export default CreateMessage;
