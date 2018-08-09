import React from 'react'
import Placeholder from "./Placeholder";
import ActivityList from "./ActivityList";
import ScheduleList from "./ScheduleList";
import {connect} from 'react-redux'
import {Header, Message} from "semantic-ui-react";
import AddRootButton from "./AddRootButton";
import Icon from "./Icon";

const mapStateToProps = (state, props) => {
    return {
        cards: state.cards.list,
        releases: state.releases.list,
    }
}
class _ProjectIndex extends React.Component {
    constructor(props) {
        super(props)
        this.contextRef = React.createRef()
    }

    render() {
        const {cards = [], releases = []} = this.props
        if (cards.length) {
            return <div className="body" ref={this.contextRef}>
                <ActivityList activities={cards}/>
                <ScheduleList activities={cards} releases={releases}/>
            </div>
        }
        else {
            return <div className="ui popup visible bottom left fluid" style={{position: 'static'}}>
                <Header as="h1">Welcome!</Header>
                <p>
                    <AddRootButton className="ui massive green button">
                      <Icon name="arrow-right-circle" size={32} />  Start with my first card
                    </AddRootButton>
                </p>
            </div>
        }
    }
}

export const ProjectIndex = connect(mapStateToProps)(_ProjectIndex)