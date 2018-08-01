import React from 'react'
import Placeholder from "./Placeholder";
import CartItem from "./CartItem";

class CartItemList extends React.Component {
    render() {
        const {items = []} = this.props
        return <Placeholder>
            {
                items.map((item, i) => {
                    return <CartItem key={i} {...{item}} />
                })
            }
        </Placeholder>
    }
}

export default CartItemList