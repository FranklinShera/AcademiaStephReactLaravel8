import axios from 'axios'
import React, {useEffect,useState} from 'react'
import {useHistory} from 'react-router'
import { useDispatch , useSelector } from 'react-redux'



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



    const GITHUB_PROVIDER = 'github';
    const GOOGLE_PROVIDER = 'google';
    const FACEBOOK_PROVIDER = 'facebook';



    const socialLogin =  (provider) => {


        axios.get(`/api/soc/authorize/${provider}/redirect`)
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
            <form className="w-4/5 md:w-4/5 lg:w-3/4 flex flex-col items-center" onSubmit={(e => e.preventDefault())}>
                 <label className="w-full mb-5 text-3xl text-center">Client Login</label>
                <div className="mt-10 flex">

                      <span className="px-8 py-4 rounded bg-gray-600 text-white font-bold text-lg cursor-pointer"
                            onClick={e => socialLogin(GITHUB_PROVIDER)}>Login With Github
                      </span>

                      <span className="px-8 py-4 ml-4 rounded bg-red-600 text-white font-bold text-lg cursor-pointer"
                            onClick={e => socialLogin(GOOGLE_PROVIDER)}>Login With Google
                      </span>

                      <span className="px-8 py-4 ml-4 rounded bg-blue-600 text-white font-bold text-lg cursor-pointer"
                            onClick={e => socialLogin(FACEBOOK_PROVIDER)}>Login With Facebook
                      </span>

                  </div>
            </form>
        </div>
    )
}

export default ClientLogin
