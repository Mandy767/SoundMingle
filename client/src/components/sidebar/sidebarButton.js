import React from 'react'
import { IconContext } from 'react-icons/lib'
import {Link, useLocation} from 'react-router-dom'
import '../sidebar/sidebarButton.css'

function SidebarButton(props) {

    const location = useLocation();

    const isActive = location.pathname === props.to;

    const btnClass = isActive ? "btn-body active" : "btn-body"

    return (
        <Link to={props.to}>
        <div className={btnClass}>
            <IconContext.Provider value={{size: "30px", className: "btn-icon"}}>
            {props.icon}
            <p className="btn-title text-white">{props.title}</p>
            </IconContext.Provider>
        </div>
        </Link>
    )
}

export default SidebarButton
