import React from 'react'
import {Link} from  'react-router-dom'
import  IgIcon from '.././images/as21ig.svg';
import  MailIcon from '.././images/as21mail.svg';
import  Logo from '.././images/as21logo.png';


const Footer = () => {
    return (
        <footer>
            <div className="pt-6 text-white">
                <Link to="/in">Admin Login</Link> |
                <Link to="/client">Client Login</Link>
            </div>
            <div className="details">

                    <div className="logo">
                        <img src={Logo} className="h-7 lg:h-8" alt="academiasteph21 logo"></img>
                        <span className="ml-2 text-xl">
                            AcademiaSteph21
                        </span>
                    </div>

                    <div className="logo">
                        <img src={IgIcon} className="h-5 lg:h-8" alt="academiasteph21 logo"></img>
                        <span className="ml-2 text-lg">@academiasteph21</span>
                    </div>


                    <div className="logo">
                        <img src={MailIcon} className="h-4 lg:h-6" alt="academiasteph21 logo"></img>
                        <span className="ml-2 text-lg">info@academiasteph21.com</span>
                    </div>

            </div>



        <p className="py-6 text-sm cursor-pointer md:text-base text-dark-4 hover:text-gray-500">DEVELOPED BY FRANKLIN SHERA</p>


    </footer>
    )
}

export default Footer
