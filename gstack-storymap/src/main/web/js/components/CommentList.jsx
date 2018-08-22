import React from 'react'
import Placeholder from "./Placeholder";
import CommentItem from "./CommentItem";

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