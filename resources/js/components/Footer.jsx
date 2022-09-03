import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="details">
                <div className="logo">
                    <img
                        src="/storage/images/as21logo.png"
                        className="h-7 lg:h-8"
                        alt="academiasteph21 logo"
                    ></img>
                    <span className="ml-2 text-xl">AcademiaSteph21</span>
                </div>

                <div className="logo">
                    <img
                        src="/storage/images/as21ig.svg"
                        className="h-5 lg:h-8"
                        alt="academiasteph21 logo"
                    ></img>
                    <span className="ml-2 text-lg">@academiasteph21</span>
                </div>

                <div className="logo">
                    <img
                        src="/storage/images/as21mail.svg"
                        className="h-4 lg:h-6"
                        alt="academiasteph21 logo"
                    ></img>
                    <span className="ml-2 text-lg">
                        info@academiasteph21.com
                    </span>
                </div>
            </div>
            <div className="text-white">&copy;{new Date().getFullYear()}</div>

            <p className="py-6 text-sm cursor-pointer md:text-base text-dark-4 hover:text-gray-500">
                DEVELOPED BY FRANKLIN SHERA
            </p>
        </footer>
    );
};

export default Footer;
