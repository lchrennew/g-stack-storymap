import React from 'react'
import {openSidebar} from "./Contexts";
import {connect} from 'react-redux'
import {fetchRelease} from "../actions";
import ReleaseDetailsSidebar from "./ReleaseDetailsSidebar";


const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        load: id => dispatch(fetchRelease(id))
    }
}

class ReleaseDetailsEntry extends React.Component {

    onClick(e) {
        e.preventDefault()
        e.stopPropagation()
        this.open()
    }

    open() {
        const {id, load} = this.props
        openSidebar(<ReleaseDetailsSidebar id={id}/>)
        load(id)
    }

    componentDidMount() {
        const {bindHandler} = this.props
        bindHandler && bindHandler(this.open.bind(this))
    }

    render() {
        return <a href="#"
                  title={'Show details'}
                  onClick={this.onClick.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseDetailsEntry)