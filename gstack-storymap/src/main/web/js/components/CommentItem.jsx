import React from 'react'
import {Comment} from "semantic-ui-react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

class CommentItem extends React.Component {
    render() {
        const {comment} = this.props
        return <Comment key={comment.id}>
            <Comment.Avatar src={comment.author.avatar}/>
            <Comment.Content>
                <Comment.Author as='a'>{comment.author.name}</Comment.Author>
                <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
                {/*<CommentForm reply id={comment.id}/>*/}
            </Comment.Content>
            {
                comment.comments
                && comment.comments.length
                && <Comment.Group><CommentList comments={comment.comments}/></Comment.Group>
            }
        </Comment>
    }
}

export default CommentItem