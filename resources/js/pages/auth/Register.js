import React, {useEffect,useState} from 'react'
import InputField from '../../components/InputField'
import {useHistory} from 'react-router'
import { useDispatch , useSelector } from 'react-redux'


//actions
import { registerUser } from '../../actions/AuthUserActions'

const Register = () => {

    const dispatch =  useDispatch();
    const hist = useHistory();
    
    const authUser = useSelector( state => state.authUser)
    const registration = useSelector( state => state.registration)
    const { loggedInUser, auth } = authUser;
    const { registered } = registration;
    
    useEffect(() => {
        if(auth){
            hist.push("/in/dashboard")
        }

        if(registered){
            hist.push("/in")
        }

        

    },[auth,registered])

    

    const[user,setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
   

   

    const handleRegister =  (e) => {
        e.preventDefault();
                
        dispatch(registerUser(user))   
           
    }

   

    const haveAccount =  (e) => {
        e.preventDefault();
                
        hist.push("/in") 
           
    }


    useEffect(() => {
        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Register'

    }, [])
    return (
        <div className="login-screen">
            <form className="w-4/5 md:w-4/5 lg:w-1/2" onSubmit={handleRegister}>
                 <label className="w-full mb-5 text-5xl text-center">Register</label>
                 <InputField labelText='Name' parentClasses="w-full" name="name" id="name" type='text' placeholder="Enter Name" onChange={(e) =>  setUser({...user, name: e.target.value})}/>
                 <InputField labelText='Email' parentClasses="w-full" name="email" id="email" type='text' placeholder="Enter Email" onChange={(e) =>  setUser({...user, email: e.target.value})}/>
                 <InputField labelText='Password' parentClasses="w-full" name="password" id="password" type='password' placeholder="Enter  Password" onChange={(e) =>  setUser({...user,password: e.target.value})}/>
                 <label className="block">Already Have An Account? <span className="ml-2 font-bold cursor-pointer text-primary-3" onClick={haveAccount}>Login Here</span></label>
                 <button type="submit" className="w-full font-bold sm:w-1/2 lg:w-1/3 btn-pri" >Register</button>
            </form>
        </div>
    )
}

export default Register
