import React from 'react'
import {connect} from 'react-redux'
import {fetchProjects} from "../../actions";
import {Dimmer, Loader} from "semantic-ui-react";


const mapDispatchToProps = dispatch => {
    return {
        loadProjects: () => dispatch(fetchProjects()),
    }
}

const mapStateToProps = (state, props) => {
    return {
        needShowLoading: state.projects.list == null
    }
}

class ProjectsProvider extends React.Component {
    async componentDidMount() {
        const {loadProjects} = this.props
        await loadProjects()
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsProvider)