import React from 'react'
import {connect} from 'react-redux'
import {updateCardTitle} from "../../../actions";
import {notify} from "../../common/NotificationManager";

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

    async save(e) {
        const {onBlur, save, id} = this.props
        const {value} = this.state
        onBlur(e)
        if (value !== (this.props.value || '')) {
            await save(id, value)
            notify({
                title: 'Save card',
                level: 'success',
                message: 'Done!'
            })
        }
        else if (this.props.value === undefined) {
            await save(id, value)
        }
    }

    async cancel(e) {
        const {onBlur, value, id, save} = this.props
        onBlur(e)
        if (value === undefined)
            await save(id, '')
    }

    syncValue(e) {
        this.setState({value: e.target.value})
    }

    async onKeyDown(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === "\n" || e.key === 'Enter' || e.key === 's')) {
            e.preventDefault()
            this.save(e)
        }
        else if (e.key === 'Escape') {
            e.preventDefault()
            await  this.cancel(e)
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