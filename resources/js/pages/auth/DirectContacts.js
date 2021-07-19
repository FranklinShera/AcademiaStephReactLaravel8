import React, {useEffect,useState,Fragment} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory} from 'react-router'
import { Dialog, Transition } from '@headlessui/react'

import axios from 'axios'

import AdminLayout from '../../components/auth/AdminLayout'


import WhatsAppIcon from '../../../images/whatsapp.svg'
import MailbackIcon from '../../../images/reply.svg'
import DotLoader from "../../components/DotLoader";



const DirectContacts = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const authUser = useSelector( state => state.authUser)
    const { loggedInUser, auth } = authUser;


    const[newMsg,setNewMsg] = useState("")
    const[loading,setLoading] = useState(true)

    const[contacts,setContacts] = useState([])

    const[directMessage,setDM] = useState({
        id:1,
        name:"Franklin Shera",
        number:"254700080373",
        email:"fshera96@gmail.com",
        message: `Your payment has been successfully submitted. We’ve sent your an email with all of the details of your order.`,
        mailback: 1,
        addonwhatsapp: 1,
        created_at:"11:49 - 12 May 2022",
    })

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    const fetchContacts = (contactsUrl = '/api/auth/admin/direct-contacts') =>{
        setLoading(true)
        axios.get(contactsUrl)
            .then(res =>{
                if(res.status == 200){

                    setContacts(res.data)

                }else{
                    console.log(res)
                }

            })
            .catch(err =>{
                console.log(err)
            })

        setLoading(false)
    }



    const openConversation = (contactersation) =>{

        const clientName = contactersation.client.name.trim().replace(/[^a-zA-Z ]/g, " ").replace(/\s/g, '-').toLowerCase();

        hist.push(`/in/dashboard/contactersation/${contactersation.id}/${clientName}`);

    }




    useEffect(() => {

        if(!auth){
            hist.push("/in")
        }

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Direct Contacts'

        fetchContacts()

    }, [auth])







    return (
        <div className="dashboard">
            <AdminLayout>
             <div className="dash_overview">
                 <div className="direct-contacts">


                     <div className="second-nav">
                         <h1 className="lead-title inline">DIRECT CONTACTS</h1>


                         <div className="second-nav-controls">

                            <span className={ (contacts.links?.prev) ? "p-2 cursor-pointer" : "p-2 text-gray-400"}
                                  onClick={e => {
                                      e.preventDefault()
                                      fetchContacts(links.prev)
                                  }}>
                                <i className="ti-angle-left"></i>PREV
                            </span>
                             <span className={ (contacts.links?.next) ? "p-2 cursor-pointer ml-4" : "p-2 text-gray-400 ml-4"}
                                   onClick={e => {
                                       e.preventDefault()
                                       fetchContacts(links.next)
                                   }}>NEXT
                                <i className="ti-angle-right"></i>
                            </span>
                         </div>
                     </div>

                     <div className="direct-contact-label">

                         <div className="contact-name">
                             Name
                         </div>

                         <div className="contact-number">
                             Number
                         </div>

                         <div className="contact-email">
                             Email
                         </div>

                         <div className="contact-message">
                             Message
                         </div>


                         <div className="contact-add-on">

                         </div>

                         <div className="contact-date">
                             Date
                         </div>

                     </div>

                     <div className="contacts-list">

                         <Transition  show={isOpen} as={Fragment}>
                             <Dialog
                                 as="div"
                                 className="fixed inset-0 z-10 overflow-y-auto"
                                 onClose={closeModal}
                             >
                                 <div className="min-h-screen px-4 text-center">
                                     <Transition.Child
                                         as={Fragment}
                                         enter="ease-out duration-300"
                                         enterFrom="opacity-0"
                                         enterTo="opacity-100"
                                         leave="ease-in duration-200"
                                         leaveFrom="opacity-100"
                                         leaveTo="opacity-0"
                                     >
                                         <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                                     </Transition.Child>

                                     {/* This element is to trick the browser into centering the modal contents. */}
                                     <span
                                         className="inline-block h-screen align-middle"
                                         aria-hidden="true"
                                     >
                                      &#8203;
                                    </span>
                                     <Transition.Child
                                         as={Fragment}
                                         enter="ease-out duration-300"
                                         enterFrom="opacity-0 scale-95"
                                         enterTo="opacity-100 scale-100"
                                         leave="ease-in duration-200"
                                         leaveFrom="opacity-100 scale-100"
                                         leaveTo="opacity-0 scale-95"
                                     >
                                         <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                             <Dialog.Title
                                                 as="h3"
                                                 className="text-xl font-medium leading-6 text-gray-900"
                                             >
                                                 Direct Message
                                             </Dialog.Title>
                                             <div className="mt-2">
                                                 <div className="mb-2 text-gray-800">
                                                     From
                                                     <span className="font-semibold ml-2">{directMessage.name}</span>
                                                     <span className="py-1 px-2 text-sm  rounded bg-gray-50 text-gray-600">{directMessage.email}</span>
                                                 </div>

                                                 <p className="text-sm text-gray-700">
                                                     {directMessage.message}
                                                 </p>

                                                 <div className="flex justify-between items-center mt-5">
                                                     <div className="w-3/5 flex justify-between">
                                                         {(directMessage.mailback == 1) && <span className="flex  items-center w-1/2 ">

                                                             <img src={MailbackIcon} className=" h-5 text-gray-800" alt="Mail back"/>
                                                             <span  className="text-xs text-gray-600">Mail Me Back</span>

                                                         </span>}

                                                         {(directMessage.addonwhatsapp  == 1) && <span className="flex  items-center w-1/2">

                                                             <img src={WhatsAppIcon} className="  h-5" alt="Add on whatsapp"/>
                                                             <span className="text-xs text-gray-600">Add On WhatsApp</span>

                                                         </span>}
                                                     </div>
                                                     <span className="text-xs text-gray-600 italic">{directMessage.created_at}</span>
                                                 </div>
                                             </div>

                                             <div className="mt-4">
                                                 <button
                                                     type="button"
                                                     className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                     onClick={closeModal}
                                                 >
                                                     Got it!
                                                 </button>
                                             </div>
                                         </div>
                                     </Transition.Child>
                                 </div>
                             </Dialog>
                         </Transition>

                         {(contacts.length != 0 && !loading ) && contacts.data.map((contact , index) => (
                             <div className="direct-contact" onClick={e => {
                                 e.preventDefault();
                                 setDM(contact);
                                 openModal();
                             }}>
                                 <div className="contact-name">
                                     {index + 1 +"."} {contact.name}
                                 </div>

                                 <div className="contact-number">
                                     {contact.whatsappnumber}
                                 </div>

                                 <div className="contact-email">
                                     {contact.email}
                                 </div>

                                 <div className="contact-message">
                                     {(contact.message.length > 52) ? contact.message.slice(0,52)+"..." : contact.message}
                                 </div>

                                 <div className="contact-add-on">

                                     {(contact.mailback == 1) && <img src={MailbackIcon} className="h-6 text-gray-800" alt="Mail back"/>}

                                     {(contact.addonwhatsapp  == 1) && <img src={WhatsAppIcon} className="h-6" alt="Add on whatsapp"/>}

                                 </div>

                                 <div className="contact-date ml-1">
                                     {contact.created_at}
                                 </div>
                             </div>
                         ) )}

                         {loading && <DotLoader/>}

                         {(contacts.length == 0  && !loading) && <>
                             <div className="no-messages">
                                 <h3>You Don't Have Contacts!</h3>
                             </div>
                         </> }
                     </div>
                 </div>
             </div>
            </AdminLayout>
        </div>
    )
}

export default DirectContacts;
