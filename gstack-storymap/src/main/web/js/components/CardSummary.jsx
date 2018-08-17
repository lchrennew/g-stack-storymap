import React from 'react'
import Placeholder from "./Placeholder";
import * as Showdown from "showdown";
import {Divider} from "semantic-ui-react";
import {connect} from 'react-redux'

const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id),
        card: state.card.card,
    }
}

class CardSummary extends React.Component {
    converter: Showdown.Converter

    constructor(props) {
        super(props)
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
        })
    }

    render() {
        const {card} = this.props
        return <Placeholder>
            <h1>{card.title || <span className='text-muted'>{`<Empty>`}</span>}</h1>
            <Divider/>
            <div className='markdown'
                 dangerouslySetInnerHTML={{__html: this.converter.makeHtml(card.description)}}>
            </div>
        </Placeholder>
    }
}

export default connect(mapStateToProps)(CardSummary)