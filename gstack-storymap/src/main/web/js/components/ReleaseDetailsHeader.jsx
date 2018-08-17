import React from 'react'
import {Menu} from "semantic-ui-react";
import {SidebarMaximizeButton} from "./Contexts";
import Icon from "./Icon";
import {Link, withRouter} from "react-router-dom";

class ReleaseDetailsHeader extends React.Component {


    render() {

        const {match: {params: {project, mode, id}}} = this.props

        return <Menu fixed='top' borderless className="title" pointing>
            <Menu.Item active={!mode}>
                <Link to={`/${project}/!/release/${id}`}>Release: #{id}</Link>
            </Menu.Item>
            <Menu.Item active={mode === 'edit'}>
                <Link to={`/${project}/!/release/${id}/edit`}><Icon name="edit"/></Link>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item><SidebarMaximizeButton/></Menu.Item>
            </Menu.Menu>
        </Menu>
    }

}


export default withRouter(ReleaseDetailsHeader)