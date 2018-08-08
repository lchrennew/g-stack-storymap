import React from 'react'
import Icon from "./Icon";
import {setNext} from "../actions";
import {connect} from 'react-redux'


const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setNext: (id, next) => dispatch(setNext(id, next))
    }
}

class AddNextButton extends React.Component {

    addNext(e) {
        e.preventDefault()
        const {id, setNext} = this.props
        setNext(id, {title: 'Empty'})
    }

    render() {
        const {horizontal} = this.props
        return <a
            href="#"
            title="Add below"
            onClick={this.addNext.bind(this)}>
            <Icon name={horizontal ? 'arrow-right-circle' : 'arrow-down-circle'}/>
        </a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNextButton)