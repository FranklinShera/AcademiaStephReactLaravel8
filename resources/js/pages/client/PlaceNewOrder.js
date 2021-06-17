import React, {useEffect,useState} from 'react'
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
    fetchAcademicLevels,
    fetchPaperTypes,
    fetchSubjectAreas
} from "../../actions/OrderActions";



const Orders = () => {

    axios.defaults.withCredentials = true;

    const hist = useHistory();
    const dispatch = useDispatch()

    const authClient = useSelector( state => state.authClient)
    const { clientAuth } = authClient;


    const AcademicLevels = useSelector( state => state.academicLevels)
    const { allAcademicLevels  } = AcademicLevels;


    const PaperTypes = useSelector( state => state.paperTypes)
    const { allPaperTypes } = PaperTypes;


    const SubjectAreas = useSelector( state => state.subjectAreas)
    const { allSubjectAreas } = SubjectAreas;




    const paperFormats = [
        {
            name : "AMA",
            value: "AMA"
        },
        {
            name : "APA",
            value: "APA"
        },
        {
            name : "Chicago/Turabian",
            value: "Chicago/Turabian"
        },
        {
            name : "Harvard",
            value: "Harvard"
        },
        {
            name : "IEEE",
            value: "IEEE"
        },
        {
            name : "MHRA",
            value: "MHRA"
        },
        {
            name : "MLA",
            value: "MLA"
        },
        {
            name : "Oscola",
            value: "Oscola"
        },
        {
            name : "Vancouver",
            value: "Vancouver"
        },
        {
            name : "Others",
            value: "Others"
        },
        {
            name : "Not Applicable",
            value: "Not Applicable"
        }
    ]

    const prefEnglish = [
        {
            name : "UK-ESL",
            value: "UK-ESL"
        },
        {
            name : "UK",
            value: "UK"
        },
        {
            name : "US-ESL",
            value: "US-ESL"
        },
        {
            name : "US",
            value: "US"
        }
    ]

    const spacingTypes = [
        {
            name : "Double Spacing",
            value: "double"
        },
        {
            name : "Single Spacing",
            value: "single"
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




    const Formik = useFormik({
        initialValues:{
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
        },
        validationSchema:Yup.object({
            topic: Yup.string()
                     .min(8).required(),
            typeOfPaper: Yup.string().required(),
            subjectArea: Yup.string().required(),
            paperDetails: Yup.string().required(),
            additionalMaterials: null,
            paperFormat: Yup.string().required(),
            prefEnglish: Yup.string().required(),
            numOfSources: Yup.string().required(),
            spacing: Yup.string().required(),
            academicLevel: Yup.string().required(),
            numberOfPages: Yup.string().required(),
            urgency: Yup.string().required()
        }),
        onSubmit: (values, { setSubmitting , resetForm }) => {

            submitPlaceOrderForm(values)

            resetForm({ values:{
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
                }})

            setSubmitting(false)

        }
    })


    let orderForm = {
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


    const numOfWordsHint = () =>{
        console.log(orderForm.numberOfPages)
        return orderForm.numberOfPages || "1 Page = 275 Words";
    }


    const submitPlaceOrderForm = (formFields) =>{
        console.log(formFields);
    }





    useEffect(() => {

        if(!clientAuth){
            hist.push("/client")
        }

        dispatch(fetchAcademicLevels())
        dispatch(fetchPaperTypes())
        dispatch(fetchSubjectAreas())


        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Place Order'


    }, [clientAuth])



    return (
        <div className="dashboard">
            <ClientLayout>
             <div className="dash_overview">
                 <div className="place-order-page">
                     <h1 className="text-4xl">Order a Paper</h1>
                     <h1 className="mt-6 text-lg text-primary-4">Paper Details</h1>
                     <form action="" className="w-5/6 sm:w-3/4 lg:w-3/5 mt-7 mb-14 lg:mb-28 2xl:w-1/2" onSubmit={Formik.handleSubmit}>

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


                         <TextAreaInputField labelText='Paper Details'
                                             onBlur={Formik.handleBlur}
                                             textareaName='paperDetails'
                                             id='message'
                                             rows='5'
                                             placeholder='Provide detailed additional information about your assignment'
                                             value={Formik.values.paperDetails}
                                             onChange={Formik.handleChange}
                                             errors={(Formik.errors.paperDetails && Formik.touched.paperDetails) && Formik.errors.paperDetails}
                         />




                         <FileInputField labelText="Additional Materials"
                                         onBlur={Formik.handleBlur}
                                         value={Formik.values.additionalMaterials}
                                         onChange={(e) => orderForm.additionalMaterials = e.target.files[0]}/>

                         <div className="flex flex-col justify-between sm:flex-row">

                             <SelectInputField parentClasses="w-full sm:w-2/5"
                                               onBlur={Formik.handleBlur}
                                               labelText="Paper Format"
                                               selectName="paperFormat"
                                               selectID="paper-format"
                                               value={Formik.values.paperFormat}
                                               selectOptions={paperFormats}
                                               onChange={Formik.handleChange}
                                               errors={(Formik.errors.paperFormat && Formik.touched.paperFormat) && Formik.errors.paperFormat }
                             />


                             <SelectInputField parentClasses="w-full sm:w-2/5"
                                               onBlur={Formik.handleBlur}
                                               labelText="Preferred English"
                                               selectName="prefEnglish"
                                               selectID="preferred-english"
                                               value={Formik.values.prefEnglish}
                                               selectOptions={prefEnglish}
                                               onChange={Formik.handleChange}
                                               errors={(Formik.errors.prefEnglish && Formik.touched.prefEnglish) && Formik.errors.prefEnglish}
                             />



                         </div>

                         <div className="flex flex-col justify-between sm:flex-row ">

                             <InputField type="number"
                                         parentClasses="w-full sm:w-2/5"
                                         onBlur={Formik.handleBlur}
                                         labelText="Number of sources"
                                         name="numOfSources"
                                         id="number-of-sources"
                                         value={Formik.values.numOfSources}
                                         onChange={Formik.handleChange}
                                         errors={(Formik.errors.numOfSources && Formik.touched.numOfSources) && Formik.errors.numOfSources}
                             />


                             <SelectInputField parentClasses="w-full sm:w-2/5"
                                               onBlur={Formik.handleBlur}
                                               value={Formik.values.spacing}
                                               labelText="Spacing"
                                               selectName="spacing"
                                               selectID="spacing"
                                               selectOptions={spacingTypes}
                                               onChange={Formik.handleChange}
                                               errors={(Formik.errors.spacing && Formik.touched.spacing) &&Formik.errors.spacing}
                             />


                         </div>


                         <div className='input-group'>
                             <label >Academic Level</label>
                             {(Formik.errors.academicLevel && Formik.touched.academicLevel) && <div className="field-errors">{Formik.errors.academicLevel}</div>}
                             <select name="academicLevel"
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



                         <InputField type="number"
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
