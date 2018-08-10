import React from 'react'
import Icon from "./Icon";

class CardTitle extends React.Component {
    render() {
        const {value, onDoubleClick} = this.props
        return <div className="card-title" onDoubleClick={onDoubleClick}>
            <a href="" onClick={onDoubleClick}><Icon name="edit" size={16}/></a>
            {value}
        </div>
    }
}

export default CardTitle