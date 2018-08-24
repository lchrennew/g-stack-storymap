import React from 'react'
import {connect} from 'react-redux'
import {fetchCriteria} from "../actions";
import {Dimmer, Loader} from "semantic-ui-react";


const mapDispatchToProps = dispatch => {
    return {
        load: (id) => dispatch(fetchCriteria(id)),
    }
}

const mapStateToProps = (state, props) => {
    return {
        needShowLoading: state.criteria.list == null || state.criteria.id !== props.id
    }
}

class CriteriaProvider extends React.Component {
    async componentDidMount() {
        const {load, id} = this.props
        await load(id)
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

export default connect(mapStateToProps, mapDispatchToProps)(CriteriaProvider)