import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory} from 'react-router'

import axios from 'axios'

import ClientLayout from '../../components/client/ClientLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'
import Message from "../../components/Message";



const Messages = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const authClient = useSelector( state => state.authClient)
    const { clientAuth } = authClient;

    let initialMessages = [
        {
            client_id: 1,
            direction: 1,
            content: "Hello"
        },

        {
            client_id: 1,
            direction: 0,
            content: "How is work"
        },

        {
            client_id: 1,
            direction: 0,
            content: "I am Feeling Fine"
        },

        {
            client_id: 1,
            direction: 1,
            content: "The Book was not fully covered by the writer"
        },

        {
            client_id: 1,
            direction: 0,
            content: "My order is late!"
        },

        {
            client_id: 1,
            direction: 1,
            content: "PayPal payment is down!"
        }

    ]

    const[newMsg,setNewMsg] = useState("")

    const[messages,setMessages] = useState(initialMessages)


    const getDirection = () => {
        let lastDirection = messages.reverse()[0].direction

        return (lastDirection == 1) ? 0 : 1;
    }

    const sendMessage = () =>{

        let msg = {
            client_id: 1,
            direction: getDirection(),
            content: newMsg
        }

        initialMessages = messages;
        initialMessages.push(msg);

        setMessages(initialMessages);

        setNewMsg("")
    }

    useEffect(() => {

        if(!clientAuth){
            hist.push("/client")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Client Messages'


    }, [clientAuth])



    return (
        <div className="dashboard">
            <ClientLayout>
             <div className="dash_overview">
              <div className="messages">
                  <div className="message-head">
                      <h1 className="lead-title inline">Messages</h1>

                      {messages.length != 0 && <div className="create-msg">

                          <input name="new-message" id="" value={newMsg} onChange={e => setNewMsg(e.target.value)}/>

                          <button onClick={ e => {
                              e.preventDefault();
                              sendMessage();
                          }
                          }>SEND</button>
                      </div> }

                  </div>
                  <div className="messages-group">


                         {messages.length != 0 && messages.map((msg , index) => (<Message msg={msg} isAdmin={false}/>) )}



                      {(messages.length == 0) && <>
                          <div className="no-messages">
                              <h3>You Don't Have Messages!</h3>
                          </div>
                      </> }



                  </div>
              </div>
             </div>
            </ClientLayout>
        </div>
    )
}

export default Messages
