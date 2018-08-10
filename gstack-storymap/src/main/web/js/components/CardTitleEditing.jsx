import React from 'react'


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
        const {onBlur} = this.props
        const {value} = this.state
        onBlur(e)
    }

    syncValue(e) {
        this.setState({value: e.target.value})
    }

    render() {

        return <textarea className="card-title edit"
                         value={this.state.value}
                         ref={this.init}
                         onChange={this.syncValue.bind(this)}
                         onBlur={this.save.bind(this)}/>
    }

}

export default CardTitleEditing