import React from 'react'
import Placeholder from "./Placeholder";
import {Route, Switch, withRouter} from "react-router-dom";
import CardDetailsSidebar from "./CardDetailsSidebar";
import CreateReleaseSidebar from "./CreateReleaseSidebar";
import ReleaseDetailsSidebar from "./ReleaseDetailsSidebar";

class SidebarRouter extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        const {visible} = nextProps
        return visible
    }

    render() {
        return <Placeholder>
            <Switch>
                <Route path='/:project/:maximized(!{1,2})/card/:id' component={CardDetailsSidebar}/>
                <Route exact path="/:project/:maximized(!{1,2})/release/new" component={CreateReleaseSidebar}/>
                <Route path="/:project/:maximized(!{1,2})/release/:id" component={ReleaseDetailsSidebar}/>
                <Route render={() => <div>Not Found</div>} />
            </Switch>
        </Placeholder>
    }
}

export default withRouter(SidebarRouter)