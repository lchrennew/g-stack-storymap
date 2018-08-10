import React from 'react'
import {connect} from 'react-redux'
import {updateCardTitle} from "../actions";

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        save: (id, title) => dispatch(updateCardTitle(id, title))
    }
}

class CardTitleEditing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: props.value}
        this.ref = React.createRef()
    }

    init(el) {
        el && el.focus()
    }

    save(e) {
        const {onBlur, save, id} = this.props
        const {value} = this.state
        onBlur(e)
        save(id, value)
    }

    syncValue(e) {
        this.setState({value: e.target.value})
    }

    onKeyPress(e) {
        if (e.ctrlKey && e.key === "\n") {
            this.save(e)
        }
    }

    render() {

        return <textarea className="card-title edit"
                         value={this.state.value}
                         ref={this.init}
                         onKeyPress={this.onKeyPress.bind(this)}
                         onChange={this.syncValue.bind(this)}
                         onBlur={this.save.bind(this)}/>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CardTitleEditing)