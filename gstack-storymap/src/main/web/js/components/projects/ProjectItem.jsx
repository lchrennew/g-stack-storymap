import React from 'react'
import {Link} from "react-router-dom";
import {Card} from 'semantic-ui-react'
import Icon from "../common/Icon";
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
                    <Link to={id.toString()} className="ui basic large button">
                        <Icon name="log-in" size={24}/> Come in
                    </Link>
                </div>
            </Card.Content>
        </Card>
    }
}

export default withRouter(ProjectItem)