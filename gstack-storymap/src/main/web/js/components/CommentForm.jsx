import React from 'react'
import {Button} from "semantic-ui-react";
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
        this.domRef = React.createRef()
        this.state = {}
    }

    async onSubmit(e) {
        e.preventDefault()
        await this.submit()
    }

    async submit() {
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

    cancel() {
        this.setState({active: false})
        const {onCancel} = this.props
        onCancel && onCancel()
    }

    async shortcut(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === "\n" || e.key === 'Enter' || e.key === 's')) {
            e.preventDefault()
            await this.submit()
        }
        else if (e.key === 'Escape') {
            e.preventDefault()
            this.cancel()
        }
    }

    componentDidMount() {
        const {reply} = this.props
        if (reply)
            this.contentRef.current.focus()
    }

    active(e) {
        this.setState({active: true})
    }

    deactive(e) {
        const {reply} = this.props
        if (!this.contentRef.current.value) {
            if (!reply)
                this.setState({active: false})
            else
                this.cancel()
        }
    }

    render() {
        const {reply} = this.props
        const {active} = this.state
        return <form className={`ui reply form${active ? ' active' : ''}`}
                     onSubmit={this.onSubmit.bind(this)}
                     ref={this.domRef}
        >
            <div className="field">
                <textarea rows="3" ref={this.contentRef}
                          onKeyDown={this.shortcut.bind(this)}
                          onFocus={this.active.bind(this)}
                          onBlur={this.deactive.bind(this)}
                          placeholder={reply
                              ? 'Enter reply here (Ctrl+Enter to submit)'
                              : 'Enter comment here (Ctrl+Enter to submit)'}/>
            </div>
            <Button content={reply ? 'Add Reply' : 'Add Comment'}
                    primary/>
        </form>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)