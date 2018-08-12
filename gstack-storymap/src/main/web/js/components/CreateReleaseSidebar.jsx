import React from 'react'
import Placeholder from "./Placeholder";
import {Button, Dimmer, Form, Loader, Menu} from "semantic-ui-react";
import {connect} from 'react-redux'
import {createRelease} from "../actions";
import {openSidebar} from "./Contexts";
import ReleaseDetailsSidebar from "./ReleaseDetailsSidebar";

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        save: (release) => dispatch(createRelease(release))
    }
}


class CreateReleaseSidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    async save(e) {
        e.preventDefault()
        const {save} = this.props
        const {title = ''} = this.state
        const release = await save({title})
        openSidebar(<ReleaseDetailsSidebar id={release.id}/>)
    }

    bindChange() {
        return (e) => this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return <Placeholder>
            <Menu fixed='top' borderless className="title">
                <Menu.Item>
                    Creating new release
                </Menu.Item>
            </Menu>
            <div className="content container">
                <Form onSubmit={this.save.bind(this)}>
                    <Form.Field>
                        <label>Title</label>
                        <input placeholder='Enter a title'
                               name="title"
                               required
                               autoComplete="off"
                               onChange={this.bindChange()}
                        />
                    </Form.Field>
                    <Button type='submit'>Save</Button>
                </Form>
            </div>
        </Placeholder>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReleaseSidebar)