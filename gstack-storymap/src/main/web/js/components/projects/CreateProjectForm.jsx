import React from 'react'
import {Button, Card, Form} from "semantic-ui-react";
import Placeholder from "../common/Placeholder";
import {connect} from 'react-redux'
import {createProject} from "../../actions";

const mapStateToProps = (state, props) => {
    return {}
}
const mapDispatchToProps = dispatch => {
    return {
        create: ({title}) => dispatch(createProject({title}))
    }
}

class CreateProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: ''}
    }

    onChange(e, {name, value}) {
        this.setState({[name]: value})
    }

    onSubmit() {
        let {create,onCancel} = this.props
        let {title} = this.state
        this.setState({title:''})
        onCancel()
        create({title, description: ''})
    }

    // todo: submit form, update state and upload data
    render() {
        let {onCancel} = this.props
        let {title} = this.state
        return <Placeholder>
            <Card.Content>
                <Form size="mini" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Input label="Project Name" placeholder="Project Name" name="title" value={title}
                                size="mini" onChange={this.onChange.bind(this)}/>
                    <Form.Button color="blue" size="mini" floated="right">
                        Create
                    </Form.Button>
                    <Button size="mini" floated="left" onClick={onCancel}>
                        Cancel
                    </Button>
                </Form>
            </Card.Content>
        </Placeholder>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectForm)