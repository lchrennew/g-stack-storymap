import React from 'react'
import {openSidebar} from "./Contexts";


class CardDetailsEntry extends React.Component {

    open() {
        const {id} = this.props
        openSidebar(`card/${id}`)
    }

    componentDidMount() {
        const {bindHandler} = this.props
        bindHandler && bindHandler(this.open.bind(this))
    }

    render() {
        return null
    }
}

export default CardDetailsEntry