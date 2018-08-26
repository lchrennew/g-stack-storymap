import React from 'react'
import Placeholder from "../../common/Placeholder";
import FeatureList from "./FeatureList";
import {Accordion} from 'semantic-ui-react'
import Icon from "../../common/Icon";
import ReleaseDetailsEntry from "../../triggers/ReleaseDetailsEntry";
import DeleteReleaseButton from "../../sidebars/DeleteReleaseButton";
import CreateReleaseButton from "../../triggers/CreateReleaseButton";
import ReleaseMoveButton from "../../triggers/ReleaseMoveButton";

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
        const {activities, release, first = false, last = false} = this.props
        const {fold} = this.state
        return <Placeholder className={`${release ? '' : 'not '}schedule`}>
            <Accordion.Title active={!fold}>
                <div className="sticky">
                    <span
                        onClick={release ? this.toggleFold.bind(this) : null}
                    >
                        <Icon
                            name={fold
                                ? 'chevron-up'
                                : release
                                    ? 'chevron-down'
                                    : 'inbox'}/>
                        {release ? release.title : 'Unscheduled features'}
                    </span>
                    {
                        release
                        && (release.begin || release.end)
                        && <span className='text-muted addon'><Icon name="calendar"/>
                           {release.begin || '?'} - {release.end || '?'}
                           </span>
                    }
                </div>
                <div className="sticky right">
                    <div className="actions">
                        {
                            release
                                ? <Placeholder>
                                    {
                                        first
                                            ? null
                                            : <ReleaseMoveButton
                                                title="move up"
                                                id={release.id}
                                                direction={'Previous'}
                                            >
                                                <Icon name="arrow-up"/>
                                            </ReleaseMoveButton>
                                    }
                                    {
                                        last
                                            ? null
                                            : <ReleaseMoveButton
                                                title="move down"
                                                direction={'Next'}
                                                id={release.id}
                                            >
                                                <Icon name="arrow-down"/>
                                            </ReleaseMoveButton>
                                    }
                                    <ReleaseDetailsEntry id={release.id}>
                                        <Icon name="maximize"/>
                                    </ReleaseDetailsEntry>
                                    <DeleteReleaseButton id={release.id}>
                                        <Icon name="trash"/>
                                    </DeleteReleaseButton>
                                </Placeholder>
                                : <Placeholder>
                                    <CreateReleaseButton><Icon name="plus"/></CreateReleaseButton>
                                    <a href="#" title="show details"><Icon name="maximize"/></a>
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