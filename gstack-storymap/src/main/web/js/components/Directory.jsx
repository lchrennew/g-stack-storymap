import React from "react"
import VisibleDir from "./VisibleDir";
import Placeholder from "./Placeholder";
import {Label} from "semantic-ui-react";
import Icon from "./Icon";

class Directory extends React.Component {

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
                        <Label>
                            <Icon name="tag"/>
                        </Label>
                    </div>
                </div>
                <div className="file-wrap">
                    <VisibleDir dir={this.getDir()}/>
                </div>
        </Placeholder>
    }
}

export default Directory