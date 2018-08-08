import React from 'react'
import $ from 'jquery'
import AddDetailButton from "./AddDetailButton";
import Icon from "./Icon";


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
                <div className="action bottom">
                    <AddDetailButton id={id}/>
                </div>
                <div className="action right">
                    <a href="#">
                        <Icon name="arrow-right-circle"/>
                    </a>
                </div>
            </div>
            {nested}
        </div>
    }
}

export default Card