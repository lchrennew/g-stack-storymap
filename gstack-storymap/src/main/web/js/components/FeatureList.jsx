import React from 'react'
import {SortableCards} from "./SortableCards";
import AddDetailButton from "./AddDetailButton";
import AddPlanButton from "./AddPlanButton";

class FeatureList extends React.Component {
    render() {
        const {task, release, list} = this.props

        return <SortableCards className={`feature ${release ? ' release' : ''}`}
                              ghostClass="ui-sortable-placeholder"
                              dragClass="drag-feature"
                              chosenClass="chosen-feature"
                              data={{card: task, release}}
                              id={`${task ? task.id : ''}`}
                              cards={list}
        >
            {
                release
                    ? <AddPlanButton id={task.id} release={release.id}/>
                    : <AddDetailButton id={task.id}/>
            }
        </SortableCards>

    }

}

export default FeatureList