import React from 'react'
import Placeholder from "./Placeholder";
import {Button, Dimmer, Form, Loader, Menu} from "semantic-ui-react";
import {connect} from 'react-redux'
import {updateRelease} from "../actions";

const mapStateToProps = (state, props) => {
    return {
        release: state.release.release || {},
        loading: state.release.fetch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (id, release) => dispatch(updateRelease(id, release))
    }
}


class ReleaseDetailsSidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    save(e) {
        e.preventDefault()
        const {save, id, release} = this.props
        const {title = release.title} = this.state
        save(id, {title})
        this.setState({title: undefined})
    }

    bindChange() {
        return (e) => this.setState({[e.target.name]: e.target.value})
    }
    render() {
        const {id, release, loading} = this.props
        return <Placeholder>
            <Menu fixed='top' borderless className="title">
                <Menu.Item>
                    Release: #{id}
                </Menu.Item>
            </Menu>
            <div className="content container">
                {
                    !loading
                        ? <Form onSubmit={this.save.bind(this)}>
                            <Form.Field>
                                <label>Title</label>
                                <input placeholder='Enter a title'
                                       defaultValue={release.title}
                                       name="title"
                                       required
                                       autoComplete="off"
                                       onChange={this.bindChange()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseDetailsSidebar)