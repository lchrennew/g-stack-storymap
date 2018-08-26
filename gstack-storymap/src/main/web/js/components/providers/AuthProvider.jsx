import React from 'react'
import {connect} from 'react-redux'
import {fetchMe} from "../../actions";
import {Dimmer, Loader} from "semantic-ui-react";


const mapDispatchToProps = dispatch => {
    return {
        loadAuth: () => dispatch(fetchMe()),
    }
}

const mapStateToProps = (state, props) => {
    return {
        needShowLoading: state.users.me == null
    }
}

class AuthProvider extends React.Component {
    async componentDidMount() {
        const {loadAuth} = this.props
        await loadAuth()
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider)