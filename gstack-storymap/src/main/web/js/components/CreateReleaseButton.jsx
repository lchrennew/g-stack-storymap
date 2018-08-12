import React from 'react'
import {openSidebar} from "./Contexts";
import CreateReleaseSidebar from "./CreateReleaseSidebar";


class CreateReleaseButton extends React.Component {

    onClick(e) {
        e.preventDefault()
        e.stopPropagation()
        this.open()
    }

    open() {
        openSidebar(<CreateReleaseSidebar/>)
    }

    componentDidMount() {
        const {bindHandler} = this.props
        bindHandler && bindHandler(this.open.bind(this))
    }

    render() {
        return <a href="#"
                  title={'Add new release'}
                  onClick={this.onClick.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default CreateReleaseButton