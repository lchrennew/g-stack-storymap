import React from 'react'
import TaskList from "./TaskList";
import Card from "./Card";
import {SortableCards} from "./SortableCards";

class ActivityList extends React.Component {
    render() {
        const {activities} = this.props

        return <SortableCards className="activity"
                              stretched
                              ghostClass="ui-sortable-placeholder"
                              chosenClass="chosen-activity"
                              dragClass="drag-activity"
                              data={{card: activities[0]}}
                              id={-1}
                              cards={activities}
                              horizontal
                              nested={activity => <TaskList activity={activity}/>}
        >
        </SortableCards>
    }
}

export default ActivityList