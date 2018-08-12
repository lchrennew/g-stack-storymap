import React from 'react'
import {moveRelease} from "../actions";
import {connect} from 'react-redux'

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        move: (id, direction) => dispatch(moveRelease(id, direction))
    }
}

class ReleaseMoveButton extends React.Component {

    move(e) {
        const {direction, id, move} = this.props
        e.preventDefault()
        move(id, direction)
    }

    render() {
        return <a href="#" onClick={this.move.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseMoveButton)