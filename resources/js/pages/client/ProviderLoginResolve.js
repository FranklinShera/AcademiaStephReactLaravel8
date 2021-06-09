import axios from 'axios'
import React, {useEffect,useState} from 'react'
import Logo from "../../images/as21logo.png";


import {loginClient} from "../../actions/AuthUserActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";


const ProviderLoginResolve = ({location}) => {


    const dispatch =  useDispatch();
    const hist = useHistory();


    const authClient = useSelector( state => state.authClient)
    const {  clientAuth } = authClient;


     const loginCallback = () =>{
         const searchParams =  new URLSearchParams(location.search);

         dispatch(loginClient({ code : searchParams.get('code') }))


     }



     useEffect(() =>{

         if(clientAuth){

             (location.state && location.state.next) ?   hist.push(location.state.next) : hist.push("/client/dashboard")
         }

     },[clientAuth])



    useEffect(() => {
        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | OAUTH Login'

        loginCallback();

    }, [])


    return (
        <div className='loader-overlay bg-white vh-100'>

            <div className="wait-loader">
                <div className="center">
                    <img src={Logo} alt="AcademiaSteph21 Loader"/>
                </div>
                <div className="item item-1"></div>
                <div className="item item-2"></div>
                <div className="item item-3"></div>
                <div className="item item-4"></div>
                <div className="item item-5"></div>
                <div className="item item-6"></div>
                <div className="item item-7"></div>
                <div className="item item-8"></div>
            </div>

        </div>
    )
}

export default ProviderLoginResolve
