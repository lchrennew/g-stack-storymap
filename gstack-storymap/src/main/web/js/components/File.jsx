import React from "react";
import {SpecTitle} from "./SpecProvider";
import Placeholder from "./Placeholder";
import VisibleScenarios from "./VisibleScenarios";


// TODO: filter
class File extends React.Component {

    getDir() {
        let {match: {isExact, params: {dir}, url}, location: {pathname}} = this.props
        return isExact ?
            dir :
            [dir, pathname.substr(url.length).replace('/', '')].join('/')
    }

    render() {
        return <Placeholder>
                <div className="commit-tease">
                    <div className="mr-auto">
                        <SpecTitle/>
                    </div>
                </div>
                <div className="file-wrap">
                    <VisibleScenarios/>
                </div>
        </Placeholder>
    }
}

export default File