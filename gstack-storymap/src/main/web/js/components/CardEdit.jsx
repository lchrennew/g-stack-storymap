import React from 'react'
import MarkDownEditor from "./MarkDownEditor";
import {Button, Form} from "semantic-ui-react";
import {updateCard} from "../actions";
import {connect} from "react-redux";
import {notify} from "./Contexts";

const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id),
        project: parseInt(props.match.params.project),
        card: state.card.card,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (id, card) => dispatch(updateCard(id, card))
    }
}


class CardEdit extends React.Component {

    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.descriptionRef = React.createRef()
    }

    async save(e) {
        e.preventDefault()
        const {save, id, project, history} = this.props
        const title = this.titleRef.current.value,
            description = this.descriptionRef.current.getValue()
        await save(id, {title, description})
        history.push(`/${project}/!/card/${id}`)
        notify({
            title: 'Update card',
            level: 'success',
            message: 'Done!',
        })
    }

    render() {
        const {card, match: {params: {maximized}}} = this.props
        return <Form onSubmit={this.save.bind(this)}>
            <Form.Field>
                <label>Title</label>
                <input placeholder='Enter a title'
                       defaultValue={card.title}
                       name="title"
                       required
                       autoComplete="off"
                       ref={this.titleRef}
                />
            </Form.Field>
            <Form.Field>
                <label>Description</label>
                <MarkDownEditor
                    value={card.description}
                    layout={maximized === '!!' ? 'horizontal' : 'vertical'}
                    ref={this.descriptionRef}
                />
            </Form.Field>
            <Button type='submit'>Update</Button>
        </Form>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardEdit)