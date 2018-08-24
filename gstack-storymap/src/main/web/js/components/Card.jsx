import React from 'react'
import $ from 'jquery'
import AddDetailButton from "./AddDetailButton";
import AddNextButton from "./AddNextButton";
import CardTitleEditing from "./CardTitleEditing";
import CardTitle from "./CardTitle";
import CardDetailsEntry from "./CardDetailsEntry";
import {Label} from "semantic-ui-react";


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
        const {card: {id, title, necessity, color}, nested, horizontal = false} = this.props
        const {editing} = this.state
        return <div className={`item${editing || title == null?' edit':''}`} ref={this.bindCard.bind(this)}>
            <div className="card"
                 onDoubleClick={this.startEdit.bind(this)}
                 onContextMenu={this.onRightClick.bind(this)}>
                {
                    (editing || title == null)
                        ? <CardTitleEditing value={title} onBlur={this.stopEdit.bind(this)} id={id}/>
                        : <CardTitle value={title}/>
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
                {
                    (necessity || color) &&
                    <Label circular color={color || undefined} size='mini' className='g-card-label'>
                        {
                            necessity && necessity[0]
                        }
                    </Label>
                }
            </div>
            {nested}
            <CardDetailsEntry id={id} bindHandler={this.bindDetails.bind(this)}/>
        </div>
    }
}

export default Card