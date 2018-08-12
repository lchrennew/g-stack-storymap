import React from 'react'
import Placeholder from "./Placeholder";
import FeatureList from "./FeatureList";
import {Accordion} from 'semantic-ui-react'
import Icon from "./Icon";
import {openSidebar} from "./Contexts";
import ReleaseDetails from "./ReleaseDetails";
import ReleaseDetailsEntry from "./ReleaseDetailsEntry";

class Schedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {fold: false}
    }

    toggleFold(e) {
        e.preventDefault()
        this.setState({fold: !this.state.fold})
    }

    bindOpenRelease(release) {
        return e => {
            e.preventDefault()
            release && this.open(release)
        }
    }

    open(release) {
        openSidebar(<ReleaseDetails id={release.id}/>)
    }

    render() {
        const {activities, release} = this.props
        const {fold} = this.state
        return <Placeholder className={`${release ? '' : 'not '}schedule`}>
            <Accordion.Title active={!fold}>
                <div className="sticky">
                    <span
                        onClick={release ? this.toggleFold.bind(this) : null}
                        onContextMenu={this.bindOpenRelease(release)}
                    >
                        <Icon
                            name={fold
                                ? 'chevron-up'
                                : release
                                    ? 'chevron-down'
                                    : 'inbox'}/> {
                        release ? release.title : 'Unscheduled features'
                    }
                    </span>

                </div>
                <div className="sticky right">
                    <div className="actions">
                        {
                            release
                                ? <Placeholder>
                                    <a href="#" title="move up"><Icon name="arrow-up"/></a>
                                    <a href="#" title="move down"><Icon name="arrow-down"/></a>
                                    <ReleaseDetailsEntry id={release.id}>
                                        <Icon name="maximize"/>
                                    </ReleaseDetailsEntry>
                                    <a href="#" title="remove details"><Icon name="trash"/></a>
                                </Placeholder>
                                : <Placeholder>
                                    <a href="#" title="show details"><Icon name="maximize"/></a>
                                    <a href="#" title="add new release"><Icon name="plus"/></a>
                                </Placeholder>
                        }
                    </div>
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