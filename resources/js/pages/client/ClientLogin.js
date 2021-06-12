import axios from 'axios'
import React, {useEffect,useState} from 'react'
import {useHistory} from 'react-router'
import { useDispatch , useSelector } from 'react-redux'



import {autoLoginClient, refreshClient, refreshUser} from "../../actions/AuthUserActions";



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

    const autoLogin = (e) =>{
        e.preventDefault()

        dispatch(autoLoginClient());
    }

    useEffect(() => {

            dispatch(refreshClient())



        setInterval(() => {

           dispatch(refreshClient(1))

        }, 840000);


        window.scrollTo(0,0)

        document.querySelector('title').text = 'AcademiaSteph21 | Client Login'

    }, [])


    return (
        <div className="login-screen">
            <form className="w-4/5 md:w-4/5 lg:w-3/4 flex flex-col items-center" onSubmit={(e => e.preventDefault())}>
                 <label className="w-full mb-5 text-3xl text-center">Client Login or Register</label>
                <div className="mt-10 flex">

                      <span className="px-8 py-4 rounded bg-github-1 text-github-2 font-bold text-lg cursor-pointer"
                            onClick={e => socialLogin(GITHUB_PROVIDER)}>Github
                      </span>

                      <span className="px-8 py-4 ml-4 rounded bg-google-1 text-white font-bold text-lg cursor-pointer"
                            onClick={e => socialLogin(GOOGLE_PROVIDER)}>Google
                      </span>

                      <span className="px-8 py-4 ml-4 rounded bg-facebook-1 text-white font-bold text-lg cursor-pointer"
                            onClick={e => socialLogin(FACEBOOK_PROVIDER)}>Facebook
                      </span>

                </div>
                <span className="px-10 py-2 mt-10 rounded-full bg-gray-400 text-dark-5 font-bold text-lg cursor-pointer"
                      onClick={autoLogin}>AutoLogin
                </span>
            </form>
        </div>
    )
}

export default ClientLogin
