import React from 'react'
import {openSidebar} from "./Contexts";
import CardDetails from "./CardDetails";

class CardDetailsEntry extends React.Component {

    showDetails(e) {
        e.preventDefault()
        e.stopPropagation()
        this.open()
    }

    open() {
        const {id} = this.props
        openSidebar(<CardDetails id={id}/>)
    }

    componentDidMount() {
        const {bindHandler} = this.props
        bindHandler(this.open.bind(this))
    }

    render() {
        return <a href="#"
                  title={'Show details'}
                  onClick={this.showDetails.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default CardDetailsEntry