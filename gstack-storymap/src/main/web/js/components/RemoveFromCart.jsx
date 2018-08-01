import React from 'react'
import {removeFromCart} from "../actions";
import {connect} from 'react-redux'

const mapStateToProps = (state, props) => {
    return {}
}
const mapDispatchToProps = dispatch => {
    return {
        remove: (suite, key) => dispatch(removeFromCart(suite, key))
    }
}

class RemoveFromCart extends React.Component {

    onClick(e) {
        e.preventDefault()
        const {item: {key}, suite, remove} = this.props
        remove(suite, key)
    }

    render() {
        return <a className={this.props.className}
                  onClick={this.onClick.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFromCart)