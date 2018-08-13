import React from 'react'
import {moveRelease} from "../actions";
import {connect} from 'react-redux'
import {notify} from "./Contexts";

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        move: (id, direction) => dispatch(moveRelease(id, direction))
    }
}

class ReleaseMoveButton extends React.Component {

    async move(e) {
        const {direction, id, move} = this.props
        e.preventDefault()
        await move(id, direction)
        notify({
            title: 'Move release',
            level: 'success',
            message: 'Done!',
        })
    }

    render() {
        return <a href="#" onClick={this.move.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseMoveButton)