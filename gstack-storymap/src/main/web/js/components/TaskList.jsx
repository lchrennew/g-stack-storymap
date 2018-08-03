import React from 'react'
import Sortable from './Sortable'
import Card from "./Card";

class TaskList extends React.Component {
    render() {
        const {activity: {details}} = this.props

        return <Sortable className="task sortable list"
                         ghostClass="ui-sortable-placeholder"
                         dragClass="drag-task"
        >
            {
                details ? details.map(task => (
                    <Card key={task.id} card={task}/>
                )) : null
            }
        </Sortable>
    }
}

export default TaskList