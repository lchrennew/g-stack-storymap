import React from 'react'
import Placeholder from "./Placeholder";
import {Button, Dimmer, Form, Loader, Menu} from "semantic-ui-react";
import {connect} from 'react-redux'
import {fetchRelease, updateRelease} from "../actions";
import {notify, SidebarMaximizeButton} from "./Contexts";
import MarkDownEditor from "./MarkDownEditor";
import {withRouter} from "react-router-dom";

const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id),
        release: state.release.release || {},
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: id => dispatch(fetchRelease(id)),
        save: (id, release) => dispatch(updateRelease(id, release))
    }
}


class ReleaseDetailsSidebar extends React.Component {
    constructor(props) {
        super(props)
        this.titleRef = React.createRef()
        this.objectiveRef = React.createRef()
        this.beginRef = React.createRef()
        this.endRef = React.createRef()
    }

    async save(e) {
        e.preventDefault()
        const {save, id} = this.props
        const title = this.titleRef.current.value,
            begin = this.beginRef.current.value,
            end = this.endRef.current.value,
            objective = this.objectiveRef.current.getValue()
        await save(id, {title, begin, end, objective})
        notify({
            title: 'Update release',
            level: 'success',
            message: 'Done!',
        })
    }

    componentDidMount() {
        const {id, load} = this.props
        load(id)
    }

    componentDidUpdate() {
        const {id, release, load} = this.props
        if (!release || release.id !== id) {
            load(id)
        }
    }

    render() {
        const {id, release} = this.props
        return <Placeholder>
            <Menu fixed='top' borderless className="title">
                <Menu.Item>
                    Release: #{id}
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item><SidebarMaximizeButton/></Menu.Item>
                </Menu.Menu>
            </Menu>
            <div className="content container">
                {
                    release
                        ? <Form onSubmit={this.save.bind(this)}>
                            <Form.Field>
                                <label>Title</label>
                                <input placeholder='Enter a title'
                                       defaultValue={release.title}
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
                                       defaultValue={release.begin}
                                       ref={this.beginRef}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Ending</label>
                                <input placeholder='select when this release ends'
                                       name='end'
                                       type='date'
                                       defaultValue={release.end}
                                       ref={this.endRef}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>description</label>
                                <MarkDownEditor
                                    value={release.objective}
                                    ref={this.objectiveRef}
                                />
                            </Form.Field>
                            <Button type='submit'>Update</Button>
                        </Form>
                        : <Dimmer active inverted>
                            <Loader size='huge'>Loading</Loader>
                        </Dimmer>
                }
            </div>
        </Placeholder>
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReleaseDetailsSidebar))