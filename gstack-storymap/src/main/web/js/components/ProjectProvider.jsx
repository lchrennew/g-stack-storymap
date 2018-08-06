import React from 'react'
import {connect} from 'react-redux'
import {fetchCards, fetchReleases} from "../actions";
import {Dimmer, Loader} from "semantic-ui-react";


const mapDispatchToProps = dispatch => {
    return {
        loadCards: (project) => dispatch(fetchCards(project)),
        loadReleases: project => dispatch(fetchReleases(project)),
    }
}

const mapStateToProps = (state, props) => {
    return {
        needShowLoading: state.cards.list == null || state.releases.list == null
    }
}

class ProjectProvider extends React.Component {
    async componentDidMount() {
        const {loadCards, loadReleases, project} = this.props
        await loadCards(project)
        await loadReleases(project)
    }

    render() {
        if (this.props.needShowLoading) {
            return <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>
        }
        else {
            return this.props.children
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectProvider)