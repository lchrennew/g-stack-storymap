import React from 'react'
import Icon from "./Icon";
import {setPlan} from "../actions";
import {connect} from 'react-redux'


const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setPlan: (id, release, detail) => dispatch(setPlan(id, release, detail))
    }
}

class AddPlanButton extends React.Component {

    addPlan(e) {
        e.preventDefault()
        const {id, release, setPlan} = this.props
        setPlan(id, release, {title: 'Empty'})
    }

    render() {
        return <a href="#" title="Add below" onClick={this.addPlan.bind(this)}><Icon name="plus-circle"/></a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlanButton)