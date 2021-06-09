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

    const socialLogin =  (e) => {

        e.preventDefault();

        axios.get('/api/soc/authorize/github/redirect')
            .then(res => {
                if(res.data.url){
                    window.location.href = res.data.url
                }

            })
            .catch(err => console.log(err))

    }


    useEffect(() => {
        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Client Login'

    }, [])


    return (
        <div className="login-screen">
            <form className="w-4/5 md:w-4/5 lg:w-1/2" onSubmit={handleLogin}>
                 <label className="w-full mb-5 text-3xl text-center">Client Login</label>
                <div className="mt-10 flex">
                      <span className="px-10 py-4 rounded bg-gray-600 text-white font-bold text-xl cursor-pointer" onClick={socialLogin}>Login With Github</span>
                  </div>
            </form>
        </div>
    )
}

export default ClientLogin
