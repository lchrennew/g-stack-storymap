import React from 'react'
import Icon from "./Icon";
import {setDetail} from "../actions";
import {connect} from 'react-redux'
import {notify} from "./Contexts";


const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setDetail: (id, detail) => dispatch(setDetail(id, detail))
    }
}

class AddDetailButton extends React.Component {

    async addDetail(e) {
        e.preventDefault()
        const {id, setDetail} = this.props
        await setDetail(id, {title: null})
        notify({
            title: 'Add card',
            level: 'success',
            message: 'Done!',
        })
    }

    render() {
        return <a href="#" title="Add below" onClick={this.addDetail.bind(this)}><Icon name="plus-circle"/></a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDetailButton)