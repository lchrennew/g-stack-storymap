import React from 'react'
import Icon from "./Icon";
import {setDetail} from "../actions";
import {connect} from 'react-redux'


const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setDetail: (id, detail) => dispatch(setDetail(id, detail))
    }
}

class AddDetailButton extends React.Component {

    addDetail(e) {
        e.preventDefault()
        const {id, setDetail} = this.props
        setDetail(id, {title: ''})
    }

    render() {
        return <a href="#" title="Add below" onClick={this.addDetail.bind(this)}><Icon name="plus-circle"/></a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDetailButton)