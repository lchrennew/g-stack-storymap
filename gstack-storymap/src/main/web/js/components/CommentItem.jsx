import React from 'react'
import {Comment} from "semantic-ui-react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import {Link, Route, withRouter} from "react-router-dom";

class CommentItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {reply: false}
    }

    showReplyForm(e) {
        e.preventDefault()
        this.setState({reply: true})
    }
    render() {
        const {comment, match: {params: {reply}}, location: {pathname}} = this.props
        let paths = pathname.split('/'),
            tokenIndex = paths.lastIndexOf('comments')

        paths.length = tokenIndex + 1

        const replyVisible = parseInt(reply) === comment.id,
            replyPath = (replyVisible ? paths : [...paths, 'reply', comment.id]).join('/')

        return <Comment key={comment.id}>
            <Comment.Avatar src={comment.author.avatar}/>
            <Comment.Content>
                <Comment.Author as='a'>{comment.author.name}</Comment.Author>
                <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
                <Comment.Actions>
                    <Link to={replyPath}>{replyVisible ? 'Cancel' : 'Reply'}</Link>
                </Comment.Actions>
                {
                    replyVisible && <CommentForm reply id={comment.id}/>
                }

            </Comment.Content>
            {
                comment.comments
                && comment.comments.length
                && <Comment.Group>
                    <CommentList comments={comment.comments}/>
                </Comment.Group>
            }
        </Comment>
    }
}

export default withRouter(CommentItem)