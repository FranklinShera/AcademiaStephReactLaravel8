import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory} from 'react-router'

import axios from 'axios'

import AdminLayout from '../../components/auth/AdminLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'
import Message from "../../components/Message";
import DotLoader from "../../components/DotLoader";



const Conversations = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const authUser = useSelector( state => state.authUser)
    const { loggedInUser, auth } = authUser;


    const[newMsg,setNewMsg] = useState("")
    const[loading,setLoading] = useState(true)

    const[conversations,setConversations] = useState([])



    const fetchMessages = () =>{
        setLoading(true)
        axios.get('/api/auth/admin/conversations')
            .then(res =>{
                if(res.status == 200){

                    console.log(res)

                    setConversations(res.data.data)

                }else{
                    console.log(res)
                }

            })
            .catch(err =>{
                console.log(err)
            })

        setLoading(false)
    }



    const openConversation = (conversation) =>{

        const clientName = conversation.client.name.trim().replace(/[^a-zA-Z ]/g, " ").replace(/\s/g, '-').toLowerCase();

        hist.push(`/in/dashboard/conversation/${conversation.id}/${clientName}`);

    }




    useEffect(() => {

        if(!auth){
            hist.push("/in")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Conversations'

        fetchMessages()

    }, [auth])







    return (
        <div className="dashboard">
            <AdminLayout>
             <div className="dash_overview">
                 <div className="messages">


                     <div className="second-nav">
                         <h1 className="lead-title inline">CONVERSATIONS</h1>


                         <div className="second-nav-controls">
                             CONTROLS
                            {/*<span className={ (links.prev) ? "p-2 cursor-pointer" : "p-2 text-gray-400"}*/}
                            {/*      onClick={e => {*/}
                            {/*          e.preventDefault()*/}
                            {/*          getOrders(links.prev)*/}
                            {/*      }}>*/}
                            {/*    <i className="ti-angle-left"></i>PREV*/}
                            {/*</span>*/}
                            {/* <span className={ (links.next) ? "p-2 cursor-pointer ml-4" : "p-2 text-gray-400 ml-4"}*/}
                            {/*       onClick={e => {*/}
                            {/*           e.preventDefault()*/}
                            {/*           getOrders(links.next)*/}
                            {/*       }}>NEXT*/}
                            {/*    <i className="ti-angle-right"></i>*/}
                            {/*</span>*/}
                         </div>
                     </div>

                     <div className="messages-list">


                         {(conversations.length != 0 && !loading ) && conversations.map((conv , index) => (
                             <div className="single-msg" onClick={e => {
                                 e.preventDefault();
                                 openConversation(conv);
                             }}>
                                 <div className="msg-client">
                                     { index+1+". "} {conv.client.name}
                                 </div>
                                 <div className="message-content">
                                     {conv.messages.reverse()[0].content}
                                 </div>
                                 <div className="msg-time">
                                     {conv.messages.reverse()[0].created_at}
                                 </div>
                             </div>
                         ) )}

                         {loading && <DotLoader/>}

                         {(conversations.length == 0  && !loading) && <>
                             <div className="no-messages">
                                 <h3>You Don't Have Conversations!</h3>
                             </div>
                         </> }
                     </div>
                 </div>
             </div>
            </AdminLayout>
        </div>
    )
}

export default Conversations
