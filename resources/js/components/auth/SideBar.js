import React from 'react'
import { Link , BrowserRouter} from 'react-router-dom'
import SideBarLink from '../SideBarLink'

const SideBar = ({ links , isAdmin }) => {


    return (
        <div className="admin_sidebar">
            <Link to={ isAdmin ? "/in/dashboard" : "/client/dashboard/"}>
                <h1 className="text-2xl font-bold">DASHBOARD</h1>
            </Link>
            <div className="sidebar_links">

                    {links.map((slink , index) => (
                             <SideBarLink sidelink={slink} linkPos={ index + 1} key={index}/>
                    ))}


            </div>
        </div>
    )
}

export default SideBar
