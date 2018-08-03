import React from 'react'

class Card extends React.Component {
    render() {
        const {card: {id, title}, nested} = this.props
        return <div className="item">
            <div className="card">
                {title}
            </div>
            {nested}
        </div>
    }
}

export default Card