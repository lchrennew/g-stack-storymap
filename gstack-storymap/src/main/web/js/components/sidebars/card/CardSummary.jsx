import React from 'react'
import Placeholder from "../../common/Placeholder";
import * as Showdown from "showdown";
import {Divider, Label, List} from "semantic-ui-react";
import {connect} from 'react-redux'
import Code from "../../common/Code";

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
            <Label as='a' color={card.color || undefined} ribbon>
                Card: #{card.id}
            </Label>
            <h1>{card.title || <span className='text-muted'>{`<Empty>`}</span>}</h1>
            {
                card.necessity &&
// TODO: any conditions here
                <List horizontal>
                    {card.necessity && <List.Item><Label size='mini'>{card.necessity}</Label></List.Item>}
                </List>
            }
            <Divider/>

            <div className="mde-preview">
                <Code content={card.description}
                      mode='rendered'
                      className='mde-preview-content' />
            </div>
        </Placeholder>
    }
}

export default connect(mapStateToProps)(CardSummary)