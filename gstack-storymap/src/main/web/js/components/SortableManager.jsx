import React from 'react'

const ref = React.createRef()

class SortableConnector extends React.Component {

    constructor(props) {
        super(props)
        this.r = {}
    }

    register(card, sortable) {

    }

    dragging(item) {

    }

    render() {
        return null
    }
}

export class SortableManager extends React.Component {
    render() {
        return <SortableConnector ref={ref}/>
    }
}

// export const register = (card, sortable) => ref.current && ref.current.r(card, sortable)
