import React from 'react'
import Placeholder from "./Placeholder";
import Card from "./Card";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import Activity from "./Activity";
import Task from "./Task";
import ActivityList from "./ActivityList";
import ScheduleList from "./ScheduleList";

const getCards = () => {
    return [
        {
            "id": 5,
            "title": "A1",
            "details": [
                {
                    "id": 7,
                    "title": "T1"
                },
                {
                    "id": 4,
                    "title": "T2",
                    "plans": {
                        "1": [
                            {
                                "id": 11,
                                "title": "F3"
                            },
                            {
                                "id": 9,
                                "title": "F1"
                            }
                        ]
                    },
                    "details": [
                        {
                            "id": 10,
                            "title": "F2"
                        }
                    ]
                }
            ]
        },
        {
            "id": 6,
            "title": "A2",
            "details": [
                {
                    "id": 8,
                    "title": "T3"
                }
            ]
        }
    ]
}
const getReleases = () => {
    return [
        {
            "id": 2,
            "title": "r2"
        },
        {
            "id": 3,
            "title": "r3"
        },
        {
            "id": 1,
            "title": "r1"
        }
    ]
}


class ProjectIndex extends React.Component{
    render() {
        const {cards = getCards(), releases = getReleases()} = this.props
        return <Placeholder>
            <ActivityList activities={cards}/>
            <ScheduleList activities={cards} releases={releases}/>
        </Placeholder>
    }
}

export default ProjectIndex