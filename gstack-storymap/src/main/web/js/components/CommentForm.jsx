import React from 'react'
import {Button, Form} from "semantic-ui-react";
import {connect} from 'react-redux'
import {addComment, addReply} from "../actions";

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (id, comment) => dispatch(addComment(id, comment)),
        addReply: (id, comment) => dispatch(addReply(id, comment)),
    }
}

class CommentForm extends React.Component {

    constructor(props) {
        super(props)
        this.contentRef = React.createRef()
    }

    async onSubmit(e) {
        e.preventDefault()
        const {id, addComment, addReply, reply} = this.props
        const content = this.contentRef.current.value
        if (content) {
            this.contentRef.current.value = ''
            this.contentRef.current.focus()
            if (reply) {
                await addReply(id, {content})
            } else {
                await addComment(id, {content})
            }
        }
    }

    componentDidMount() {
        this.contentRef.current.focus()
    }

    render() {
        const {reply} = this.props
        return <Form reply onSubmit={this.onSubmit.bind(this)}>
            <div className="field">
                <textarea rows="3" ref={this.contentRef}
                          placeholder={reply ? 'Enter reply here' : 'Enter comment here'}/>
            </div>
            <Button content={reply ? 'Add Reply' : 'Add Comment'} labelPosition='left' icon='edit' primary/>
        </Form>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)