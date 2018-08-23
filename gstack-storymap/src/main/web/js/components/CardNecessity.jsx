import React from 'react'
import {Select} from "semantic-ui-react";

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

export default CardNecessity