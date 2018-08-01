import React from 'react'
import {withRouter} from "react-router-dom";
import {openSidebar} from "./Contexts";
import CartSidebar from "./CartSidebar";

const openCart = (suite) => openSidebar(
    <CartSidebar suite={suite}/>
)
const CartEntry = withRouter((props) => {
        const {match: {params: {suite}}, className} = props
        return <a className={className} onClick={() => openCart(suite)}>
            {props.children}
        </a>
    }
)

export default CartEntry