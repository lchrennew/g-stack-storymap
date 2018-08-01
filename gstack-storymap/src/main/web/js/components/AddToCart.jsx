import React from 'react'
import {addToCart} from "../actions";
import {connect} from 'react-redux'

const mapStateToProps = (state, props) => ({})
const mapDispatchToProps = dispatch => {
    return {
        add: item => dispatch(addToCart(item))
    }
}

class AddToCart extends React.Component {

    onClick(e) {
        e.preventDefault()
        const {item, add} = this.props
        add(item)
    }

    render() {
        return <a href="#"
                  className={this.props.className}
                  onClick={this.onClick.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart)