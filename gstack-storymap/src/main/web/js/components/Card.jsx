import React from 'react'
import $ from 'jquery'


class Card extends React.Component {
    bindCard(el) {
        const {card} = this.props
        $(el).data('card', card)
    }

    render() {
        const {card: {id, title}, nested} = this.props
        return <div className="item" ref={this.bindCard.bind(this)}>
            <div className="card">
                {title}#{id}
            </div>
            {nested}
        </div>
    }
}

export default Card