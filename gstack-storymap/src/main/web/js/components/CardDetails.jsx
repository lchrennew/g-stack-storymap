import React from 'react'
import Placeholder from "./Placeholder";
import {Dropdown, Form, Menu, Segment} from "semantic-ui-react";
import Icon from "./Icon";

class CardDetails extends React.Component {
    render() {
        const {id} = this.props
        return <Placeholder>
            <Menu fixed='top' borderless className="title">
                <Menu.Item>
                    Card: #{id}
                </Menu.Item>
            </Menu>
            <div className="content container">
                <Form>
                    <Form.Field>
                        <label>Title</label>
                        <input placeholder='Enter a title'/>
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <textarea placeholder='Enter description'/>
                    </Form.Field>
                </Form>
                <div style={{height: '3000px'}}>

                </div>
            </div>
        </Placeholder>
    }
}

export default CardDetails