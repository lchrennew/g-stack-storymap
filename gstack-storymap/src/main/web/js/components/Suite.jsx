import React from "react";
import VisibleDir from "./VisibleDir";
import IndexProvider from "./IndexProvider";
import {Divider} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";
import {SidebarContext} from "./Contexts";
import Placeholder from "./Placeholder";
import File from "./File";
import Logs from "./Logs";
import Directory from "./Directory";
import SuiteBreadcrumb from "./SuiteBreadcrumb";

class SuiteIndex extends React.Component{
    render() {
        return <Placeholder>
                <div className="commit-tease">
                    <div className="mr-auto">test</div>
                </div>
                <div className="file-wrap">
                    <VisibleDir dir="/"/>
                </div>
        </Placeholder>
    }
}

class Suite extends React.Component {

    render() {
        let {match: {params: {suite}}, location: {pathname}} = this.props
        return <Placeholder>
            <SuiteBreadcrumb suite={suite} dir={pathname}/>
            <Divider hidden/>
            <IndexProvider>
                <Switch>
                    <Route path="/:suite/tree/:dir" component={Directory}/>
                    <Route path="/:suite/clob/:dir" component={File}/>
                    <Route path="/:suite/logs" component={Logs}/>
                    <Route path="/:suite" component={SuiteIndex}/>
                </Switch>
            </IndexProvider>
            <Divider hidden/>
        </Placeholder>

    }
}



export default Suite