import React from 'react'
import $ from 'jquery'
import AddDetailButton from "./AddDetailButton";
import Icon from "./Icon";
import AddNextButton from "./AddNextButton";


class Card extends React.Component {
    bindCard(el) {
        const {card} = this.props
        $(el).data('card', card)
    }

    render() {
        const {card: {id, title}, nested, horizontal = false} = this.props
        return <div className="item" ref={this.bindCard.bind(this)}>
            <div className="card">
                {title}#{id}
                <div className="action bottom">
                    {
                        horizontal
                            ? <AddDetailButton id={id}/>
                            : <AddNextButton id={id}/>
                    }
                </div>
                {
                    horizontal
                        ? <div className="action right">
                            <AddNextButton id={id} horizontal/>
                        </div>
                        : null
                }

            </div>
            {nested}
        </div>
    }
}

export default Card