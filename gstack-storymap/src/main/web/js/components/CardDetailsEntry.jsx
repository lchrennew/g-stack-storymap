import React from 'react'
import {openSidebar} from "./Contexts";


class CardDetailsEntry extends React.Component {

    onClick(e) {
        e.stopPropagation()
        this.open()
    }

    open() {
        const {id} = this.props
        openSidebar(`card/${id}`)
    }

    componentDidMount() {
        const {bindHandler} = this.props
        bindHandler && bindHandler(this.open.bind(this))
    }

    render() {
        return <a href='#'
                  title={'Show details'}
                  onClick={this.onClick.bind(this)}
        >{this.props.children}</a>
    }
}

export default CardDetailsEntry