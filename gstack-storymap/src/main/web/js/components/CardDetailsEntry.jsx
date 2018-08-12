import React from 'react'
import {openSidebar} from "./Contexts";
import CardDetails from "./CardDetails";
import {connect} from 'react-redux'
import {fetchCard} from "../actions";


const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        load: id => dispatch(fetchCard(id))
    }
}

class CardDetailsEntry extends React.Component {

    onClick(e) {
        e.preventDefault()
        e.stopPropagation()
        this.open()
    }

    open() {
        const {id, load} = this.props
        openSidebar(<CardDetails id={id}/>)
        load(id)
    }

    componentDidMount() {
        const {bindHandler} = this.props
        bindHandler(this.open.bind(this))
    }

    render() {
        return <a href="#"
                  title={'Show details'}
                  onClick={this.onClick.bind(this)}>
            {this.props.children}
        </a>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsEntry)