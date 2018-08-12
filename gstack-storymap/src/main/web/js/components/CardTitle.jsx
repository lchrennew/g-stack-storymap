import React from 'react'
import Placeholder from "./Placeholder";
import {Popup} from "semantic-ui-react";

class CardTitle extends React.Component {
    render() {
        const {value} = this.props
        let lines = value ? value.split('\n') : []
        return <div className="g-card-title">
            {
                value
                    ? lines.map(
                    (line, k) =>
                        k < 3
                            ? <Placeholder key={k}>
                            {line}<br/>
                            </Placeholder>
                            : k === 3 ? <Popup trigger={<a href="#">...</a>} content={value}/> : null
                )
                    : <span className="text-muted">{'<Empty>'}</span>
            }
        </div>
    }
}

export default CardTitle