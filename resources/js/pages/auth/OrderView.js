import React, {useEffect,useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory, useParams} from 'react-router'


import axios from 'axios'


import AdminLayout from "../../components/auth/AdminLayout";
import DocumentIcons from "../../components/DocumentIcons";



const OrderView = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const routeParams = useParams();

    const authUser = useSelector( state => state.authUser)
    const { loggedInUser, auth } = authUser;

    const[order,setOrder] = useState({});
    const[writers,setWriters] = useState([]);
    const[assignedWriter,setAssignedWriter] = useState();

    const[orderMaterials,setOrderMaterials] = useState([]);



    const getOrder = (orderID) =>{

        axios.get(`/api/auth/admin/order/${orderID}`)
            .then(res => {
                setOrder(res.data.data)
                setOrderMaterials(res.data.data.additional_materials)
            })
            .catch(err => console.log(err))

        axios.get(`/api/auth/admin/writers`)
            .then(res => {
                setWriters(res.data.data)
            })
            .catch(err => console.log(err))



    }


    const assignOrder = (e) =>{
        e.preventDefault();

        if(assignedWriter == null || assignedWriter == 0){

            Swal.fire({
                icon:'error',
                title:"You Have Not selected Any Writer!"
            })

            return;
        }

        Swal.fire({
            title: 'Assign This Order?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Assign it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post(`/api/auth/admin/assign-order/${order.id}/${assignedWriter}`)
                    .then(res =>{

                        if(res.status == 200){

                            Swal.fire(
                                'Assigned!',
                                res.data.message,
                                'success'
                            )

                        }else{

                            Swal.fire(
                                'Failed To Assign!',
                                res.data.message,
                                'error'
                            )

                        }

                        getOrder(order.id);

                    })

            }
        })
    }


    useEffect(() => {

        if(!auth){

            hist.push("/in")

        }


         getOrder(routeParams.id)

        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Order Preview'


    }, [auth])



    return (
        <div className="dashboard">
            <AdminLayout>
             <div className="dash_overview">
                 <div className="preview-order-page">
                     <h1 className="text-4xl">Order Preview</h1>
                     <h4 className="mt-6 text-lg text-primary-4">Posted On {order && order.created_at_date} at {order && order.created_at_time}</h4>

                     <div className="order-preview">



                         {(order && (order.stage == 2)) && (
                             <div className="unassigned-order-actions py-4 w-ful flex justify-center mb-3 hover:bg-green-200 rounded-md items-center bg-green-700 text-white">
                                <span> ORDER IS ASSIGNED TO {order && order.assigned_to?.name.toUpperCase()}</span>
                                 <button className="bg-white text-green-700  hover:bg-green-700 hover:text-white px-4 py-2 rounded ml-2"> MARK COMPLETE</button>
                             </div>
                         ) }


                         {(order && (order.stage == 4)) && (
                             <div className="unassigned-order-actions py-4 mb-3 hover:bg-indigo-200 bg-indigo-500 rounded-md w-full transition-all delay-75 flex  justify-center items-center">

                                 <select name="writer" id="" className="mr-5 rounded p-2 text-center" onChange={e =>{
                                     setAssignedWriter(e.target.value);
                                 }}>
                                     <option value=""  disabled selected >Choose Writer</option>
                                     {writers.map((writer , index) => (
                                         <option value={writer.id} key={index}  >{writer.name}</option>
                                     ))}
                                 </select>

                                 <button className="text-indigo-600 bg-white px-4 py-2 rounded hover:bg-indigo-600 hover:text-white" onClick={assignOrder}>Assign This Order</button>
                             </div>
                         ) }

                            <div className="order-preview-item">
                                <label>Cost</label>
                                <p>${order && order.cost}</p>
                            </div>

                            <div className="order-preview-item">
                                <label>ID</label>
                                <p>{order && order.serial}</p>
                            </div>


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


                                {(orderMaterials.length != 0) && orderMaterials.map((material , index) => (

                                    <div className="material" key={index}>

                                        <DocumentIcons doctype={material.type} />


                                        <a target="blank" href={`/storage/order/materials/${material.material_name}`}> {material.material_name} </a>

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

            </AdminLayout>
        </div>
    )
}

export default OrderView
