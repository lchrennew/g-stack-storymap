import React from 'react'
import Icon from "./Icon";
import {List} from "semantic-ui-react";

class Tags extends React.Component {
    render() {
        let {tags} = this.props
        if (tags.length)
            return <List horizontal size="mini">
                <Icon name="tag" size={13}/>
                {
                    tags.map((tag, i) => <List.Item key={i}>
                        <List.Content> {tag} </List.Content>
                    </List.Item>)
                }
            </List>
        else return null
    }
}

export default Tags