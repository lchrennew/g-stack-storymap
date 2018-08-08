import React from 'react'
import Placeholder from "./Placeholder";
import ActivityList from "./ActivityList";
import ScheduleList from "./ScheduleList";
import {connect} from 'react-redux'

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
        return <Placeholder ref={this.contextRef}>
            <ActivityList activities={cards}/>
            <ScheduleList activities={cards} releases={releases}/>
        </Placeholder>
    }
}

export const ProjectIndex = connect(mapStateToProps)(_ProjectIndex)