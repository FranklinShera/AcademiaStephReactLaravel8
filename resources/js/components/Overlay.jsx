import React, { useState, useEffect } from "react";



const Overlay = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.onreadystatechange = () =>
            document.readyState === "complete" && setLoading(false);
    }, []);

    return (
        <>
            {loading && (
                <div className={loading ? "overlay" : "hidden"}>
                    <div className="inn-overlay">
                        <img
                            src="/storage/images/as21logo.png"
                            className="h-20"
                            alt="Academiasteph21 Loading logo"
                        />
                        <span
                            className="mt-2 text-3xl"
                            data-text="AcademiaSteph21"
                        >
                            AcademiaSteph21
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Overlay;
