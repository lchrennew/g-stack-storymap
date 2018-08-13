import React from 'react'
import {delRelease} from "../actions";
import {connect} from 'react-redux'
import {notify} from "./Contexts";

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        deleteRelease: id => dispatch(delRelease(id))
    }
}

class DeleteReleaseButton extends React.Component {

    async deleteRelease(e) {
        e.preventDefault()
        const {deleteRelease, id} = this.props
        const result = await deleteRelease(id)
        if (!result) {
            notify({
                title: 'Deleting release failed',
                message: 'Cannot delete releases with cards',
                level: 'error',
            })
        }
        else {
            notify({
                title: 'Delete release',
                level: 'success',
                message: 'Done!',
            })
        }
    }

    render() {
        return <a href="#"
                  title={'Delete release'}
                  onClick={this.deleteRelease.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteReleaseButton)