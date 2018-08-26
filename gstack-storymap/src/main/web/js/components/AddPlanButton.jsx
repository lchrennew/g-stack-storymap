import React from 'react'
import Icon from "./Icon";
import {setPlan} from "../actions";
import {connect} from 'react-redux'
import {notify} from "./NotificationManager";


const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setPlan: (id, release, detail) => dispatch(setPlan(id, release, detail))
    }
}

class AddPlanButton extends React.Component {

    async addPlan(e) {
        e.preventDefault()
        const {id, release, setPlan} = this.props
        await setPlan(id, release, {title: null})
        notify({
            title: 'Add card',
            level: 'success',
            message: 'Done!',
        })
    }

    render() {
        return <a href="#" title="Add below" onClick={this.addPlan.bind(this)}><Icon name="plus-circle"/></a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlanButton)