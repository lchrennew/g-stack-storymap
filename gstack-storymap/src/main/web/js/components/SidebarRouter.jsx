import React from 'react'
import Placeholder from "./Placeholder";
import {Route, Switch, withRouter} from "react-router-dom";
import CardDetailsSidebar from "./CardDetailsSidebar";
import CreateReleaseSidebar from "./CreateReleaseSidebar";
import ReleaseDetailsSidebar from "./ReleaseDetailsSidebar";

class SidebarRouter extends React.Component {
    render() {
        return <Placeholder>
            <Switch>
                <Route path='/:project/!/card/:id' component={CardDetailsSidebar}/>
                <Route exact path="/:project/!/release/new" component={CreateReleaseSidebar}/>
                <Route path="/:project/!/release/:id" component={ReleaseDetailsSidebar}/>
                <Route render={() => <div>Not Found</div>} />
            </Switch>
        </Placeholder>
    }
}

export default withRouter(SidebarRouter)