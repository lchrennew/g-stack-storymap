import React from 'react'
import {Link} from "react-router-dom";
import {Card} from 'semantic-ui-react'
import ExecuteButton from "./ExecuteButton";
import Icon from "./Icon";
import {withRouter} from 'react-router-dom'
import LogsEntry from "./LogsEntry";


class SuiteItem extends React.Component {
    render() {
        const {title} = this.props
        return <Card>
            <Card.Content>
                <Card.Header className="card-title"><Link to={title}>
                    <Icon name="box" size={22}/> {title}</Link></Card.Header>
            </Card.Content>
            <Card.Content extra>
                <div className="ui two buttons">
                    <LogsEntry className="ui basic large button" suite={title}>
                        <Icon name="clock" size={24}/>
                    </LogsEntry>
                    <ExecuteButton suite={title} size={24} className="ui basic large button"
                                   title={`Suite:${title}`}/>
                </div>
            </Card.Content>
        </Card>
    }
}

export default withRouter(SuiteItem)