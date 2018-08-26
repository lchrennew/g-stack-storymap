import React from 'react'
import {Card, Header} from 'semantic-ui-react'
import Icon from '../common/Icon'

class CreateProjectButton extends React.Component {
    render() {
        let {onClick} = this.props
        return <Card.Content
            textAlign='center'
            as="a"
            onClick={onClick}>
            <div>
                <Icon name="plus-circle" size={32}/>
                <Card.Meta>Create new test project</Card.Meta>
            </div>
        </Card.Content>
    }
}

export default CreateProjectButton