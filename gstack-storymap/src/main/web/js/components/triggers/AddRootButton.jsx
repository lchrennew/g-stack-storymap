import React from 'react'
import {setRoot} from "../../actions";
import {connect} from 'react-redux'
import {notify} from "../common/NotificationManager";


const mapStateToProps = (state, props) => {
    return {
        id: state.cards.project,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setRoot: (id, root) => dispatch(setRoot(id, root))
    }
}

class AddRootButton extends React.Component {

    async addRoot(e) {
        e.preventDefault()
        // id : project id
        const {id, setRoot} = this.props
        await setRoot(id, {title: null})
        notify({
            title: 'Add card',
            level: 'success',
            message: 'Done!',
        })
    }

    render() {
        const {className} = this.props
        return <a
            href="#"
            title="Add your first card"
            className={className}
            onClick={this.addRoot.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRootButton)