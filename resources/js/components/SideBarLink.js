import React, { useState } from 'react'
import { Link , useRouteMatch} from 'react-router-dom'
import { useDispatch , useSelector } from 'react-redux'




//actions
import {  sidebarPos } from '.././actions/AuthUserActions'

const SideBarLink = ({ sidelink , linkPos }) => {


    const dispatch = useDispatch()

    const AdminPanel = useSelector( state => state.adminPanel)

    const [showLinks, toggleLinkGroup] =  useState(false)

    const { sidebarPosition } = AdminPanel;

    const linkIconColor = "#111111dd";
    const linkActiveIconColor = "#F27323";


    const linkView = async (e) => {
        e.preventDefault();

        if(linkPos == sidebarPosition)
        {
           toggleLinkGroup(!showLinks)
           dispatch(sidebarPos(0))
           
        }else{

            toggleLinkGroup(false)
            dispatch(sidebarPos(linkPos))
            toggleLinkGroup(true)

        }
        
    }

    return (
        <div className={`link-holder hover:active-link-border ${(linkPos == sidebarPosition) && ' active-link-border ' }`}>
            <label className={`sidebarlabel hover:text-primary-1 ${(linkPos == sidebarPosition) ? ' text-primary-1 ': ' text-palbrowner ' }`} onClick={linkView}> 
            

                 { (sidelink.name == "Orders") && (                  
                    <svg className="sidebarlabel-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" fill={(sidebarPosition == 1) ? linkActiveIconColor : linkIconColor}>
                        <path d="M2.09375 4.09375C1.839844 4.09375 1.566406 4.179688 1.375 4.375C0.988281 4.761719 0.988281 5.394531 1.375 5.78125L8.21875 12.625C8.414063 12.820313 8.652344 12.90625 8.90625 12.90625C9.160156 12.90625 9.433594 12.816406 9.625 12.625C10.011719 12.238281 10.011719 11.605469 9.625 11.21875L2.78125 4.375C2.585938 4.179688 2.347656 4.09375 2.09375 4.09375 Z M 23.90625 4.09375C23.652344 4.09375 23.414063 4.179688 23.21875 4.375L16.375 11.21875C15.988281 11.605469 15.988281 12.238281 16.375 12.625C16.566406 12.816406 16.839844 12.90625 17.09375 12.90625C17.347656 12.90625 17.585938 12.820313 17.78125 12.625L24.625 5.78125C25.011719 5.394531 25.011719 4.761719 24.625 4.375C24.433594 4.179688 24.160156 4.09375 23.90625 4.09375 Z M 1 11C0.449219 11 0 11.449219 0 12L0 15C0 15.550781 0.449219 16 1 16L2 16L2 17C2 17.089844 4 25 4 25C4.296875 25.53125 4.546875 26 5 26L21 26C21.550781 26 21.765625 25.5625 22 25C22 25 24 17.089844 24 17L24 16L25 16C25.550781 16 26 15.550781 26 15L26 12C26 11.449219 25.550781 11 25 11L20.90625 11L18.34375 13.5625C17.953125 13.953125 17.425781 14.1875 16.875 14.1875C16.324219 14.1875 15.828125 13.953125 15.4375 13.5625C14.738281 12.867188 14.636719 11.796875 15.15625 11L10.84375 11C11.363281 11.796875 11.261719 12.867188 10.5625 13.5625C10.171875 13.953125 9.675781 14.1875 9.125 14.1875C8.574219 14.1875 8.046875 13.953125 7.65625 13.5625L5.09375 11 Z M 9 16C9.550781 16 10 16.449219 10 17L10 23C10 23.550781 9.550781 24 9 24C8.449219 24 8 23.550781 8 23L8 17C8 16.449219 8.449219 16 9 16 Z M 13 16C13.550781 16 14 16.449219 14 17L14 23C14 23.550781 13.550781 24 13 24C12.449219 24 12 23.550781 12 23L12 17C12 16.449219 12.449219 16 13 16 Z M 17 16C17.550781 16 18 16.449219 18 17L18 23C18 23.550781 17.550781 24 17 24C16.449219 24 16 23.550781 16 23L16 17C16 16.449219 16.449219 16 17 16Z" fill={(sidebarPosition == 1) ? linkActiveIconColor : linkIconColor} />
                    </svg>
                 )}   


                 { (sidelink.name == "Messages") && (
                    <svg  className="sidebarlabel-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" fill={(sidebarPosition == 2) ? linkActiveIconColor : linkIconColor}>
                    <path d="M23 4L3 4C1.300781 4 0 5.300781 0 7L0 19C0 20.699219 1.300781 22 3 22L23 22C24.699219 22 26 20.699219 26 19L26 7C26 5.300781 24.699219 4 23 4 Z M 23.800781 19.398438L16 13.800781L13 15.800781L9.898438 13.800781L2.199219 19.398438L8.5 12.898438L0.800781 6.898438L13 13.5L25.101563 7L17.5 13Z" fill={(sidebarPosition == 2) ? linkActiveIconColor : linkIconColor} />
                  </svg>
                 )}     


                 { (sidelink.name == "Payment") && (
                    <svg className="sidebarlabel-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" fill={(sidebarPosition == 3) ? linkActiveIconColor : linkIconColor}>
                    <path d="M23 6C23 6 5.640625 6 2.648438 6C1.769531 6 0.988281 5.824219 0.988281 5L23 4L23 2C23 0.34375 21.65625 0 20 0L2.019531 3C0.417969 3.355469 0 4.035156 0 5L0 23C0 24.65625 1.34375 26 3 26L23 26C24.65625 26 26 24.65625 26 23L26 9C26 7.34375 24.65625 6 23 6 Z M 22 18C20.894531 18 20 17.105469 20 16C20 14.894531 20.894531 14 22 14C23.105469 14 24 14.894531 24 16C24 17.105469 23.105469 18 22 18Z" fill={(sidebarPosition == 3) ? linkActiveIconColor : linkIconColor} />
                  </svg>
                 )}    


                 { (sidelink.name == "My Profile") && (
                     <svg className="sidebarlabel-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" fill={(sidebarPosition == 4) ? linkActiveIconColor : linkIconColor}>
                     <path d="M16.5625 15.898438C16.402344 15.847656 15.398438 15.394531 16.027344 13.484375L16.019531 13.484375C17.65625 11.800781 18.90625 9.085938 18.90625 6.414063C18.90625 2.308594 16.175781 0.15625 13 0.15625C9.824219 0.15625 7.109375 2.308594 7.109375 6.414063C7.109375 9.097656 8.351563 11.820313 10 13.503906C10.640625 15.1875 9.492188 15.8125 9.253906 15.898438C5.929688 17.101563 2.03125 19.292969 2.03125 21.457031C2.03125 22.039063 2.03125 21.6875 2.03125 22.269531C2.03125 25.214844 7.742188 25.886719 13.03125 25.886719C18.328125 25.886719 23.96875 25.214844 23.96875 22.269531C23.96875 21.6875 23.96875 22.039063 23.96875 21.457031C23.96875 19.230469 20.050781 17.054688 16.5625 15.898438Z" fill={(sidebarPosition == 4) ? linkActiveIconColor : linkIconColor} />
                   </svg>
                 )}      


                 { (sidelink.name == "Control") && (
                    <svg className="sidebarlabel-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" fill={(sidebarPosition == 5) ? linkActiveIconColor : linkIconColor}>
                      <path d="M11 4C9.332031 4 8 5.332031 8 7C8 8.492188 9.082031 9.695313 10.5 9.9375C11.238281 10.144531 12.558594 10.585938 12.84375 11.15625C13.308594 11.992188 13.050781 12.957031 12.6875 13.8125C12.265625 14.445313 12 15.183594 12 16C12 18.199219 13.800781 20 16 20C18.199219 20 20 18.199219 20 16C20 13.949219 18.433594 12.183594 16.4375 12.03125C16.417969 12.023438 16.402344 12.003906 16.375 12C14.476563 11.800781 14.125 11.550781 13.625 10.75C13.292969 10.222656 13.566406 8.988281 13.78125 8.1875C13.824219 8.082031 13.84375 7.953125 13.875 7.84375C13.949219 7.597656 14 7.46875 14 7.46875L13.9375 7.5C13.964844 7.332031 14 7.175781 14 7C14 5.445313 12.667969 4.109375 11 4 Z M 21 4C19.332031 4 18 5.332031 18 7C18 8.667969 19.332031 10 21 10C22.667969 10 24 8.667969 24 7C24 5.445313 22.667969 4.109375 21 4 Z M 6 13C4.332031 13 3 14.332031 3 16C3 17.667969 4.332031 19 6 19C7.667969 19 9 17.667969 9 16C9 14.445313 7.667969 13.109375 6 13 Z M 26 13C24.332031 13 23 14.332031 23 16C23 17.667969 24.332031 19 26 19C27.667969 19 29 17.667969 29 16C29 14.445313 27.667969 13.109375 26 13 Z M 11 22C9.332031 22 8 23.332031 8 25C8 26.667969 9.332031 28 11 28C12.667969 28 14 26.667969 14 25C14 23.445313 12.667969 22.109375 11 22 Z M 21 22C19.332031 22 18 23.332031 18 25C18 26.667969 19.332031 28 21 28C22.667969 28 24 26.667969 24 25C24 23.445313 22.667969 22.109375 21 22Z" fill={(sidebarPosition == 5) ? linkActiveIconColor : linkIconColor} />
                    </svg>
                 )}      
                 
                       
                { sidelink.name }

            </label>


            { (showLinks && linkPos == sidebarPosition) && (
                <div className="sidelinks-container">

                    
                    { sidelink.links.map( (slink,index) => (
                        <li className=" sidebarlink" key={index}>
                            <svg className="inline h-4 mr-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" fill="#5f89ff">
                                <path d="M21.1875 9.28125L19.78125 10.71875L24.0625 15L4 15L4 17L24.0625 17L19.78125 21.28125L21.1875 22.71875L27.90625 16Z" fill="#5f89ff" />
                            </svg>
                            <Link to={ slink.url } >{ slink.name }</Link>
                        </li>
                    ))}
                   
                    
                          
                </div>
            )}
            
        </div>
    )
}

export default SideBarLink
