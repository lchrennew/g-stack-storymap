import React from 'react'
import Placeholder from "./Placeholder";
import {Button, Form, Menu} from "semantic-ui-react";
import {connect} from 'react-redux'
import {createRelease} from "../actions";
import {notify, openSidebar, SidebarMaximizeButton} from "./Contexts";
import ReleaseDetailsSidebar from "./ReleaseDetailsSidebar";
import MarkDownEditor from "./MarkDownEditor";


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
        this.titleRef = React.createRef()
        this.objectiveRef = React.createRef()
        this.beginRef = React.createRef()
        this.endRef = React.createRef()
    }

    async save(e) {
        e.preventDefault()
        const {save} = this.props
        const title = this.titleRef.current.value,
            begin = this.beginRef.current.value,
            end = this.endRef.current.value,
            objective = this.objectiveRef.current.getValue()

        const release = await save({title, begin, end, objective})
        openSidebar(`release/${release.id}`)
        notify({
            title: 'Add release',
            level: 'success',
            message: 'Done!',
        })
    }

    render() {
        return <Placeholder>
            <Menu fixed='top' borderless className="title">
                <Menu.Item>
                    Creating new release
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item><SidebarMaximizeButton/></Menu.Item>
                </Menu.Menu>
            </Menu>
            <div className="content container">
                <Form onSubmit={this.save.bind(this)}>
                    <Form.Field>
                        <label>Title</label>
                        <input placeholder='Enter a title'
                               name="title"
                               required
                               autoComplete="off"
                               ref={this.titleRef}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Beginning</label>
                        <input placeholder='select when this release begins'
                               name='begin'
                               type='date'
                               ref={this.beginRef}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Ending</label>
                        <input placeholder='select when this release ends'
                               name='end'
                               type='date'
                               ref={this.endRef}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Objective</label>
                        <MarkDownEditor
                            ref={this.objectiveRef}/>
                    </Form.Field>
                    <Button type='submit'>Save</Button>
                </Form>
            </div>
        </Placeholder>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReleaseSidebar)