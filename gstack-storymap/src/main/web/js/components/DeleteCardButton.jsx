import React from 'react'
import {delCard} from "../actions";
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCard: id => dispatch(delCard(id))
    }
}

class DeleteCardButton extends React.Component {

    deleteCard(e) {
        const {deleteCard, id} = this.props
        deleteCard(id)
    }

    render() {
        const {to} = this.props
        return <Link to={to}
                  title={'Delete card'}
                  onClick={this.deleteCard.bind(this)}>
            {this.props.children}
        </Link>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCardButton)