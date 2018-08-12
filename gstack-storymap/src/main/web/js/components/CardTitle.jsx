import React from 'react'
import Placeholder from "./Placeholder";

class CardTitle extends React.Component {
    render() {
        const {value} = this.props
        return <div className="g-card-title">
            {
                value
                    ? value.split('\n').map(
                    (line, k) =>
                        <Placeholder key={k}>
                            {line}<br/>
                        </Placeholder>
                )
                    : <span className="text-muted">{'<Empty>'}</span>
            }
        </div>
    }
}

export default CardTitle