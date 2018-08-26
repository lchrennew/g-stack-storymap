import React from 'react'
import {openSidebar} from "./Sidebar";


class CreateReleaseButton extends React.Component {

    onClick(e) {
        e.preventDefault()
        e.stopPropagation()
        openSidebar('release/new')
    }

    componentDidMount() {
        const {bindHandler} = this.props
        bindHandler && bindHandler(openSidebar)
    }

    render() {
        return <a href='#'
                  title='Add new release'
                  onClick={this.onClick.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default CreateReleaseButton