import React from 'react'
import $ from 'jquery'
import AddDetailButton from "./AddDetailButton";
import Icon from "./Icon";
import AddNextButton from "./AddNextButton";
import CardTitleEditing from "./CardTitleEditing";
import CardTitle from "./CardTitle";
import DeleteCardButton from "./DeleteCardButton";
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
        return <div className={`item${editing || title == null?' edit':''}`} ref={this.bindCard.bind(this)}>
            <div className="card"
                 onDoubleClick={this.startEdit.bind(this)}
                 onContextMenu={this.onRightClick.bind(this)}>
                {
                    (editing || title == null)
                        ? <CardTitleEditing value={title} onBlur={this.stopEdit.bind(this)} id={id}/>
                        : <CardTitle value={title}/>
                }
                <CardDetailsEntry id={id} bindHandler={this.bindDetails.bind(this)}/>
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