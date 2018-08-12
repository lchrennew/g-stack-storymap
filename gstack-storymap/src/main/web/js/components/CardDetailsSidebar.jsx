import React from 'react'
import Placeholder from "./Placeholder";
import {Button, Dimmer, Form, Loader, Menu, Segment} from "semantic-ui-react";
import {connect} from 'react-redux'
import {updateCard} from "../actions";

const mapStateToProps = (state, props) => {
    return {
        card: state.card.card || {},
        loading: state.card.fetch
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: (id, card) => dispatch(updateCard(id, card))
    }
}

class CardDetailsSidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    save(e) {
        e.preventDefault()
        const {save, id, card} = this.props
        const {title = card.title, description = card.description} = this.state
        save(id, {title, description})
        this.setState({title: undefined, description: undefined})
    }

    bindChange() {
        return (e) => this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {id, card, loading} = this.props
        return <Placeholder>
            <Menu fixed='top' borderless className="title">
                <Menu.Item>
                    Card: #{id}
                </Menu.Item>
            </Menu>
            <div className="content container">
                {
                    !loading
                        ? <Form onSubmit={this.save.bind(this)}>
                            <Form.Field>
                                <label>Title</label>
                                <input placeholder='Enter a title'
                                       defaultValue={card.title}
                                       name="title"
                                       required
                                       autoComplete="off"
                                       onChange={this.bindChange()}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <textarea placeholder='Enter description'
                                          defaultValue={card.description || ''}
                                          name="description"
                                          onChange={this.bindChange()}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsSidebar)