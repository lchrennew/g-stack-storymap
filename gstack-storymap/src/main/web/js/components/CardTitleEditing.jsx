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
        this.state = {value: props.value || ''}
        this.ref = React.createRef()
    }

    init(el) {
        el && el.focus()
        el && el.select()
    }

    save(e) {
        const {onBlur, save, id} = this.props
        const {value} = this.state
        onBlur(e)
        save(id, value)
    }

    cancel(e) {
        const {onBlur} = this.props
        onBlur(e)
    }

    syncValue(e) {
        this.setState({value: e.target.value})
    }

    onKeyDown(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === "\n" || e.key === 's')) {
            e.preventDefault()
            this.save(e)
        }
        else if (e.key === 'Escape') {
            e.preventDefault()
            this.cancel(e)
        }
    }

    render() {

        return <textarea className="g-card-title edit"
                         placeholder="Enter a title"
                         value={this.state.value}
                         ref={this.init}
                         onKeyDown={this.onKeyDown.bind(this)}
                         onChange={this.syncValue.bind(this)}
                         onBlur={this.save.bind(this)}/>
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CardTitleEditing)