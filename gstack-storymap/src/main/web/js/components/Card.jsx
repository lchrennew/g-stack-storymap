import React from 'react'
import $ from 'jquery'
import AddDetailButton from "./AddDetailButton";
import Icon from "./Icon";
import AddNextButton from "./AddNextButton";
import CardTitleEditing from "./CardTitleEditing";
import CardTitle from "./CardTitle";


class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {editing: false}
    }

    bindCard(el) {
        const {card} = this.props
        $(el).data('card', card)
    }

    startEdit(e) {
        e.preventDefault()
        this.setState({editing: true})
    }

    stopEdit(e) {
        this.setState({editing: false})
    }

    render() {
        const {card: {id, title}, nested, horizontal = false} = this.props
        const {editing} = this.state
        return <div className="item" ref={this.bindCard.bind(this)}>
            <div className="card">
                {
                    editing
                        ? <CardTitleEditing value={title} onBlur={this.stopEdit.bind(this)}/>
                        : <CardTitle value={title} onDoubleClick={this.startEdit.bind(this)}/>
                }
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