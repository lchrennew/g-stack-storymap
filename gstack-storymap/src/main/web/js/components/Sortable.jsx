import React from 'react'
import sort from "sortablejs"

class Sortable extends React.Component {
    init(el) {
        if (el) {
            const eventHandler = e => {
            }
            const {
                group = '.list.ui-sortable',
                dragClass = '',
                ghostClass = 'ui-sortable-placeholder',
                scroll = true,
                filter = '.placeholder',
                animation = 150,
                scrollSensitivity = 180,
                handle = '.card',
                onStart = eventHandler,
                onEnd = eventHandler,
                onAdd = eventHandler,
                onUpdate = eventHandler,
                onSort = eventHandler,
                onRemove = eventHandler,
                onFilter = eventHandler,
                onMove = eventHandler,
                onClone = eventHandler,
            } = this.props
            sort.create(el, {
                group,
                dragClass,
                ghostClass,
                scroll,
                filter,
                animation,
                scrollSensitivity,
                handle,
                onStart: e => console.log(`onStart->${e.oldIndex}`) || onStart(e),
                onEnd: e => console.log(`onEnd->`) || console.log(e) || onEnd(e),
                onAdd: e => console.log(`onAdd->`) || console.log(e) || onAdd(e),
                onUpdate: e => console.log(`onUpdate->`) || console.log(e) || onUpdate(e),
                onSort: e => console.log(`onSort->`) || console.log(e) || onSort(e),
                onRemove: e => console.log(`onRemove->`) || console.log(e) || onRemove(e),
                onFilter: e => console.log(`onFilter->`) || console.log(e) || onFilter(e),
                onMove: e => onMove(e),
                onClone: e => console.log(`onClone->`) || console.log(e) || onClone(e),
            })
        }
    }

    render() {
        const {className} = this.props
        return <div {...{className}} ref={this.init.bind(this)}>
            {this.props.children}
        </div>
    }
}

export default Sortable