import React, { useState, useEffect } from "react";

import Logo from ".././images/as21logo.png";
import { useSelector, RootStateOrAny } from "react-redux";

const Loader = () => {
    const AcademicLevels = useSelector((state) => state.academicLevels);
    const authClient = useSelector((state) => state.authClient);

    const [isLoading, setLoading] = useState(false);

    //
    //
    // useEffect(() => {
    //
    //     (authClient.loading || AcademicLevels.loading) && setLoading(true)
    //     console.log("LOADER USE EFFECT " , (authClient.loading || AcademicLevels.loading))
    //
    // }, [ authClient.loading , AcademicLevels.loading ])
    //

    return (
        <>
            {isLoading && (
                <div className={isLoading ? "loader-overlay" : "hidden"}>
                    <div className="wait-loader">
                        <div className="center">
                            <img src={Logo} alt="AcademiaSteph21 Loader" />
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
            )}
        </>
    );
};

export default Loader;
