import React from "react";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center text-2xl font-bold h-80">
            PAGE NOT FOUND
            <button
                className="px-10 py-4 mt-5 text-lg font-bold text-white rounded-lg bg-primary-4"
                onClick={() => hist.goBack()}
            >
                {" "}
                GO BACK
            </button>
        </div>
    );
};

export default NotFound;
