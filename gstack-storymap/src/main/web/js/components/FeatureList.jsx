import React from 'react'
import Card from "./Card";
import {SortableCards} from "./SortableCards";

class FeatureList extends React.Component {
    render() {
        const {task, release, list} = this.props

        return <SortableCards className={`feature sortable list${release ? ' release' : ''}`}
                              ghostClass="ui-sortable-placeholder"
                              dragClass="drag-feature"
                              chosenClass="chosen-feature"
                              data={{card: task, release}}
                              id={`${task ? task.id : ''}`}
                              cards={list}
        >
        </SortableCards>

    }

}

export default FeatureList