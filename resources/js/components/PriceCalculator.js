import React, {useState} from "react";

const PriceCalculator = () => {



    const[paperAction,setPaperAction] = useState(0)

    const[pageNums,setPageNum] = useState([1,2,3,4,5,6,7,8])


    const[pageWords,setPageWord] = useState({
        page: 1,
        words: 275
    })

    const[educationStage,setStage] = useState([
        "School" , "College" ,"University","Master's", "Doctorate"
    ])

    const[essayType,setEssayType] = useState([
        "Admission" ,"Article Review","Business Plan"
    ])




    return (
        <div className="hidden price-calculator lg:block">
            <h1 className="text-2xl font-bold">Price Calculator</h1>
            <div className="calc-body">
                <div className="calc-tabs">

                    <span className={(paperAction == 0) ? 'curr-tab' : 'idle-tab'} onClick={() => setPaperAction(0)}>Writing</span>
                    <span className={(paperAction == 1) ? 'curr-tab' : 'idle-tab'} onClick={() => setPaperAction(1)}>Rewriting</span>
                    <span className={(paperAction == 2) ? 'curr-tab' : 'idle-tab'} onClick={() => setPaperAction(2)}>Editing</span>
                </div>
                <div className="mt-4 essay-type">
                    <select name="essay-type" id="essay-type" className="w-full">
                        <option value="" selected>Essay (Any Type)</option>

                        {essayType.map(essay =>(
                            <option value={essay}>{essay}</option>
                        ))}

                    </select>
                </div>

                <div className="flex justify-between mt-4 stage-time">
                    <select name="stage" id="stage" className="w-1/2">
                        {educationStage.map(stage =>(
                            (stage === "College") ? <option value={stage} selected>{stage}</option> : <option value={stage}>{stage}</option>
                        ))}
                    </select>
                    <select name="essay-time" id="essay-time" className="w-1/2">
                        <option value="">6 Hours</option>
                        <option value="">12 Hours</option>
                        <option value="">1 Day</option>
                        <option value="">2 Days</option>
                        <option value="">3 Days</option>
                        <option value="">5 Days</option>
                        <option value="">7 Days</option>
                        <option value="">10 Days</option>
                        <option value="" selected>2 Weeks</option>
                        <option value="">1 Month</option>
                        <option value="">2 Months</option>
                    </select>
                </div>

                <div className="flex justify-between p-2 mt-4 essay-pages ">

                    <div className="flex items-center justify-center font-extrabold border rounded page-minus border-primary-3 w-10/100"> - </div>

                    <select name="pages-words" id="pages-words" className="w-3/4 text-center">
                        {pageNums.map(pageNum => (
                            (pageNum == 1) ? <option value={pageNum} selected>{pageNum} Page/{pageNum*pageWords.words} Words</option> : <option value={pageNum}>{pageNum} Pages/{pageNum*pageWords.words} Words</option>
                        ))}
                    </select>

                    <div className="flex items-center justify-center w-1 font-extrabold border rounded page-plus border-primary-3 w-10/100"> + </div>

                </div>

                <div className="flex justify-between mt-4 essay-spacing">

                    <div className="flex justify-between double-spacing">
                        <input type="radio"/>
                        <span className="ml-1">Double Spacing</span>
                    </div>


                    <div className="flex justify-between single-spacing">
                        <input type="radio"/>
                        <span className="ml-1">Single Spacing</span>
                    </div>

                </div>

                <div className="flex justify-end px-3 mt-4 font-bold computed-price">
                    $28.00
                </div>

                <button className="w-full py-3 mt-4 font-bold text-white rounded bg-primary-4">Write My Paper</button>
            </div>
        </div>
    )
}

export default PriceCalculator;
