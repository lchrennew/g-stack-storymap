import React from "react";
import Placeholder from "./Placeholder";
import VisibleCartItems from "./VisibleCartItems";
import {Divider, Dropdown, Menu, Item} from "semantic-ui-react";
import CartExecuteButton from "./CartExecuteButton";
import Icon from "./Icon";

class CartMenu extends React.Component {
    render() {
        return <Menu fixed='top'>
            <Menu.Item header><Icon name="shopping-cart" size={28}/></Menu.Item>
            <Menu.Menu position='right'>
                <Dropdown icon={<Icon name="more-vertical"/>} item>
                    <Dropdown.Menu>
                        <Dropdown.Header>Favorates</Dropdown.Header>
                        <Dropdown.Item>
                            <Icon name="star"/> Add to favorates
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    }
}


class CartSidebar extends React.Component {
    render() {
        const {suite} = this.props
        return <Placeholder>
            <CartMenu/>
            <Item.Group divided>
                <VisibleCartItems suite={suite}/>
            </Item.Group>

            <CartExecuteButton suite={suite}/>
        </Placeholder>
    }
}

export default CartSidebar