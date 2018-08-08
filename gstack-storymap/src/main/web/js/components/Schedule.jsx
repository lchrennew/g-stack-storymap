import React from 'react'
import Placeholder from "./Placeholder";
import FeatureList from "./FeatureList";
import {Accordion} from 'semantic-ui-react'
import Icon from "./Icon";

class Schedule extends React.Component {
    render() {
        const {activities, release} = this.props
        return release ?
            <Placeholder className="schedule">
                <Accordion.Title active>
                    <div className="sticky"><Icon name="chevron-down"/> {release.title}</div>
                </Accordion.Title>
                <Accordion.Content active className="stretched">
                    {
                        activities.map((activity, k) => {
                            return <div className="activity item"
                                        key={k}
                                        data-id={`${activity.id}`}>
                                {
                                    activity.details ? activity.details.map(task => {
                                        return <FeatureList
                                            key={task.id}
                                            release={release}
                                            task={task}
                                            list={task.plans ? task.plans[release.id.toString()] : null}
                                        />
                                    }) : null
                                }
                            </div>
                        })
                    }

                </Accordion.Content>
            </Placeholder> :
            <Placeholder className="not schedule">
                <Accordion.Title active>
                    <div className="sticky"><Icon name="chevron-down"/> Unscheduled features</div>
                </Accordion.Title>
                <Accordion.Content active className="stretched">
                    {
                        activities.map((activity, k) => {
                            return <div className="activity item"
                                        key={k}
                                        data-id={`${activity.id}`}>
                                {
                                    activity.details ? activity.details.map(task =>
                                        <FeatureList
                                            key={task.id}
                                            list={task.details}
                                            task={task}/>) : null
                                }
                            </div>
                        })
                    }
                </Accordion.Content>
            </Placeholder>
    }
}

export default Schedule