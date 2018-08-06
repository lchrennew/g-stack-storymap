import React from 'react'
import Placeholder from "./Placeholder";
import FeatureList from "./FeatureList";
import {Accordion} from 'semantic-ui-react'

class Schedule extends React.Component {
    render() {
        const {activities, release} = this.props
        return release ?
            <Placeholder>
                <Accordion.Title active>
                    <div className="sticky">{release.title}</div>
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
                                    }) : <FeatureList
                                        release={release}
                                    />
                                }
                            </div>
                        })
                    }

                </Accordion.Content>
            </Placeholder> :
            <Placeholder>
                <Accordion.Title active>
                    <div className="sticky">Unscheduled features</div>
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