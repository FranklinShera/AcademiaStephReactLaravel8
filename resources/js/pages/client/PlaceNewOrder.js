import React, {Fragment, useEffect, useRef, useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {useHistory} from 'react-router'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import axios from 'axios'

import ClientLayout from '../../components/client/ClientLayout'


//actions
import {  logoutUser } from '../../actions/AuthUserActions'
import {FileInputField, InputField, SelectInputField, TextAreaInputField} from "../../config/FormElements";
import {
    adminFetchPaperTypes,
    fetchAcademicLevels, fetchPaperFormats,
    fetchPaperTypes, fetchPrefferedEnglish,
    fetchSubjectAreas
} from "../../actions/OrderActions";
import {Dialog, Transition} from "@headlessui/react";
import {ExclamationIcon} from "@heroicons/react/outline";



const Orders = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const[localOrders,setLocalOrders] = useState([])


    const [open, setOpen] = useState(false)

    const cancelButtonRef = useRef(null)



    const authClient = useSelector( state => state.authClient)
    const { clientAuth } = authClient;


    const AcademicLevels = useSelector( state => state.academicLevels)
    const { allAcademicLevels  } = AcademicLevels;


    const PaperTypes = useSelector( state => state.paperTypes)
    const { allPaperTypes } = PaperTypes;


    const SubjectAreas = useSelector( state => state.subjectAreas)
    const { allSubjectAreas } = SubjectAreas;


    const PaperFormats = useSelector( state => state.paperFormats)
    const { allPaperFormats} = PaperFormats;

    const PreffEnglish = useSelector( state => state.preffEnglish)
    const { allPreffEnglish } = PreffEnglish;






    const LOCAL_STORAGE_KEY = "savedOrders";



    const spacingTypes = [
        {
            name : "Double Spacing",
            value: "Double"
        },
        {
            name : "Single Spacing",
            value: "Single"
        }
    ]

    let numberOfPages = 1



    const urgency = [
        {
            name : "6 Hours",
            value: "6 Hours"
        }
        ,
        {
            name : "12 Hours",
            value: "12 Hours"
        }
        ,
        {
            name : "1 Day",
            value: "1 Day"
        }
        ,
        {
            name : "2 Days",
            value: "2 Days"
        }
        ,
        {
            name : "2 Days",
            value: "2 Days"
        }
        ,
        {
            name : "3 Days",
            value: "3 Days"
        }
        ,
        {
            name : "5 Days",
            value: "5 Days"
        }
        ,
        {
            name : "7 Days",
            value: "7 Days"
        }
        ,
        {
            name : "10 Days",
            value: "10 Days"
        }
        ,
        {
            name : "2 Weeks",
            value: "2 Weeks"
        }
        ,
        {
            name : "1 Month",
            value: "1 Month"
        }
        ,
        {
            name : "2 Months",
            value: "2 Months"
        }
    ]

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

    const initial = {
        topic: '',
            typeOfPaper: '',
            subjectArea: '',
            paperDetails: '',
            additionalMaterials: null,
            paperFormat: '',
            prefEnglish: '',
            numOfSources: '',
            spacing: '',
            academicLevel: '',
            numberOfPages: '',
            urgency: ''
    }

    const[savedValues,setSavedValues] = useState(null)

    const Formik = useFormik({

        initialValues: savedValues || initial ,
        validationSchema:Yup.object({
            topic: Yup.string()
                     .min(8,"Topic must be atleast 8 characters!").required("Topic is a required field"),
            typeOfPaper: Yup.string().required("Type of Paper is a required field"),
            subjectArea: Yup.string().required("Subject Area is a required field"),
            paperDetails: Yup.string().required("Paper Details is a required field"),
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
                    }),
            paperFormat: Yup.string().required("Paper Format is a required field"),
            prefEnglish: Yup.string().required("Preferred English is a required field"),
            numOfSources: Yup.string().required("Number of Sources is a required field"),
            spacing: Yup.string().required("Spacing is a required field"),
            academicLevel: Yup.string().required("Academic Level is a required field"),
            numberOfPages: Yup.string().required("Number of Pages is a required field"),
            urgency: Yup.string().required("Urgency is a required field")
        }),
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting , resetForm }) => {

            submitPlaceOrderForm(values)

            resetForm()

            setSubmitting(false)

        }
    })


    const saveOrder = (e) =>{
          e.preventDefault()

            if (Formik.values.topic == ''){

                window.Swal.fire({
                    icon:"error",
                    title:"You Cant Save Without Order Topic!"
                })

                return;
            }

           let newSave = [];

           if(localOrders.length != 0){
               newSave.push(...localOrders)
           }

           newSave.unshift(Formik.values)

           localStorage.removeItem(LOCAL_STORAGE_KEY)

           localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSave))

           checkLocalOrders()

        Formik.resetForm();

    }

   const submitPlaceOrderForm = (formFields) =>{

        let orderFormData = new FormData();


        orderFormData.append("topic" , formFields.topic)
        orderFormData.append("type_of_paper" , formFields.typeOfPaper)
        orderFormData.append("subject_area" , formFields.subjectArea)
        orderFormData.append("paper_details" , formFields.paperDetails)
        orderFormData.append("additional_materials" , formFields.additionalMaterials)
        orderFormData.append("paper_format" , formFields.paperFormat)
        orderFormData.append("prefered_english" , formFields.prefEnglish)
        orderFormData.append("number_of_sources" , formFields.numOfSources)
        orderFormData.append("spacing" , formFields.spacing)
        orderFormData.append("academic_level" , formFields.academicLevel)
        orderFormData.append("number_of_pages" , formFields.numberOfPages)
        orderFormData.append("urgency" , formFields.urgency)



        axios.post('/api/auth/client/orders',
            orderFormData ,
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
                }
            })
            .catch(err =>{
                console.log(err)
            })
    }

    const loadDraft = (draftOrder) =>{

        setSavedValues(draftOrder)
        setOpen(false)

    }



    const removeDraft = (index) =>{

        localOrders.splice(index,1)

        localStorage.removeItem(LOCAL_STORAGE_KEY)

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localOrders))

        setOpen(false)

        checkLocalOrders()

    }


    const checkLocalOrders = () =>{

         localStorage.getItem(LOCAL_STORAGE_KEY) && setLocalOrders(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));

    }






    useEffect(() => {

        if(!clientAuth){
            hist.push("/client")
        }

        dispatch(fetchAcademicLevels())
        dispatch(fetchPaperTypes())
        dispatch(fetchSubjectAreas())
        dispatch(fetchPaperFormats())
        dispatch(fetchPrefferedEnglish())


        checkLocalOrders();


        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Place Order'


    }, [clientAuth])



    return (
        <div className="dashboard">
            <ClientLayout>
             <div className="dash_overview">
                 <div className="place-order-page">
                     <h1 className="text-4xl">Order a Paper</h1>
                     <h4 className="mt-6 text-lg text-primary-4">Paper Details</h4>

                     <Transition.Root show={open} as={Fragment}>
                         <Dialog
                             as="div"
                             static
                             className="fixed z-10 inset-0 overflow-y-auto"
                             initialFocus={cancelButtonRef}
                             open={open}
                             onClose={setOpen}
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
                                                             Saved Orders
                                                         </Dialog.Title>
                                                     </div>
                                                     <div className="mt-2">
                                                         {localOrders.map((locOrder,index) => (

                                                            <div className="text-sm py-1 text-gray-500  hover:text-gray-900 w-full flex justify-between items-center" key={index}>
                                                                <span className="cursor-pointer"
                                                                    onClick={ e => {
                                                                        e.preventDefault();
                                                                        loadDraft(locOrder)
                                                                    }}
                                                                >{index+1+". "}{ (locOrder.topic.length > 65) ? locOrder.topic.slice(0,65)+"..." : locOrder.topic}</span>
                                                                <i className="ti-trash text-red-600 cursor-pointer"
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        removeDraft(index)
                                                                    }
                                                                    }
                                                                ></i>
                                                            </div>

                                                         ))}

                                                         {localOrders.length == 0 && <div className="flex justify-center items-center p-7">
                                                             <h3>No Drafts in Storage!</h3>
                                                         </div>}
                                                     </div>
                                                 </div>

                                         </div>
                                         <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">

                                             <button
                                                 type="button"
                                                 className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                 onClick={() => setOpen(false)}
                                                 ref={cancelButtonRef}
                                             >
                                                 Cancel
                                             </button>
                                         </div>
                                     </div>
                                 </Transition.Child>
                             </div>
                         </Dialog>
                     </Transition.Root>

                     <form action="" className="w-5/6 sm:w-3/4 lg:w-3/5 mt-7 mb-14 lg:mb-28 2xl:w-1/2" onSubmit={Formik.handleSubmit}>

                         <div className="local-order flex justify-between items-center">

                             <span
                                 className="saveBtn"
                                 onClick={saveOrder}
                             >
                                 Save <i className="ti-save ml-1"></i>
                             </span>

                             <span
                                 className="resetBtn"
                                 onClick={(e) => {
                                     e.preventDefault();
                                     setSavedValues(initial)
                                 }}
                             >
                                 Reset <i className="ti-reload ml-1"></i>
                             </span>

                             <span
                                 className="draftBtn"
                                 onClick={e => {
                                     e.preventDefault();
                                     setOpen(!open)
                                 }}
                             >
                                 <i className="ti-cloud-down mr-1"></i>Drafts ({localOrders.length})
                             </span>


                         </div>

                         <InputField labelText='Topic'
                                     onBlur={Formik.handleBlur}
                                     name="topic" type='text'
                                     value={Formik.values.topic}
                                     placeholder="Paper Topic"
                                     onChange={Formik.handleChange}
                                     errors= {(Formik.errors.topic && Formik.touched.topic) && Formik.errors.topic }
                         />



                         <div className='input-group'>
                             <label >Type of Paper</label>
                             {(Formik.errors.typeOfPaper && Formik.touched.typeOfPaper) && <div className="field-errors">{Formik.errors.typeOfPaper}</div>}
                             <select name="typeOfPaper"
                                     id="paper-type"
                                     onBlur={Formik.handleBlur}
                                     value={Formik.values.typeOfPaper}
                                     onChange={Formik.handleChange}>
                                 <option value='' selected disabled>Choose Type of Paper</option>

                                 {allPaperTypes.map((opt) => (
                                     <option value={opt.type_name} >{opt.type_name}</option>
                                 ))}

                             </select>
                         </div>



                         <div className='input-group'>
                             <label >Subject Area</label>
                             {(Formik.errors.subjectArea && Formik.touched.subjectArea) && <div className="field-errors">{Formik.errors.subjectArea}</div>}
                             <select name="subjectArea"
                                     id="subject-area"
                                     onBlur={Formik.handleBlur}
                                     value={Formik.values.subjectArea}
                                     onChange={Formik.handleChange}>
                                 <option value='' selected disabled>Choose Subject Area</option>

                                 {allSubjectAreas.map((opt) => (
                                     <option value={opt.area_name} >{opt.area_name}</option>
                                 ))}

                             </select>
                         </div>


                         <TextAreaInputField
                             labelText='Paper Details'
                             onBlur={Formik.handleBlur}
                             textareaName='paperDetails'
                             id='message'
                             rows='5'
                             placeholder='Provide detailed additional information about your assignment'
                             value={Formik.values.paperDetails}
                             onChange={Formik.handleChange}
                             errors={(Formik.errors.paperDetails && Formik.touched.paperDetails) && Formik.errors.paperDetails}
                         />




                         <FileInputField
                             labelText="Additional Materials"
                             name="additionalMaterials"
                             onBlur={Formik.handleBlur}
                             value={Formik.values.additionalMaterials}
                             onChange={(e) => {
                                 e.preventDefault();
                                 Formik.setFieldValue("additionalMaterials" , e.target.files[0]);
                             }}
                             errors={(Formik.errors.additionalMaterials && Formik.touched.additionalMaterials) && Formik.errors.additionalMaterials}
                         />


                         <div className="flex flex-col justify-between sm:flex-row">


                             <div className='input-group w-full sm:w-2/5'>
                                 <label >Paper Format</label>

                                 {(Formik.errors.paperFormat && Formik.touched.paperFormat)  && <div className="field-errors">{Formik.errors.paperFormat}</div>}

                                 <select
                                     name="paperFormat"
                                     id="paper-format"
                                     onBlur={Formik.handleBlur}
                                     value={Formik.values.paperFormat}
                                     onChange={Formik.handleChange}>

                                     <option value='' selected disabled>Choose Paper Format</option>

                                     {allPaperFormats.map((opt) => (
                                         <option value={opt.format_name} >{opt.format_name}</option>
                                     ))}

                                 </select>

                             </div>



                             <div className='input-group w-full sm:w-2/5'>
                                 <label >Preferred English</label>

                                 {(Formik.errors.prefEnglish && Formik.touched.prefEnglish) && <div className="field-errors">{Formik.errors.prefEnglish}</div>}

                                 <select
                                     name="prefEnglish"
                                     id="preferred-english"
                                     onBlur={Formik.handleBlur}
                                     value={Formik.values.prefEnglish}
                                     onChange={Formik.handleChange}>

                                     <option value='' selected disabled>Choose Preferred English</option>

                                     {allPreffEnglish.map((opt) => (
                                         <option value={opt.lang_name} >{opt.lang_name}</option>
                                     ))}

                                 </select>

                             </div>



                         </div>

                         <div className="flex flex-col justify-between sm:flex-row ">

                             <InputField
                                 type="number"
                                 parentClasses="w-full sm:w-2/5"
                                 onBlur={Formik.handleBlur}
                                 labelText="Number of sources"
                                 name="numOfSources"
                                 id="number-of-sources"
                                 value={Formik.values.numOfSources}
                                 onChange={Formik.handleChange}
                                 errors={(Formik.errors.numOfSources && Formik.touched.numOfSources) && Formik.errors.numOfSources}
                             />


                             <SelectInputField
                                 parentClasses="w-full sm:w-2/5"
                                   onBlur={Formik.handleBlur}
                                   value={Formik.values.spacing}
                                   labelText="Spacing"
                                   selectName="spacing"
                                   selectID="spacing"
                                   selectOptions={spacingTypes}
                                   onChange={Formik.handleChange}
                                   errors={(Formik.errors.spacing && Formik.touched.spacing) && Formik.errors.spacing}
                             />


                         </div>


                         <div className='input-group'>
                             <label >Academic Level</label>

                             {(Formik.errors.academicLevel && Formik.touched.academicLevel) && <div className="field-errors">{Formik.errors.academicLevel}</div>}

                             <select
                                 name="academicLevel"
                                 id="academic-level"
                                 onBlur={Formik.handleBlur}
                                 value={Formik.values.academicLevel}
                                 onChange={Formik.handleChange}>

                                 <option value='' selected disabled>Choose Academic Level</option>

                                 {allAcademicLevels.map((opt) => (
                                     <option value={opt.level_name} >{opt.level_name}</option>
                                 ))}

                             </select>

                        </div>



                         <InputField
                             type="number"
                             onBlur={Formik.handleBlur}
                             labelText="Number of Pages"
                             name="numberOfPages"
                             id="number-of-pages"
                             value={Formik.values.numberOfPages}
                             onChange={Formik.handleChange}
                             errors={(Formik.errors.numberOfPages && Formik.touched.numberOfPages) && Formik.errors.numberOfPages}
                         />

                         <SelectInputField
                             labelText="Urgency"
                             onBlur={Formik.handleBlur}
                             value={Formik.values.urgency}
                             selectName="urgency"
                             selectID="urgency"
                             selectOptions={urgency}
                             onChange={Formik.handleChange}
                             errors={(Formik.errors.urgency && Formik.touched.urgency) &&  Formik.errors.urgency }
                         />


                         <div className="mb-3 price-estimate">
                             <label className="mr-3">Total</label>
                             <span className="text-lg font-bold">$28.60</span>
                         </div>

                         <button type="submit" className="w-full mt-6 mb-10 sm:w-1/2 lg:w-1/3 btn-pri" >Continue</button>

                     </form>
                 </div>
             </div>

            </ClientLayout>
        </div>
    )
}

export default Orders
