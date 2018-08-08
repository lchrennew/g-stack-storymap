import React from "react";
import {Route, Switch} from "react-router-dom";
import {ProjectIndex} from "./ProjectIndex";
import ProjectProvider from "./ProjectProvider";

class Project extends React.Component {

    render() {
        let {match: {params: {project}}} = this.props
        return <ProjectProvider project={project}>
            {/*<Breadcrumb size="huge">*/}
                {/*<Icon name="map" size={24}/> <Link to={`/${project}`} className="section"><b>DEMO</b></Link>*/}
                {/*<Breadcrumb.Divider>/</Breadcrumb.Divider>*/}
            {/*</Breadcrumb>*/}
            {/*<Divider hidden/>*/}

            <Switch>
                <Route path="/:project" component={ProjectIndex}/>
            </Switch>
        </ProjectProvider>

    }
}


export default Project