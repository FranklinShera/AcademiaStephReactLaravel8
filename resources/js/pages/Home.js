import React, { useState , useEffect } from 'react'
import {Link} from 'react-router-dom'

import { useDispatch ,useSelector} from 'react-redux'


//icons
import  RightArrow from '.././images/forward.svg';
import  ApproveIcon from '.././images/approval.svg';
import  TermPaperIcon from '.././images/rules.svg';
import  ResearchPaperIcon from '.././images/research.svg';
import  WhitePaperIcon from '.././images/whitepaper.svg';
import  AssignmentIcon from '.././images/assignment.svg';
import  CaseStudyIcon from '.././images/casestudy.svg';
import  DissertationIcon from '.././images/dissertations.svg';



//components
import  RatingCard from '.././components/RatingCard';
import InputField from '../components/InputField'
import RadioInputField from '../components/RadioInputField'
import TextAreaInputField from '../components/TextAreaInputField'



//actions
import { listReviews } from '../actions/reviewActions'

const Home = () => {

    const[newMsg,setNewMsg] = useState({
        name: "",
        message: "",
        email: "",
        whatsappnumber: "",
        mailback: false,
        addonwhatsapp: false
    })


    const getInTouch = (e) =>{
            e.preventDefault()
            console.log(newMsg);
    }


    const dispatch =  useDispatch();

    const reviewList = useSelector( state => state.reviewList)
    const {reviews} = reviewList;

    // useEffect(() => {
    //     dispatch(listReviews())
    // },[dispatch])


            const[paperAction,setPaperAction] = useState(0)

            const[pageNums,setPageNum] = useState([1,2,3,4,5,6,7,8])


            const[pageWords,setPageWord] = useState({
                page: 1,
                words: 275
            })

            const[educationStage,setStage] = useState([
                "School" , "College" ,"University","Master's", "Doctorate"
            ])

            const[essayType,setEssayType] = useState([
               "Admission" ,"Article Review","Business Plan"
            ])



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

                <div className="hidden price-calculator lg:block">
                    <h1 className="text-2xl font-bold">Price Calculator</h1>
                    <div className="calc-body">
                        <div className="calc-tabs">

                            <span className={(paperAction == 0) ? 'curr-tab' : 'idle-tab'} onClick={() => setPaperAction(0)}>Writing</span>
                            <span className={(paperAction == 1) ? 'curr-tab' : 'idle-tab'} onClick={() => setPaperAction(1)}>Rewriting</span>
                            <span className={(paperAction == 2) ? 'curr-tab' : 'idle-tab'} onClick={() => setPaperAction(2)}>Editing</span>
                        </div>
                        <div className="mt-4 essay-type">
                            <select name="essay-type" id="essay-type" className="w-full">
                                <option value="" selected>Essay (Any Type)</option>

                                {essayType.map(essay =>(
                                    <option value={essay}>{essay}</option>
                                ))}

                            </select>
                        </div>

                        <div className="flex justify-between mt-4 stage-time">
                            <select name="stage" id="stage" className="w-1/2">
                            {educationStage.map(stage =>(
                                   (stage === "College") ? <option value={stage} selected>{stage}</option> : <option value={stage}>{stage}</option>
                                ))}
                            </select>
                            <select name="essay-time" id="essay-time" className="w-1/2">
                                <option value="">6 Hours</option>
                                <option value="">12 Hours</option>
                                <option value="">1 Day</option>
                                <option value="">2 Days</option>
                                <option value="">3 Days</option>
                                <option value="">5 Days</option>
                                <option value="">7 Days</option>
                                <option value="">10 Days</option>
                                <option value="" selected>2 Weeks</option>
                                <option value="">1 Month</option>
                                <option value="">2 Months</option>
                            </select>
                        </div>

                        <div className="flex justify-between p-2 mt-4 essay-pages ">

                            <div className="flex items-center justify-center font-extrabold border rounded page-minus border-primary-3 w-10/100"> - </div>

                            <select name="pages-words" id="pages-words" className="w-3/4 text-center">
                                {pageNums.map(pageNum => (
                                        (pageNum == 1) ? <option value={pageNum} selected>{pageNum} Page/{pageNum*pageWords.words} Words</option> : <option value={pageNum}>{pageNum} Pages/{pageNum*pageWords.words} Words</option>
                                ))}
                            </select>

                            <div className="flex items-center justify-center w-1 font-extrabold border rounded page-plus border-primary-3 w-10/100"> + </div>

                        </div>

                        <div className="flex justify-between mt-4 essay-spacing">

                            <div className="flex justify-between double-spacing">
                                <input type="radio"/>
                                <span className="ml-1">Double Spacing</span>
                            </div>


                            <div className="flex justify-between single-spacing">
                                <input type="radio"/>
                                <span className="ml-1">Single Spacing</span>
                            </div>

                        </div>

                        <div className="flex justify-end px-3 mt-4 font-bold computed-price">
                            $28.00
                        </div>

                        <button className="w-full py-3 mt-4 font-bold text-white rounded bg-primary-4">Write My Paper</button>
                    </div>
                </div>

            </div>

            <div id="services" className="services">
                <div className="serv-group">
                        <h1 className="block w-full my-10 text-center header-text">SERVICES</h1>

                    <div className="service">
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
                    We seek to help students with assignments all to relieve them of their busy schedules.<br/>
                    Most students find it hard to balance student life, family and work.<br/>
                    We step in to help with assignments for we care.
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
                            Our customers obtain their money back in full upon ascertaining
                            that correct work was not delivered, cases of poor quality,
                            and valid claims after confirmation by the quality department.
                        </p>
                    </div>

                    <div className="benefit sm:pl-2">
                        <h1 className="text-xl font-bold text-primary-1">Non-Plagiarism Work Guarantee</h1>
                        <p className="text-sm">
                            We have inbuilt plagiarism checker that ensures work is 100%
                            non-plagiarized before submission to esteemed customers.
                            We observe plagiarism and patent rights in line with
                            international guidelines.
                        </p>
                    </div>


                    <div className="benefit">
                        <h1 className="text-xl font-bold text-primary-1">Approved and Skilled Writers</h1>
                        <p className="text-sm sm:pr-2">
                            All writers are appointed through a step-wise interview.
                            Our team is committed to delivery of the best content that
                            qualifies for top quality always. We always guarantee success in
                            the  completion of tasks to the satisfaction of the clients.
                        </p>
                    </div>

                    <div className="benefit sm:pl-2">
                        <h1 className="text-xl font-bold text-primary-1">Free Limitless Ammendments</h1>
                        <p className="text-sm">
                            Our customers are liable to free limitless modification of work in
                            cases that clients present their original instructions for the task.
                        </p>
                    </div>

                </div>

                <Link to="/place-your-order">
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

                  <Link to="/find-writer">
                    <button className="find-my-writer">Find My Writer</button>
                  </Link>
              </div>


            </div>


            <div className="customer-say">

                <h1 className="px-5 mt-14 lg:mt-28 header-text">
                    WHAT OUR CUSTOMERS SAY
                </h1>

                <div className="cards-list">


                    {/*{ reviews.map( (rate,index) => (*/}
                    {/*    <RatingCard cardData={rate} key={index} />*/}
                    {/*) ) }*/}


                </div>

            </div>


            <div id="contact" className="contact" >

                <h1 className="mt-14 lg:mt-28 header-text">GET IN TOUCH WITH US</h1>

                <form action="" className="w-5/6 sm:w-3/4 lg:w-3/5 mt-7 mb-14 lg:mb-28 2xl:w-1/2" onSubmit={getInTouch}>
                    <InputField name="name" labelText='Name' type='text' placeholder="Type Your Name Here" onChange={(e) => setNewMsg({...newMsg, name : e.target.value}) } />
                    <InputField name="email" labelText='Email' type='text' placeholder="Type Your Email Here" onChange={(e) => setNewMsg({...newMsg, email : e.target.value})}/>
                    <InputField name="whatsappnumber" labelText='WhatsApp Number' type='number' placeholder="Type Your WhatsApp Number Here" onChange={(e) => setNewMsg({...newMsg, whatsappnumber : e.target.value})}/>
                    <TextAreaInputField labelText='Message' textareaName='message' id='message' placeholder='Type Message Here' onChange={(e) => setNewMsg({...newMsg, message : e.target.value})}/>
                    <RadioInputField labelText='Email Me Back' inputName='mailback' onChange={(e) => setNewMsg({...newMsg, mailback : e.target.cheked})}/>
                    <RadioInputField labelText='Add Me On WhatsApp' inputName='addonwhatsapp' onChange={(e) => setNewMsg({...newMsg, addonwhatsapp : e.target.value})}/>

                    <button type="submit"  className="btn-pri">SUBMIT</button>

                </form>
            </div>



            </div>


         </>

    )
}

export default Home
