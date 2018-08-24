import React from 'react'
import {Button, Form} from "semantic-ui-react";
import {addCriterion} from '../actions'
import {connect} from 'react-redux'

const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (id, criterion) => dispatch(addCriterion(id, criterion))
    }
}

class CriterionForm extends React.Component {
    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.descriptionRef = React.createRef()
    }

    async onSubmit(e) {
        e.preventDefault()
        const title = this.titleRef.current.value,
            description = this.descriptionRef.current.value
        const {id, match: {params: {project, maximized}}, add, history} = this.props
        await add(id, {title, description})
        history.push(`/${project}/${maximized}/card/${id}/criteria`)
    }

    render() {
        return <Form onSubmit={this.onSubmit.bind(this)}>
            <Form.Field>
                <label>Scenario</label>
                <input
                    placeholder='Enter scenario name'
                    ref={this.titleRef}
                />
            </Form.Field>
            <Form.Field>
                <label>Description</label>
                <textarea placeholder={`Enter description`} ref={this.descriptionRef}/>
            </Form.Field>
            <Button type='submit' primary>Create</Button>
        </Form>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriterionForm)