import React from 'react'
import {openSidebar} from "../sidebars/Sidebar";

class ReleaseDetailsEntry extends React.Component {

    onClick(e) {
        e.stopPropagation()
        e.preventDefault()
        this.open()
    }

    open() {
        const {id} = this.props
        openSidebar(`release/${id}`)
    }

    componentDidMount() {
        const {bindHandler} = this.props
        bindHandler && bindHandler(this.open.bind(this))
    }

    render() {
        return <a href='#'
                  title={'Show details'}
                  onClick={this.onClick.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default ReleaseDetailsEntry