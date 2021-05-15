import axios from 'axios'
import React, {useEffect,useState} from 'react'
import InputField from '../../components/InputField'
import {useHistory} from 'react-router'
import { useDispatch , useSelector } from 'react-redux'


//actions
import { loginUser , refreshUser } from '../../actions/AuthUserActions'

const Login = ({ location }) => {

    const dispatch =  useDispatch();
    const hist = useHistory();
    
    const authUser = useSelector( state => state.authUser)
    const { loggedInUser, auth } = authUser;
    
    useEffect(() => {

        
        if(auth){

            (location.state && location.state.next) ?   hist.push(location.state.next) : hist.push("/in/dashboard")
        }

        

    },[auth])

    

    const[user,setUser] = useState({
        username: '',
        password: '',
    })
   

   

    const handleLogin =  (e) => {
        e.preventDefault();
                
        dispatch(loginUser(user))
           
    }

    const noAccount =  (e) => {
        e.preventDefault();
                
        hist.push("/in/register") 
           
    }


    useEffect(() => {
        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Login'

    }, [])
    return (
        <div className="login-screen">
            <form className="w-4/5 md:w-4/5 lg:w-1/2" onSubmit={handleLogin}>
                 <label className="w-full mb-5 text-5xl text-center">Login</label>
                 <InputField labelText='Username' parentClasses="w-full" name="username" id="username" type='text' placeholder="Enter Email" onChange={(e) =>  setUser({...user, username: e.target.value})}/>
                 <InputField labelText='Password' parentClasses="w-full" name="password" id="password" type='password' placeholder="Enter  Password" onChange={(e) =>  setUser({...user,password: e.target.value})}/>
                 <label className="block">Don't Have An Account? <span className="ml-2 font-bold cursor-pointer text-primary-3" onClick={noAccount}>Register Here</span></label>
                 <button type="submit" className="w-full font-bold sm:w-1/2 lg:w-1/3 btn-pri" >Login</button>
            </form>
        </div>
    )
}

export default Login
