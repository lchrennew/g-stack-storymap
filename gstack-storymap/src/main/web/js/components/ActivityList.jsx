import React from 'react'
import Sortable from "./Sortable";
import TaskList from "./TaskList";
import Card from "./Card";

class ActivityList extends React.Component {
    render() {
        const {activities} = this.props
        const onClone = e => {
            $(e.clone).remove()
        }

        return <Sortable className="activity sortable list stretched"
                         ghostClass="ui-sortable-placeholder"
                         dragClass="drag-activity"
                         onClone={onClone}

        >
            {
                activities.map((activity) => (
                    <Card nested={<TaskList activity={activity}/>}
                          key={activity.id}
                          card={activity}
                    />
                ))
            }
        </Sortable>
    }
}

export default ActivityList