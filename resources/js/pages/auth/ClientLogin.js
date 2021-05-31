import axios from 'axios'
import React, {useEffect,useState} from 'react'
import InputField from '../../components/InputField'
import {useHistory} from 'react-router'
import { useDispatch , useSelector } from 'react-redux'


//actions
import { loginClient , refreshClient } from '../../actions/AuthUserActions'

const ClientLogin = ({ location }) => {

    const[isLoggin,setIsLogging] = useState(false)

    const dispatch =  useDispatch();
    const hist = useHistory();

    const authClient = useSelector( state => state.authClient)
    const { loggedInClient, clientAuth } = authClient;

    useEffect(() => {


        if(clientAuth){

            (location.state && location.state.next) ?   hist.push(location.state.next) : hist.push("/client/dashboard")
        }



    },[clientAuth])



    const[client,setClient] = useState({
        email: '',
        password: '',
    })




    const handleLogin =  (e) => {

        e.preventDefault();

        setIsLogging(true)

        dispatch(loginClient(client))

        setIsLogging(false)

    }

    const noAccount =  (e) => {
        e.preventDefault();

        hist.push("/in/register")

    }


    useEffect(() => {
        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Client Login'

    }, [])
    return (
        <div className="login-screen">
            <form className="w-4/5 md:w-4/5 lg:w-1/2" onSubmit={handleLogin}>
                 <label className="w-full mb-5 text-5xl text-center">Client Login</label>
                 <InputField labelText='Username' parentClasses="w-full" name="clientname" id="clientname" type='text' placeholder="Enter Email" onChange={(e) =>  setClient({...client, email: e.target.value})}/>
                 <InputField labelText='Password' parentClasses="w-full" name="password" id="password" type='password' placeholder="Enter  Password" onChange={(e) =>  setClient({...client,password: e.target.value})}/>
                 <label className="block">Don't Have An Account? <span className="ml-2 font-bold cursor-pointer text-primary-3" onClick={noAccount}>Register Here</span></label>
                 <button type="submit" className="w-full font-bold sm:w-1/2 lg:w-1/3 btn-pri" >{(isLoggin) ? "Logging In" : "Login"}</button>
            </form>
        </div>
    )
}

export default ClientLogin
