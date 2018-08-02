import React from "react";
import {Breadcrumb, Divider} from "semantic-ui-react";
import {Link, Route, Switch} from "react-router-dom";
import Placeholder from "./Placeholder";
import Icon from "./Icon";
import ProjectIndex from "./ProjectIndex";

class Project extends React.Component {

    render() {
        let {match: {params: {project}}, location: {pathname}} = this.props
        return <Placeholder>
            <Breadcrumb size="huge">
                <Icon name="map" size={24}/> <Link to={`/${project}`} className="section"><b>DEMO</b></Link>
                <Breadcrumb.Divider>/</Breadcrumb.Divider>
            </Breadcrumb>
            <Divider hidden/>
            <Switch>
                <Route path="/:project" component={ProjectIndex}/>
            </Switch>
            <Divider hidden/>
        </Placeholder>

    }
}


export default Project