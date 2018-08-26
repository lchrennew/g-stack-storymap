import React from 'react'
import CreateProjectForm from "./CreateProjectForm";
import {Card} from "semantic-ui-react";
import CreateProjectButton from "../triggers/CreateProjectButton";

class CreateProjectCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {creating: false}
    }

    toggle(e) {
        e && e.preventDefault()
        this.setState({creating: !this.state.creating})
    }

    create({name}) {
        alert(name)
        this.toggle()
    }

    render() {
        return <Card className={this.state.creating ? '' : 'create'}>
            {
                this.state.creating ?
                    <CreateProjectForm onCancel={this.toggle.bind(this)}/> :
                    <CreateProjectButton onClick={this.toggle.bind(this)}/>
            }

        </Card>
    }

}

export default CreateProjectCard