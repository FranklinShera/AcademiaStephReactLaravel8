import React, { useState , useEffect } from 'react'
import {Link} from 'react-router-dom'

import axios from 'axios'

import { useDispatch ,useSelector} from 'react-redux'

import {useFormik} from "formik";
import * as Yup from "yup";


//icons
import  RightArrow from '.././images/forward.svg';
import  ApproveIcon from '.././images/approval.svg';
import  TermPaperIcon from '.././images/rules.svg';
import  ResearchPaperIcon from '.././images/research.svg';
import  WhitePaperIcon from '.././images/whitepaper.svg';
import  AssignmentIcon from '.././images/assignment.svg';
import  CaseStudyIcon from '.././images/book_stack.svg';
import  ProofreadingIcon from '.././images/proofread.svg';
import  DissertationIcon from '.././images/dissertations.svg';
import  TranscriptionIcon from '.././images/transcription.svg';
import  CaptionIcon from '.././images/captioning.svg';
import  EditingIcon from '.././images/spellcheck.svg';



//components
import  RatingCard from '.././components/RatingCard';
import InputField from '../components/InputField'
import RadioInputField from '../components/RadioInputField'
import TextAreaInputField from '../components/TextAreaInputField'



//actions
import { listReviews } from '../actions/reviewActions'
import PriceCalculator from "../components/PriceCalculator";


const Home = () => {

    const[newMsg,setNewMsg] = useState({
        name: "",
        message: "",
        email: "",
        whatsappnumber: "",
        mailback: false,
        addonwhatsapp: false
    })


    const getInTouch = (formValues) =>{

            axios.post('/api/create-contact', formValues)
                .then(res =>{

                    window.Toast.fire({
                        icon:'success',
                        title:'Message Sent!'
                    })

                    Formik.resetForm();

                })
                .catch(err => console.log(err))
    }


    const dispatch =  useDispatch();

    const reviewList = useSelector( state => state.reviewList)
    const {reviews} = reviewList;


    const Formik = useFormik({
        initialValues:{
            name: "",
            message: "",
            email: "",
            whatsappnumber: "",
            mailback: false,
            addonwhatsapp: false
        },
        validationSchema:Yup.object({
            name: Yup.string()
                .min(3 , 'Name Cannot Be Less Than 3 Characters')
                .max(32, 'Name Cannot be More than 32 Characters')
                .required('Name is Required!'),
            message: Yup.string()
                .required('Message is Required!'),
            email: Yup.string()
                .email("Email is Invalid!")
                .required('Email is Required!'),
            whatsappnumber: Yup.string()
                .min(9 , 'WhatsApp Number Cannot Be Less Than 9 Characters')
                .max(15, 'WhatsApp Number Cannot be More than 15 Characters')
                .required('WhatsApp Number is Required!')
        }),
        onSubmit: (values, { setSubmitting , resetForm }) => {

            getInTouch(values);
            resetForm();
            setSubmitting(false);

        }
    });


    useEffect(() => {
        dispatch(listReviews())
    },[dispatch])


    useEffect(() => {
        window.scrollTo(0,0)
        document.querySelector('title').text = 'AcademiaSteph21 | Home - We are inclined to optimum dedication in providing top-quality services braced with inimitable creativity and perfectionism.The services we offer stand out for themselves in uniqueness.'

    }, []);




    return (
          <>

            <div className="bg-gray-100">

            <div id="hero" className="hero" >

                <div className="cta">

                    <p className="cta-lead">As <span className="p-1 px-2 font-semibold bg-white text-primary-1">Writers</span></p>

                    <p className="hidden sm:block cta-word">
                        We are inclined to optimum dedication in <br/>
                        providing top-quality services braced with<br/>
                        inimitable creativity and perfectionism.<br/>
                        The services we offer stand out for<br/>
                        themselves in uniqueness.
                    </p>

                    <p className="sm:hidden cta-word">
                        We are inclined to optimum dedication in providing top-quality services braced with inimitable creativity and perfectionism.The services we offer stand out for themselves in uniqueness.
                    </p>

                    <button onClick={(e) =>{
                        e.preventDefault();
                        window.location.hash = '#whyus';
                    }} className="strt-btn">CHECKOUT OUR SOLUTIONS  <img src={RightArrow} className="inline h-5 lg:h-8 xl:ml-2 md:ml-3" alt="Check Our Solutions Button"></img></button>

                </div>

                <PriceCalculator/>

            </div>

            <div id="services" className="services">
                <div className="serv-group">
                        <h1 className="block w-full my-10 text-center header-text">SERVICES</h1>

                    <div className="service sm:justify-start xl:justify-center">
                        <img src={TermPaperIcon} className="h-12" alt="Term paper icon"></img>
                        <span>Term Papers</span>
                    </div>


                    <div className="service sm:justify-start xl:justify-center">
                        <img src={ResearchPaperIcon} className="h-12" alt="Research Paper icon"></img>
                        <span>Research Paper</span>
                    </div>

                    <div className="service">
                        <img src={WhitePaperIcon} className="h-12" alt="White Paper icon"></img>
                        <span>White Paper</span>
                    </div>

                    <div className="service sm:justify-start xl:justify-center">
                        <img src={AssignmentIcon} className="h-12" alt="Class Assignment icon"></img>
                        <span>Class Assignment</span>
                    </div>


                    <div className="service">
                        <img src={CaseStudyIcon} className="h-12" alt="Case Study icon"></img>
                        <span>Case Study</span>
                    </div>

                    <div className="service sm:justify-start xl:justify-center">
                        <img src={DissertationIcon} className="h-12" alt="Dissertation icon"></img>
                        <span>Dissertation</span>
                    </div>

                    <div className="service sm:justify-start xl:justify-center">
                        <img src={ProofreadingIcon} className="h-12" alt="Case Study icon"></img>
                        <span>Proofreading</span>
                    </div>

                    <div className="service sm:justify-start xl:justify-center">
                        <img src={TranscriptionIcon} className="h-12" alt="Transcription icon"></img>
                        <span>Transcription</span>
                    </div>

                    <div className="service sm:justify-start xl:justify-center">
                        <img src={EditingIcon} className="h-12" alt="Editing icon"></img>
                        <span>Editing</span>
                    </div>

                    <div className="service ">
                        <img src={CaptionIcon} className="h-12" alt="Captioning icon"></img>
                        <span>Captioning</span>
                    </div>


                </div>
            </div>

            <div className="overview">
                <h1 className="header-text">OVERVIEW</h1>
                <div className="views">

                    <div className="view">
                        <p className="text-4xl font-bold num text-primary-1">2000</p>
                        <p className="text-center caption">
                            Projects  <br/>
                            Completed
                        </p>
                    </div>


                    <div className="view">
                        <p className="text-4xl font-bold num text-primary-1">85</p>
                        <p className="text-center caption">
                            Countries  <br/>
                            Represented
                        </p>
                    </div>

                    <div className="view">
                        <p className="text-4xl font-bold num text-primary-1">95%</p>
                        <p className="text-center caption">
                            Success  <br/>
                            Rate
                        </p>
                    </div>

                    <div className="view">
                        <p className="text-4xl font-bold num text-primary-1">100+</p>
                        <p className="text-center caption">
                            Active <br/>
                            Tutors
                        </p>
                    </div>


                </div>
            </div>


            <div id="whyus" className="why-us">
                <h1 className="mt-24 header-text">
                    WHY CHOOSE OUR ESSAY SERVICE
                </h1>
                <p className="px-5 mt-12 text-lg text-center lg:text-2xl text-dark-5">
                    We aim to verily offer to subsidize the time constrain faced by students across the globe due to the busy schedules.<br/>
                    Since most students find it hard to balance student life, family and work. <br/>
                    Therefore, we chip in to extend a hand of care and concern in assignemnts and general school work.
                </p>

                <div className="score-card">

                    <div className="score-start">
                        <img src={ApproveIcon} className="inline h-7 w-7" alt="Approved Service Icon"></img>
                        <span className="">Our services are at optimal quality</span>
                    </div>


                    <div className="score-end">
                        <img src={ApproveIcon} className="inline h-7 w-7" alt="Approved Service Icon"></img>
                        <span className="">Top-notch tutors at your disposal</span>
                    </div>


                   <div className=" score-start">
                        <img src={ApproveIcon} className="inline h-7 w-7" alt="Approved Service Icon"></img>
                        <span className="">Clients Are Our Top Priority</span>
                    </div>


                    <div className="score-end">
                        <img src={ApproveIcon} className="inline h-7 w-7" alt="Approved Service Icon"></img>
                        <span className="">Responsive support</span>
                    </div>


                    <div className="score-start">
                        <img src={ApproveIcon} className="inline h-7 w-7" alt="Approved Service Icon"></img>
                        <span className="">Delivery on time</span>
                    </div>


                    <div className="score-end">
                        <img src={ApproveIcon} className="inline h-7 w-7" alt="Approved Service Icon"></img>
                        <span className="">Cheap rates</span>
                    </div>

                </div>


                <div className="flex flex-col items-center justify-center w-full h-1 my-3 fancy-hr">
                    {/* <hr className="w-4/6 thin-hr bg-primary-1"> </hr> */}
                </div>

                <div className="mb-24 benefits">

                    <div className="benefit">
                        <h1 className="text-xl font-bold text-primary-1">Money-Back Guarantee</h1>
                        <p className="text-sm sm:pr-2">
                            Our esteemed clientele obtain their money back in full amounts where cases of dissatisfaction
                            or poor quality arise and valid claims ascertained as true by our Quality assurance department.
                        </p>
                    </div>

                    <div className="benefit sm:pl-2">
                        <h1 className="text-xl font-bold text-primary-1">Non-Plagiarism Work Guarantee</h1>
                        <p className="text-sm">
                            The presence of systems and softwares that ensure quality and originality of work ensure 100% non-plagiarized work is delivered.
                            This is in line with international guidelines and patent rights upheld in plagiarism.
                        </p>
                    </div>


                    <div className="benefit">
                        <h1 className="text-xl font-bold text-primary-1">Approved and Skilled Writers/Editors</h1>
                        <p className="text-sm sm:pr-2">
                            The commitment of our team in ensuring quality and satisfaction is mantained, calls for dedicated step-wise interview of writers/editors appointment.
                            This puts us at the forefront in delivery of timely, original, qualified and proficient success in completion of tasks to the desires of the clients.
                        </p>
                    </div>

                    <div className="benefit sm:pl-2">
                        <h1 className="text-xl font-bold text-primary-1">Free Limitless Ammendments</h1>
                        <p className="text-sm">
                            Our clients are free to receive endless modification and revision of content/work in occasions deemed necessary by the clients' instructions.
                        </p>
                    </div>

                </div>

                <Link to="/client/dashboard/place-order">
                 <button className="place-order">Place Your Order</button>
                </Link>

            </div>


            <div className="subjects">

               <div className="info">
                    <h1 className="pt-8 header-text">
                        SUBJECTS AVAILABLE
                    </h1>

                    <p className="px-5 py-8 text-center sm:text-xl">
                        Our team of experts is vast in various disciplines, something that we pride in as a team. <br/>
                        We offer services in line with the following subjects.
                    </p>
               </div>


              <div className="subgroup">
                <div className=" sublist" >

                    <span className="subject">
                        English
                    </span>

                    <span className="subject">
                        Literature
                    </span>

                    <span className="subject">
                        History
                    </span>

                    <span className="subject">
                        Sociology
                    </span>

                    <span className="subject">
                        Psychology
                    </span>

                    <span className="subject">
                        Mathematics
                    </span>

                    <span className="subject">
                        Finance
                    </span>

                    <span className="subject">
                        Accounts
                    </span>

                    <span className="subject">
                        Management
                    </span>

                    <span className="subject">
                        Computer Science
                    </span>

                    <span className="subject">
                        Economics and Econometrics Statistics
                    </span>

                    <span className="subject">
                        Healthcare and Nursing
                    </span>


                    <span className="subject">
                        All Branches of Sciences
                    </span>

                  </div>

                  {/*<Link to="/find-writer">*/}
                  {/*  <button className="find-my-writer">Find My Writer</button>*/}
                  {/*</Link>*/}
              </div>


            </div>


                { (reviews.length != 0) &&
                    <div className="customer-say">

                        <h1 className="px-5 mt-14 lg:mt-28 header-text">
                            WHAT OUR CUSTOMERS SAY
                        </h1>

                        <div className="cards-list">


                            { reviews && reviews.map( (rate,index) => (
                                <RatingCard cardData={rate} key={index} />
                            ) ) }


                        </div>

                    </div>
                }


            <div id="contact" className="contact" >

                <h1 className="mt-14 lg:mt-28 header-text">GET IN TOUCH WITH US</h1>

                <form action="" className="w-5/6 sm:w-3/4 lg:w-3/5 mt-7 mb-14 lg:mb-28 2xl:w-1/2" onSubmit={Formik.handleSubmit}>

                    <InputField
                        name="name"
                        labelText='Name'
                        type='text'
                        placeholder="Type Your Name Here"
                        onBlur={Formik.handleBlur}
                        value={Formik.values.name}
                        onChange={Formik.handleChange}
                        errors={(Formik.errors.name && Formik.touched.name) && Formik.errors.name}
                    />

                    <InputField
                        name="email"
                        labelText='Email'
                        type='text'
                        placeholder="Type Your Email Here"
                        onBlur={Formik.handleBlur}
                        value={Formik.values.email}
                        onChange={Formik.handleChange}
                        errors={(Formik.errors.email && Formik.touched.email) && Formik.errors.email}
                    />

                    <InputField
                        name="whatsappnumber"
                        labelText='WhatsApp Number'
                        type='number'
                        placeholder="Type Your WhatsApp Number Here"
                        onBlur={Formik.handleBlur}
                        value={Formik.values.whatsappnumber}
                        onChange={Formik.handleChange}
                        errors={(Formik.errors.whatsappnumber && Formik.touched.whatsappnumber) && Formik.errors.whatsappnumber}
                    />

                    <TextAreaInputField
                        labelText='Message'
                        textareaName='message'
                        id='message'
                        placeholder='Type Message Here'
                        onBlur={Formik.handleBlur}
                        value={Formik.values.message}
                        onChange={Formik.handleChange}
                        errors={(Formik.errors.message && Formik.touched.message) && Formik.errors.message}
                    />

                    <RadioInputField
                        labelText='Email Me Back'
                        inputName='mailback'
                        onBlur={Formik.handleBlur}
                        value={Formik.values.mailback}
                        onChange={Formik.handleChange}
                        errors={(Formik.errors.mailback && Formik.touched.mailback) && Formik.errors.mailback}
                    />

                    <RadioInputField
                        labelText='Add Me On WhatsApp'
                        inputName='addonwhatsapp'
                        onBlur={Formik.handleBlur}
                        value={Formik.values.addonwhatsapp}
                        onChange={Formik.handleChange}
                        errors={(Formik.errors.addonwhatsapp && Formik.touched.addonwhatsapp) && Formik.errors.addonwhatsapp}
                    />

                    <button type="submit"  className="btn-pri">{ Formik.isSubmitting ? "SENDING" : "SUBMIT"}</button>

                </form>

            </div>



            </div>


         </>

    )
}

export default Home
