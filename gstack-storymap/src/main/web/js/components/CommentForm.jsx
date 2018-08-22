import React from 'react'
import {Button, Form} from "semantic-ui-react";
import {connect} from 'react-redux'
import {addComment} from "../actions";

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (id, comment) => dispatch(addComment(id, comment))
    }
}

class CommentForm extends React.Component {

    constructor(props) {
        super(props)
        this.contentRef = React.createRef()
    }

    async onSubmit(e) {
        e.preventDefault()
        const {id, addComment} = this.props
        const content = this.contentRef.current.value
        if (content) {
            this.contentRef.current.value = ''
            await addComment(id, {content})
        }
    }

    render() {
        return <Form reply onSubmit={this.onSubmit.bind(this)}>
            <div className="field">
                <textarea rows="3" ref={this.contentRef}/>
            </div>
            <Button content='Add Reply' labelPosition='left' icon='edit' primary/>
        </Form>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)