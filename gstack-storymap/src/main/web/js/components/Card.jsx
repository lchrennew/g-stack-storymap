import React from 'react'
import $ from 'jquery'
import AddDetailButton from "./AddDetailButton";
import Icon from "./Icon";
import AddNextButton from "./AddNextButton";
import CardTitleEditing from "./CardTitleEditing";
import CardTitle from "./CardTitle";
import DeleteButton from "./DeleteButton";
import CardDetailsEntry from "./CardDetailsEntry";


class Card extends React.Component {
    constructor(props) {
        super(props)
        const {editing = false} = this.props
        this.state = {editing}
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

    bindDetails(handler) {
        this.openDetails = handler
    }

    onRightClick(e) {
        e.preventDefault()
        e.stopPropagation()
        this.openDetails && this.openDetails()
    }

    render() {
        const {card: {id, title}, nested, horizontal = false} = this.props
        const {editing} = this.state
        return <div className="item" ref={this.bindCard.bind(this)}>
            <div className="card"
                 onDoubleClick={this.startEdit.bind(this)}
                 onContextMenu={this.onRightClick.bind(this)}>
                {
                    (editing || title == null)
                        ? <CardTitleEditing value={title} onBlur={this.stopEdit.bind(this)} id={id}/>
                        : <CardTitle value={title}/>
                }

                <div className="action left">
                    <a href="#" onClick={this.startEdit.bind(this)} title="Edit title">
                        <Icon name="edit-3" size={16}/>
                    </a>
                    <CardDetailsEntry id={id} bindHandler={this.bindDetails.bind(this)}>
                        <Icon name="maximize" size={16}/>
                    </CardDetailsEntry>
                    <DeleteButton id={id}><Icon name="trash" size={16} /></DeleteButton>
                </div>
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