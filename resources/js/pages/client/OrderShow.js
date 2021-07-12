import React, {Fragment, useEffect, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {Redirect, useHistory, useParams} from 'react-router'




import axios from 'axios'

import ClientLayout from '../../components/client/ClientLayout'
import {Dialog, Transition} from "@headlessui/react";
import {FileInputField} from "../../config/FormElements";
import {useFormik} from "formik";
import * as Yup from "yup";
import DocumentIcons from "../../components/DocumentIcons";





const OrderShow = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const routeParams = useParams();

    const authClient = useSelector( state => state.authClient)
    const { clientAuth } = authClient;

    const[order,setOrder] = useState({});
    const[orderMaterials,setOrderMaterials] = useState([]);
    const[showMaterialForm,setAddMaterial] = useState(false);
    const[showOrderPayment,setShowOrderPayment] = useState(false);

    // additional_materials: [],​


    const getOrder = (orderID) =>{
        axios.get(`/api/auth/client/order/${orderID}`)
            .then(res => {
                setOrder(res.data.data)
                setOrderMaterials(res.data.data.additional_materials)
            })
            .catch(err => console.log(err))
    }




    const SUPPORTED_FORMATS = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/msword',
        'application/pdf',
        'text/plain',
        'image/jpeg',
        'image/png',
        'application/x-zip-compressed',
    ]


    const Formik = useFormik({
        initialValues:{
            additionalMaterials: null
        },
        validationSchema:Yup.object({
            additionalMaterials: Yup.mixed()
                .nullable()
                .notRequired()
                .test("FILE_SIZE", "Uploaded file is too big!",
                    value =>  {
                        return !value || value && value.size <= 5000000
                    })
                .test("FILE_FORMAT", "Uploaded file has unsupported format!",
                    value => {
                        return  !value || value && SUPPORTED_FORMATS.includes(value.type)
                    })
        }),
        onSubmit: (values, { setSubmitting , resetForm }) => {

            submitMaterialForm(values)

            resetForm({ values:{
                    additionalMaterials: null,
                }})

            setSubmitting(false)

        }
    })



    const deleteMaterial = (materialId) =>{

        axios.delete('/api/auth/client/material/'+ materialId)
            .then(res => {
                if(res.status == 200){

                    window.Toast.fire({
                        icon: 'success',
                        title: res.data.message
                    })

                    getOrder(routeParams.id)

                }else{
                    window.Toast.fire({
                        icon: 'error',
                        title: res.data.message
                    })
                }
            })
            .catch(err =>{
                console.log(err)
            })

    }


    const submitMaterialForm = (formFields) =>{

        let materialFormData = new FormData();

        materialFormData.append("additional_materials" , formFields.additionalMaterials)


        axios.post('/api/auth/client/add-material/'+ order.id,
            materialFormData ,
            {
                headers:{
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => {
                if(res.status == 201){

                    window.Toast.fire({
                        icon: 'success',
                        title: res.data.message
                    })

                    setAddMaterial(false)
                    getOrder(routeParams.id)
                }
            })
            .catch(err =>{
                console.log(err)
            })
    }



    const payForOrder = (e) =>{
        e.preventDefault();

        window.Toast.fire({
            icon: "success",
            title: "Paying For Order..."
        })

    }


const payNow = (id) =>{
        window.location = `/paypal/checkout/${id}`
}

    useEffect(() => {

        if(!clientAuth){

            hist.push("/client")

        }


         getOrder(routeParams.id)

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Order Preview'


    }, [clientAuth])



    return (
        <div className="dashboard">
            <ClientLayout>
             <div className="dash_overview">
                 <div className="preview-order-page">
                     <h1 className="text-4xl">Order Preview</h1>
                     <h4 className="mt-6 text-lg text-primary-4">Posted On {order && order.created_at_date} at {order && order.created_at_time}</h4>

                     <Transition.Root show={showMaterialForm} as={Fragment}>
                         <Dialog
                             as="div"
                             static
                             className="fixed z-10 inset-0 overflow-y-auto"
                             open={showMaterialForm}
                             onClose={setAddMaterial}
                         >
                             <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                 <Transition.Child
                                     as={Fragment}
                                     enter="ease-out duration-300"
                                     enterFrom="opacity-0"
                                     enterTo="opacity-100"
                                     leave="ease-in duration-200"
                                     leaveFrom="opacity-100"
                                     leaveTo="opacity-0"
                                 >
                                     <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                                 </Transition.Child>

                                 {/* This element is to trick the browser into centering the modal contents. */}
                                 <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                    &#8203;
                                  </span>
                                 <Transition.Child
                                     as={Fragment}
                                     enter="ease-out duration-300"
                                     enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                     enterTo="opacity-100 translate-y-0 sm:scale-100"
                                     leave="ease-in duration-200"
                                     leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                     leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                 >
                                     <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                         <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                                             <div className="mt-3 text-center sm:mt-0  sm:text-left">
                                                 <div className="flex items-center">
                                                     <div className="flex-shrink-0 inline flex items-center justify-center  w-8 h-8 rounded-full bg-yellow-100">

                                                         <svg className="h-5 w-5 "
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              xmlnsXlink="http://www.w3.org/1999/xlink"
                                                              viewBox="0 0 26 26" fill="717171">
                                                             <path d="M2.09375 4.09375C1.839844 4.09375 1.566406 4.179688 1.375 4.375C0.988281 4.761719 0.988281 5.394531 1.375 5.78125L8.21875 12.625C8.414063 12.820313 8.652344 12.90625 8.90625 12.90625C9.160156 12.90625 9.433594 12.816406 9.625 12.625C10.011719 12.238281 10.011719 11.605469 9.625 11.21875L2.78125 4.375C2.585938 4.179688 2.347656 4.09375 2.09375 4.09375 Z M 23.90625 4.09375C23.652344 4.09375 23.414063 4.179688 23.21875 4.375L16.375 11.21875C15.988281 11.605469 15.988281 12.238281 16.375 12.625C16.566406 12.816406 16.839844 12.90625 17.09375 12.90625C17.347656 12.90625 17.585938 12.820313 17.78125 12.625L24.625 5.78125C25.011719 5.394531 25.011719 4.761719 24.625 4.375C24.433594 4.179688 24.160156 4.09375 23.90625 4.09375 Z M 1 11C0.449219 11 0 11.449219 0 12L0 15C0 15.550781 0.449219 16 1 16L2 16L2 17C2 17.089844 4 25 4 25C4.296875 25.53125 4.546875 26 5 26L21 26C21.550781 26 21.765625 25.5625 22 25C22 25 24 17.089844 24 17L24 16L25 16C25.550781 16 26 15.550781 26 15L26 12C26 11.449219 25.550781 11 25 11L20.90625 11L18.34375 13.5625C17.953125 13.953125 17.425781 14.1875 16.875 14.1875C16.324219 14.1875 15.828125 13.953125 15.4375 13.5625C14.738281 12.867188 14.636719 11.796875 15.15625 11L10.84375 11C11.363281 11.796875 11.261719 12.867188 10.5625 13.5625C10.171875 13.953125 9.675781 14.1875 9.125 14.1875C8.574219 14.1875 8.046875 13.953125 7.65625 13.5625L5.09375 11 Z M 9 16C9.550781 16 10 16.449219 10 17L10 23C10 23.550781 9.550781 24 9 24C8.449219 24 8 23.550781 8 23L8 17C8 16.449219 8.449219 16 9 16 Z M 13 16C13.550781 16 14 16.449219 14 17L14 23C14 23.550781 13.550781 24 13 24C12.449219 24 12 23.550781 12 23L12 17C12 16.449219 12.449219 16 13 16 Z M 17 16C17.550781 16 18 16.449219 18 17L18 23C18 23.550781 17.550781 24 17 24C16.449219 24 16 23.550781 16 23L16 17C16 16.449219 16.449219 16 17 16Z" fill="717171" />
                                                         </svg>

                                                     </div>

                                                     <Dialog.Title as="h3" className="ml-2 text-lg leading-6 font-semibold text-gray-900 inline">
                                                         Add Material
                                                     </Dialog.Title>
                                                 </div>
                                                 <div className="mt-2">
                                                     <form action="" onSubmit={Formik.handleSubmit}>

                                                         <FileInputField
                                                             labelText=""
                                                             name="additionalMaterials"
                                                             onBlur={Formik.handleBlur}
                                                             value={Formik.values.additionalMaterials}
                                                             onChange={(e) => {
                                                                 e.preventDefault();
                                                                 Formik.setFieldValue("additionalMaterials" , e.target.files[0]);
                                                             }}
                                                             errors={(Formik.errors.additionalMaterials && Formik.touched.additionalMaterials) && Formik.errors.additionalMaterials}
                                                         />

                                                         <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                                                             <button
                                                                 type="button"
                                                                 className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                                 onClick={() => setAddMaterial(false)}
                                                             >
                                                                 Cancel
                                                             </button>
                                                             <button
                                                                 type="submit"
                                                                 className="mt-3 w-full inline-flex bg-green-600 justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-white hover:text-green-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"

                                                             >
                                                                 Add
                                                             </button>
                                                         </div>
                                                     </form>
                                                 </div>
                                             </div>

                                         </div>

                                     </div>
                                 </Transition.Child>
                             </div>
                         </Dialog>
                     </Transition.Root>

                     <div className="order-preview">

                         <Transition.Root show={showOrderPayment} as={Fragment}>
                             <Dialog
                                 as="div"
                                 static
                                 className="fixed z-10 inset-0 overflow-y-auto"
                                 open={showOrderPayment}
                                 onClose={setShowOrderPayment}
                             >
                                 <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                     <Transition.Child
                                         as={Fragment}
                                         enter="ease-out duration-300"
                                         enterFrom="opacity-0"
                                         enterTo="opacity-100"
                                         leave="ease-in duration-200"
                                         leaveFrom="opacity-100"
                                         leaveTo="opacity-0"
                                     >
                                         <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
                                     </Transition.Child>

                                     {/* This element is to trick the browser into centering the modal contents. */}
                                     <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                    &#8203;
                                  </span>
                                     <Transition.Child
                                         as={Fragment}
                                         enter="ease-out duration-300"
                                         enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                         enterTo="opacity-100 translate-y-0 sm:scale-100"
                                         leave="ease-in duration-200"
                                         leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                         leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                     >
                                         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                                                 <div className="mt-3 text-center sm:mt-0  sm:text-left">
                                                     <div className="flex items-center">
                                                         <div className="flex-shrink-0 inline flex items-center justify-center  w-8 h-8 rounded-full bg-yellow-100">

                                                             <svg className="h-5 w-5 "
                                                                  xmlns="http://www.w3.org/2000/svg"
                                                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                  viewBox="0 0 26 26" fill="717171">
                                                                 <path d="M2.09375 4.09375C1.839844 4.09375 1.566406 4.179688 1.375 4.375C0.988281 4.761719 0.988281 5.394531 1.375 5.78125L8.21875 12.625C8.414063 12.820313 8.652344 12.90625 8.90625 12.90625C9.160156 12.90625 9.433594 12.816406 9.625 12.625C10.011719 12.238281 10.011719 11.605469 9.625 11.21875L2.78125 4.375C2.585938 4.179688 2.347656 4.09375 2.09375 4.09375 Z M 23.90625 4.09375C23.652344 4.09375 23.414063 4.179688 23.21875 4.375L16.375 11.21875C15.988281 11.605469 15.988281 12.238281 16.375 12.625C16.566406 12.816406 16.839844 12.90625 17.09375 12.90625C17.347656 12.90625 17.585938 12.820313 17.78125 12.625L24.625 5.78125C25.011719 5.394531 25.011719 4.761719 24.625 4.375C24.433594 4.179688 24.160156 4.09375 23.90625 4.09375 Z M 1 11C0.449219 11 0 11.449219 0 12L0 15C0 15.550781 0.449219 16 1 16L2 16L2 17C2 17.089844 4 25 4 25C4.296875 25.53125 4.546875 26 5 26L21 26C21.550781 26 21.765625 25.5625 22 25C22 25 24 17.089844 24 17L24 16L25 16C25.550781 16 26 15.550781 26 15L26 12C26 11.449219 25.550781 11 25 11L20.90625 11L18.34375 13.5625C17.953125 13.953125 17.425781 14.1875 16.875 14.1875C16.324219 14.1875 15.828125 13.953125 15.4375 13.5625C14.738281 12.867188 14.636719 11.796875 15.15625 11L10.84375 11C11.363281 11.796875 11.261719 12.867188 10.5625 13.5625C10.171875 13.953125 9.675781 14.1875 9.125 14.1875C8.574219 14.1875 8.046875 13.953125 7.65625 13.5625L5.09375 11 Z M 9 16C9.550781 16 10 16.449219 10 17L10 23C10 23.550781 9.550781 24 9 24C8.449219 24 8 23.550781 8 23L8 17C8 16.449219 8.449219 16 9 16 Z M 13 16C13.550781 16 14 16.449219 14 17L14 23C14 23.550781 13.550781 24 13 24C12.449219 24 12 23.550781 12 23L12 17C12 16.449219 12.449219 16 13 16 Z M 17 16C17.550781 16 18 16.449219 18 17L18 23C18 23.550781 17.550781 24 17 24C16.449219 24 16 23.550781 16 23L16 17C16 16.449219 16.449219 16 17 16Z" fill="717171" />
                                                             </svg>

                                                         </div>

                                                         <Dialog.Title as="h3" className="ml-2 text-lg leading-6 font-semibold text-gray-900 inline">
                                                             Pay For Order!
                                                         </Dialog.Title>
                                                     </div>
                                                     <div className="mt-2">


                                                     </div>
                                                     <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                                                         <button
                                                             type="button"
                                                             className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                             onClick={() => setAddMaterial(false)}
                                                         >
                                                             Cancel
                                                         </button>
                                                         <button
                                                             type="submit"
                                                             className="mt-3 w-full inline-flex bg-green-600 justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-white hover:text-green-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"

                                                         >
                                                             Add
                                                         </button>
                                                     </div>
                                                 </div>

                                             </div>

                                         </div>
                                     </Transition.Child>
                                 </div>
                             </Dialog>
                         </Transition.Root>


                         {(order && order.stage == "0") && (
                             <>
                                 <div className="order-preview-notification">
                                     Pay For This Order For It To Be Assignable!
                                     <span
                                         className="payaction"
                                         onClick={e =>{
                                             e.preventDefault();
                                             payNow(order.id);

                                         }}
                                     >Pay ${order && order.cost} Now!</span>
                                 </div>

                             </>
                         )}

                         {(order && order.stage !== "0") && (
                             <div className="order-preview-item">
                                 <label>Cost</label>
                                 <p>${order && order.cost}</p>
                             </div>
                         )}

                        {(order && order.stage !== "0") && (
                             <div className="order-preview-item">
                                 <label>ID</label>
                                 <p>{order && order.serial}</p>
                             </div>
                         )}



                         <div className="order-preview-item">
                                <label>Topic</label>
                                <p>{order && order.topic}</p>
                            </div>


                            <div className="order-preview-item">
                                <label>Type of Paper</label>
                                <p>{order && order.type_of_paper}</p>
                            </div>


                            <div className="order-preview-item">
                                <label>Subject Area</label>
                                <p>{order && order.subject_area}</p>
                            </div>


                            <div className="order-preview-item">
                                <label>Paper Details</label>
                                <p>{order && order.paper_details}</p>
                            </div>


                            <div className="order-preview-item">
                                <label>Additional Materials
                                    <span className="ml-3 p-2 text-white text-xs bg-blue-500 rounded-lg">
                                        { orderMaterials.length || "0"}
                                    </span>
                                    <span
                                        className="ml-5 p-2 text-white text-xs bg-green-500 rounded-full cursor-pointer"
                                        onClick={e => {
                                            e.preventDefault();
                                            setAddMaterial(true);
                                        }}
                                    >
                                        <i className="ti-plus"></i>
                                    </span>
                                </label>

                                {(orderMaterials.length != 0) && orderMaterials.map((material , index) => (

                                    <div className="material" key={index}>

                                         <DocumentIcons doctype={material.type} />

                                        <a target="blank" href={`/storage/order/materials/${material.material_name}`}> {material.material_name} </a>

                                        <span
                                            className="ml-5"
                                            onClick={e =>{
                                            e.preventDefault();
                                            window.Swal.fire({
                                                title: 'Are you sure?',
                                                text: "You won't be able to revert this!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Yes, delete it!'
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                   deleteMaterial(material.id)
                                                }
                                            })
                                        }}>
                                            <i className="ti-trash text-red-600 h-5"></i>
                                        </span>
                                    </div>

                                ))}

                            </div>


                            <div className="order-preview-item">
                                <label>Paper Format</label>
                                <p>{order && order.paper_format}</p>
                            </div>


                            <div className="order-preview-item">
                                <label>Preferred English</label>
                                <p>{order && order.prefered_english}</p>
                            </div>


                            <div className="order-preview-item">
                                <label>Number of Sources</label>
                                <p>{order && order.number_of_sources}</p>
                            </div>


                            <div className="order-preview-item">
                                <label>Spacing</label>
                                <p>{order && order.spacing}</p>
                            </div>


                            <div className="order-preview-item">
                                <label>Academic Level</label>
                                <p>{order && order.academic_level}</p>
                            </div>


                            <div className="order-preview-item">
                                <label>Number of Pages</label>
                                <p>{order && order.number_of_pages}</p>
                            </div>


                            <div className="order-preview-item">
                                <label>Urgency</label>
                                <p>{order && order.urgency}</p>
                            </div>


                     </div>
               </div>
             </div>

            </ClientLayout>
        </div>
    )
}

export default OrderShow
