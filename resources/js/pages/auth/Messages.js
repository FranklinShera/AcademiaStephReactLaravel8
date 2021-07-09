import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory, useParams} from 'react-router'

import axios from 'axios'

import AdminLayout from '../../components/auth/AdminLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'
import Message from "../../components/Message";
import DotLoader from "../../components/DotLoader";



const Messages = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const routeParams = useParams();

    const authUser = useSelector( state => state.authUser)
    const { loggedInUser, auth } = authUser;


    const[newMsg,setNewMsg] = useState("")
    const[loading,setLoading] = useState(true)

    const[messages,setMessages] = useState([])
    const[chatSign,setChatSign] = useState("")


    const getSign = () => {
       let sign =  loggedInUser.name.split(" ");
        setChatSign(" ^"+ sign[0][0] + sign[1][0])
    }

    const fetchMessages = (id) =>{
        setLoading(true)
        axios.get(`/api/auth/admin/conversation/${id}/messages`)
            .then(res =>{
                if(res.status == 200){

                    setMessages(res.data.data)

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

        axios.post('/api/auth/admin/message', { message: newMsg+chatSign , conv_id: routeParams.id})
            .then(res =>{
                if(res.status == 201){

                    window.Toast.fire({
                        icon:"success",
                        title:"Message Sent!"
                    })
                    setNewMsg("")

                    fetchMessages(routeParams.id)

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




    useEffect(() => {

        if(!auth){
            hist.push("/in")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Messages'

        fetchMessages(routeParams.id)
        getSign();

    }, [auth])







    return (
        <div className="dashboard">
            <AdminLayout>
             <div className="dash_overview">
                 <div className="messages">
                     <h1 className="lead-title inline">Messages</h1>
                     <div className="messages-group">

                         {(messages.length != 0 && !loading ) && messages.map((msg , index) => (<Message msg={msg} key={index} clientName={routeParams.clientName.replace(/-/g,"")} isAdmin={true}/>) )}

                         {loading && <DotLoader/>}

                         {(messages.length == 0  && !loading) && <>
                             <div className="no-messages">
                                 <h3>You Don't Have Messages!</h3>
                             </div>
                         </> }

                     </div>


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


                 </div>
             </div>
            </AdminLayout>
        </div>
    )
}

export default Messages
