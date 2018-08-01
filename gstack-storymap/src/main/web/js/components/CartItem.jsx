import React from 'react'
import {Link} from "react-router-dom";
import {Item, Label} from "semantic-ui-react";
import Icon from "./Icon";
import RemoveFromCart from "./RemoveFromCart";


class CartItem extends React.Component {
    render() {
        const {item: {type, title, href, key, labels = [], option: {suite}}} = this.props
        const icons = {
            suite: 'box',
            folder: 'folder',
            file: 'file',
            scenario: 'activity'
        }
        return <Item>
            <Item.Content>
                <Item.Meta>
                    <div className="right floated hover show">
                        <RemoveFromCart className="link" item={{key}} suite={suite}>
                            <Icon name="trash"/>
                        </RemoveFromCart>
                    </div>
                    <Link to={href}>
                        <Icon name={icons[type]}/> {title}
                    </Link>
                </Item.Meta>
                <Item.Extra>
                    {
                        labels.map((label, i) => {
                            return <Label as={Link} to={label.href} key={i}>
                                <Icon name={icons[label.type]}
                                      size={13}/> {label.title}</Label>
                        })
                    }
                </Item.Extra>
            </Item.Content>
        </Item>
    }

}

export default CartItem