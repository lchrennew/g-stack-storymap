import React from 'react'
import {Button, Form} from "semantic-ui-react";
import {addCriterion, updateCriterion} from '../actions'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

const mapStateToProps = (state, props) => {
    const criterionId = parseInt(props.match.params.criterion)
    return {
        id: parseInt(props.match.params.id),
        mode: criterionId ? 'Update' : 'Create',
        criterion: criterionId ? state.criteria.list.find(criterion => criterion.id === criterionId) : {}
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add: (id, criterion) => dispatch(addCriterion(id, criterion)),
        update: (id, criterion) => dispatch(updateCriterion(id, criterion))
    }
}

class CriterionForm extends React.Component {
    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.descriptionRef = React.createRef()
    }

    getBackLink() {
        const {id, match: {params: {project, maximized}}} = this.props
        return `/${project}/${maximized}/card/${id}/criteria`
    }

    async onSubmit(e) {
        e.preventDefault()
        const title = this.titleRef.current.value,
            description = this.descriptionRef.current.value
        const {id, add, update, history, mode, criterion} = this.props
        switch (mode) {
            case 'Update':
                await update(criterion.id, {title, description})
                break
            case 'Create':
                await add(id, {title, description})
                break
        }
        history.push(this.getBackLink())
    }

    render() {
        const {criterion, mode} = this.props

        return <Form onSubmit={this.onSubmit.bind(this)}>
            <Form.Field>
                <label>Scenario</label>
                <input
                    required
                    placeholder='Enter scenario name'
                    defaultValue={criterion.title}
                    ref={this.titleRef}
                />
            </Form.Field>
            <Form.Field>
                <label>Description</label>
                <textarea
                    placeholder={`Enter description`}
                    ref={this.descriptionRef}
                    defaultValue={criterion.description}
                    required/>
            </Form.Field>
            <Button type='submit' primary>{mode}</Button>
            <Link to={this.getBackLink()} className='ui button basic'>Cancel</Link>
        </Form>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriterionForm)