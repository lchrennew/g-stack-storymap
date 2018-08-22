import React from 'react'
import {Comment, Dimmer, Loader} from "semantic-ui-react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import {fetchComments} from "../actions";

const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id),
        list: state.comments.list,
        target: state.comments.target,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: id => dispatch(fetchComments(id))
    }
}

class CardComments extends React.Component {

    componentDidMount() {
        const {id, load} = this.props
        load(id)
    }

    render() {
        const {list, id} = this.props

        return list
            ? <Comment.Group>
                <CommentList comments={list}/>
                <CommentForm id={id}/>
            </Comment.Group>
            : <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardComments))