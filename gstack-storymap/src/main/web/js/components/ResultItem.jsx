import React from 'react'
import {Card} from "semantic-ui-react";
import Icon from "./Icon";
import {openShell, printShell} from "./Contexts";


class ResultItem extends React.Component {

    showShell(e) {
        e.preventDefault()
        let {output, shell} = this.props
        printShell(shell)
        printShell(output)
    }

    render() {
        let {shell, succeeded, report} = this.props
        return <Card fluid color={succeeded ? 'green' : 'red'} className="record-item">
            <Card.Content>
                <div className="right floated hover show">
                    <a href={`//localhost:8084/${report}/index.html`} className="link" target="_blank"><Icon name="pie-chart"/></a>
                    <a href="#" className="link" onClick={this.showShell.bind(this)}><Icon name="camera"/></a>
                </div>
                <Card.Meta className="text-overflow-hidden"><Icon name="terminal"/> {shell}</Card.Meta>
            </Card.Content>
        </Card>
    }
}

export default ResultItem