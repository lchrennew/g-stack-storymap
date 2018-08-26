import React from 'react'
import {SortableCards} from "./SortableCards";

class TaskList extends React.Component {

    render() {
        const {activity: {details}, activity} = this.props

        return <SortableCards className="task"
                              ghostClass="ui-sortable-placeholder"
                              dragClass="drag-task"
                              chosenClass="chosen-task"
                              data={{card: activity}}
                              id={`${activity.id}`}
                              cards={details}
                              horizontal
        >
        </SortableCards>
    }
}

export default TaskList