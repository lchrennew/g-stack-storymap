import React from 'react'
import {Link} from "react-router-dom";
import {Card} from 'semantic-ui-react'
import Icon from "./Icon";
import {withRouter} from 'react-router-dom'


class ProjectItem extends React.Component {
    render() {
        const {title, id} = this.props
        return <Card>
            <Card.Content>
                <Card.Header className="card-title"><Link to={id.toString()}>
                    <Icon name="map" size={22}/> {title}</Link></Card.Header>
            </Card.Content>
            <Card.Content extra>
                <div className="ui two buttons">

                </div>
            </Card.Content>
        </Card>
    }
}

export default withRouter(ProjectItem)