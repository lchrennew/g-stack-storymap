import React from 'react'
import Placeholder from "./Placeholder";
import FeatureList from "./FeatureList";
import {Accordion} from 'semantic-ui-react'
import Icon from "./Icon";

class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {fold: false}
    }

    toggleFold(e) {
        e.preventDefault()
        this.setState({fold: !this.state.fold})
    }
    render() {
        const {activities, release} = this.props
        const {fold} = this.state
        return <Placeholder className={`${release ? '' : 'not '}schedule`}>
            <Accordion.Title active={!fold}>
                <div className="sticky">
                    <span onClick={release ? this.toggleFold.bind(this) : null}>
                        <Icon name={fold ? 'chevron-up' : 'chevron-down'}/> {
                        release ? release.title : 'Unscheduled features'
                    }
                    </span>
                </div>
                </Accordion.Title>
            {
                fold
                    ? null
                    : <Accordion.Content active className="stretched">
                        {
                            activities.map((activity, k) => {
                                return <div className="activity item"
                                            key={k}
                                            data-id={`${activity.id}`}>
                                    {
                                        activity.details
                                            ? activity.details.map(task => <FeatureList
                                                key={task.id}
                                                release={release}
                                                task={task}
                                                list={release
                                                    ? task.plans
                                                        ? task.plans[release.id.toString()]
                                                        : null
                                                    : task.details}
                                            />)
                                            : null
                                    }
                                </div>
                            })
                        }

                    </Accordion.Content>
            }

        </Placeholder>
    }
}

export default Schedule