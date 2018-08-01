// 场景列表

import React from 'react'
import ScenarioItem from "./ScenarioItem";
import {withSpec} from "./SpecProvider";
import {ParentDirItem} from "./ParentDirItem";
import {Table} from "semantic-ui-react";


class ScenarioList extends React.Component {

    render() {
        let {spec} = this.props
        if (spec){
            let {items} = this.props
            return <Table size="small" basic="very" className="files" selectable>
                <Table.Body>
                <ParentDirItem visible={true} />
                {
                    items.map(({title, tags, lineNumber}, i) => (
                        <ScenarioItem {...{title, tags, lineNumber, spec}} key={i}/>))
                }
                </Table.Body>
            </Table>
        }
        else return <div>Loading...</div>
    }
}

export default withSpec(ScenarioList)