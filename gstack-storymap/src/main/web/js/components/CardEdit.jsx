import React from 'react'
import MarkDownEditor from "./MarkDownEditor";
import {Button, Dropdown, Form, Select} from "semantic-ui-react";
import {updateCard} from "../actions";
import {connect} from "react-redux";
import {notify} from "./Contexts";

const necessityOptions = [
    {key: 'MUST', value: 'MUST', text: 'Must'},
    {key: 'SHOULD', value: 'SHOULD', text: 'Should'},
    {key: 'COULD', value: 'COULD', text: 'Could'},
    {key: 'WOULD_NOT', value: 'WOULD_NOT', text: `Wouldn't`},
]

class CardNecessity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: props.value}
    }

    onChange(e, {value}) {
        this.setState({value})
    }

    getValue() {
        return this.state.value
    }

    render() {
        return <Select
            options={necessityOptions}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            placeholder='Select Necessity'/>
    }
}

const colorOptions = [
    {key: 'nocolor', value: '', text: 'No Color', label: {empty: true, circular: true}},
    {key: 'red', value: 'red', text: 'Red', label: {color: 'red', empty: true, circular: true}},
    {key: 'orange', value: 'orange', text: 'Orange', label: {color: 'orange', empty: true, circular: true}},
    {key: 'yellow', value: 'yellow', text: 'Yellow', label: {color: 'yellow', empty: true, circular: true}},
    {key: 'olive', value: 'olive', text: 'Olive', label: {color: 'olive', empty: true, circular: true}},
    {key: 'green', value: 'green', text: 'Green', label: {color: 'green', empty: true, circular: true}},
    {key: 'teal', value: 'teal', text: 'Teal', label: {color: 'teal', empty: true, circular: true}},
    {key: 'blue', value: 'blue', text: 'Blue', label: {color: 'blue', empty: true, circular: true}},
    {key: 'violet', value: 'violet', text: 'Violet', label: {color: 'violet', empty: true, circular: true}},
    {key: 'purple', value: 'purple', text: 'Purple', label: {color: 'purple', empty: true, circular: true}},
    {key: 'pink', value: 'pink', text: 'Pink', label: {color: 'pink', empty: true, circular: true}},
    {key: 'brown', value: 'brown', text: 'Brown', label: {color: 'brown', empty: true, circular: true}},
    {key: 'grey', value: 'grey', text: 'Grey', label: {color: 'grey', empty: true, circular: true}},
    {key: 'black', value: 'black', text: 'Black', label: {color: 'black', empty: true, circular: true}},
]

class CardColor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: props.value}
    }

    onChange(e, {value}) {
        this.setState({value})
    }

    getValue() {
        return this.state.value
    }

    render() {
        return <Dropdown
            selection labeled button className='icon'
            icon={{
                name: this.state.value
                    ? 'circle'
                    : 'circle outline',
                color: this.state.value
            }}
            options={colorOptions}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
            placeholder='Select Color'
        />
    }
}

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
        this.necessityRef = React.createRef()
        this.colorRef = React.createRef()
        this.descriptionRef = React.createRef()
    }

    async save(e) {
        e.preventDefault()
        const {save, id, project, history} = this.props
        const title = this.titleRef.current.value,
            description = this.descriptionRef.current.getValue(),
            necessity = this.necessityRef.current.getValue(),
            color = this.colorRef.current.getValue()
        await save(id, {title, description, necessity, color})
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
                <label>Necessity</label>
                <CardNecessity
                    ref={this.necessityRef}
                    value={card.necessity}
                />
            </Form.Field>
            <Form.Field>
                <label>Flag Color</label>
                <CardColor
                    ref={this.colorRef}
                    value={card.color}
                />
            </Form.Field>
            <Form.Field>
                <label>color</label>
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