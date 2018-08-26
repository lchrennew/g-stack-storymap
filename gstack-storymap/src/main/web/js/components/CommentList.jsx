import React from 'react'
import Placeholder from "./Placeholder";
import {Comment} from "semantic-ui-react";
import CommentForm from "./CommentForm";
import {Link, withRouter} from "react-router-dom";

class _CommentItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {reply: false}
    }

    render() {
        const {comment, match: {params: {reply}}, location: {pathname}, history} = this.props
        let paths = pathname.split('/'),
            tokenIndex = paths.lastIndexOf('comments')

        paths.length = tokenIndex + 1

        const replyVisible = parseInt(reply) === comment.id,
            // replyPath = (replyVisible ? paths : [...paths, 'reply', comment.id]).join('/')
            replyPath = [...paths, 'reply', comment.id].join('/')

        return <Comment key={comment.id}>
            <Comment.Avatar src={comment.author.avatar}/>
            <Comment.Content>
                <Comment.Author as='a'>{comment.author.name}</Comment.Author>
                <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
                <Comment.Actions>
                    <Link to={replyPath}>Reply</Link>
                </Comment.Actions>
                {
                    replyVisible
                    && <CommentForm reply
                                    id={comment.id}
                                    pathname={replyPath}
                                    onCancel={() => {
                                        history.push(paths.join('/'))
                                    }}
                    />
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

const CommentItem = withRouter(_CommentItem)
class CommentList extends React.Component {
    render() {
        const {comments = []} = this.props
        return <Placeholder>
            {
                comments.map((comment, i) => <CommentItem comment={comment} key={i}/>)
            }
        </Placeholder>
    }
}

export default CommentList