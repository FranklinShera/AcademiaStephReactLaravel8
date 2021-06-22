import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory, useParams} from 'react-router'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import axios from 'axios'

import ClientLayout from '../../components/client/ClientLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'
import {FileInputField, InputField, SelectInputField, TextAreaInputField} from "../../config/FormElements";
import {
    adminFetchPaperTypes,
    fetchAcademicLevels,
    fetchPaperTypes,
    fetchSubjectAreas
} from "../../actions/OrderActions";



const OrderShow = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const routeParams = useParams();

    const authClient = useSelector( state => state.authClient)
    const { clientAuth } = authClient;

    const[order,setOrder] = useState({});

    // additional_materials: [],​


    const getOrder = (orderID) =>{
        axios.get(`/api/auth/client/order/${orderID}`)
            .then(res => {
                setOrder(res.data.data)
            })
            .catch(err => console.log(err))
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

                     <div className="order-preview">

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
                                <label>Additional Materials</label>

                                {(order && order.additional_materials) && order.additional_materials.map((material , index) => {
                                    <span className="material" key={index}>{material.material_name} | {material.type}</span>
                                })}
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
