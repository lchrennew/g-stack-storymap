import React from 'react'
import {fetchResults} from "../actions";
import {connect} from 'react-redux'
import {Dimmer, Loader} from "semantic-ui-react";


const mapDispatchToProps = dispatch => {
    return {
        loadResults: suite => dispatch(fetchResults(suite)),
    }
}
const noData = state => state.results.list == null,
    suiteChanged = (state, props) => state.results.suite !== props.suite
const mapStateToProps = (state, props) => {
    return {
        needShowLoading: noData(state) || suiteChanged(state, props)
    }
}

class ResultsProvider extends React.Component {
    async componentDidMount() {
        const {loadResults, suite} = this.props
        await loadResults(suite)
    }

    async componentDidUpdate(){
        const {loadResults, suite} = this.props
        await loadResults(suite)
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

export default connect(mapStateToProps, mapDispatchToProps)(ResultsProvider)