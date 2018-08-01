import React from 'react'
import {Link, withRouter} from "react-router-dom";
import {openSidebar} from "./Contexts";
import LogsSidebar from "./LogsSidebar";

const openLogs = suite => openSidebar(<LogsSidebar suite={suite}/>)

const LogsEntry = (props) => {
    let {suite, className} = props
    return <a className={className} onClick={() => openLogs(suite)}>
        {props.children}
    </a>
}

export default LogsEntry