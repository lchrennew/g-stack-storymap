import React from 'react'
import Placeholder from "./Placeholder";
import {Button, Dimmer, Form, Loader, Menu, Segment} from "semantic-ui-react";
import {connect} from 'react-redux'
import {updateCard} from "../actions";
import {notify} from "./Contexts";

const mapStateToProps = (state, props) => {
    return {
        card: state.card.card
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
        this.titleRef = React.createRef()
        this.descriptionRef = React.createRef()
    }

    async save(e) {
        e.preventDefault()
        const {save, id} = this.props
        const title = this.titleRef.current.value,
            description  = this.descriptionRef.current.value
        await save(id, {title, description})
        notify({
            title: 'Update card',
            level: 'success',
            message: 'Done!',
        })
    }

    render() {
        const {id, card} = this.props
        return <Placeholder>
            <Menu fixed='top' borderless className="title">
                <Menu.Item>
                    Card: #{id}
                </Menu.Item>
            </Menu>
            <div className="content container">
                {
                    card
                        ? <Form onSubmit={this.save.bind(this)}>
                            <Form.Field>
                                <label>Title</label>
                                <input placeholder='Enter a title'
                                       defaultValue={card.title}
                                       name="title"
                                       required
                                       autoComplete="off"
                                       ref={this.titleRef}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Description</label>
                                <textarea placeholder='Enter description'
                                          defaultValue={card.description}
                                          name="description"
                                          ref={this.descriptionRef}
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

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsSidebar)