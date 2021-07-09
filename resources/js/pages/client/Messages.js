import React, {useEffect, useRef, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory} from 'react-router'

import axios from 'axios'

import ClientLayout from '../../components/client/ClientLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'
import Message from "../../components/Message";
import DotLoader from "../../components/DotLoader";
import ChatHolder from "../../components/ChatHolder";



const Messages = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const authClient = useSelector( state => state.authClient)
    const { clientAuth } = authClient;


    const messagesEndRef = useRef(null)

    const[newMsg,setNewMsg] = useState("")
    const[loading,setLoading] = useState(true)

    const[messages,setMessages] = useState([])

    const fetchMessages = () =>{
        setLoading(true)
        axios.get('/api/auth/client/messages')
            .then(res =>{
                if(res.status == 200){

                    setMessages(res.data.data)
                    scrollToBottom();

                }else{
                    console.log(res)
                }

            })
            .catch(err =>{
                console.log(err)
            })

        setLoading(false)
    }

    const sendMessage = () =>{

        if(newMsg === ""){
            window.Swal.fire({
                icon:"error",
                title:"Message Cannot Be Null!"
            })

            return;
        }

        setLoading(true)

        axios.post('/api/auth/client/message', { message: newMsg})
            .then(res =>{
                if(res.status == 201){

                    window.Toast.fire({
                        icon:"success",
                        title:"Message Sent!"
                    })
                    setNewMsg("")

                    fetchMessages();

                }else{
                    window.Toast.fire({
                        icon:"error",
                        title:"Message Not Sent!"
                    })
                }

            })
            .catch(err =>{
                console.log(err)
            })

    }



    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {



        if(!clientAuth){
            hist.push("/client")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Client Messages'

        fetchMessages();

    }, [clientAuth])



    return (
        <div className="dashboard">
            <ClientLayout>
             <div className="dash_overview">
              <div className="messages">
                   <h1 className="lead-title inline">Messages</h1>
                  <div className="messages-group">

                      <ChatHolder messages={messages}  isAdmin={false} clientsName="SUPPORT" loading={loading} divRef={messagesEndRef}/>

                  </div>

                  {/*{messages.length != 0 &&*/}
                  <div className="create-msg">

                      <input name="new-message" id="" value={newMsg} onKeyPress={e => {
                          (e.charCode == 13) && sendMessage();
                      }} onChange={e => setNewMsg(e.target.value)}/>

                      <button onClick={ e => {
                          e.preventDefault();
                          sendMessage();
                      }
                      }>SEND</button>
                  </div>
                  {/*// }*/}

              </div>
             </div>
            </ClientLayout>
        </div>
    )
}

export default Messages
