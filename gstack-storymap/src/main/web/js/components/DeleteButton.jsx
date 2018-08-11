import React from 'react'
import {delCard} from "../actions";
import {connect} from 'react-redux'

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCard: id => dispatch(delCard(id))
    }
}

class DeleteButton extends React.Component {

    deleteCard(e) {
        e.preventDefault()
        const {deleteCard, id} = this.props

        deleteCard(id)
    }

    render() {
        return <a href="#"
                  title={'Delete card'}
                  onClick={this.deleteCard.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)