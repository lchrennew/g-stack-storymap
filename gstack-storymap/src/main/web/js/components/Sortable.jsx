import React from 'react'
import sort from "sortablejs"

const getDirection = (e) => {
    //console.log(`related = ${$(e.related).data('card').title} @ ${$(e.related).index()}`)
    //console.log(`to = ${$(e.to).data('card').title}`)
    //console.log(`from = ${$(e.from).data('card').title}`)
    //console.log(e.willInsertAfter)
    if (e.related) {
        return e.willInsertAfter || (!e.willInsertAfter && $(e.related).index() > 0)
            ? 'Next'
            : $(e.to).hasClass('activity')
                ? 'Root'
                : $(e.to).hasClass('feature release')
                    ? 'Release'
                    : 'Detail'
    }
    else return 'NoChange'
}

const getLevel = e => {
    return $(e.to).hasClass('activity')
        ? 'activity'
        : $(e.to).hasClass('task')
            ? 'task'
            : $(e.to).hasClass('feature')
                ? 'feature'
                : ''
}

export const getMoveOptions = (e) => {
    const card = $(e.item || e.dragged).data('card'),
        direction = getDirection(e),
        target = direction === 'NoChange'
            ? null
            : direction === 'Next' || direction === 'Root'
                ? $(e.related).data('card')
                : $(e.to).data('card'),
        level = getLevel(e),
        after = e.willInsertAfter
    return {card, direction, target, level, after}
}

export const getUpdateOptions = e => {
    const card = $(e.item).data('card'),
        direction = $(e.item).index() === 0
            ? $(e.to).hasClass('activity')
                ? 'Root'
                : $(e.to).data('release')
                    ? 'Release'
                    : 'Detail'
            : 'Next',
        target = direction === 'Root'
            ? $(e.item).next().data('card')
            : direction === 'Next'
                ? $(e.item).prev().data('card')
                : direction === 'Detail'
                    ? $(e.to).data('card')
                    : direction === 'Release'
                        ? $(e.to).data('card')
                        : null,
        release = direction === 'Release'
            ? `${$(e.to).data('release').id}`
            : null
    return {direction, card, target, release}
}

export class Sortable extends React.Component {



    init(el) {
        if (el) {
            const eventHandler = e => {
            }
            const {
                group = 'cards',
                dragClass = '',
                ghostClass = 'ui-sortable-placeholder',
                chosenClass = 'ui-sortable-placeholder',
                scroll = true,
                filter = '.placeholder',
                animation = 0,
                scrollSensitivity = 180,
                handle = '.card',
                forceFallback = false,
                delay = 0,
                onStart = eventHandler,
                onEnd = eventHandler,
                onAdd = eventHandler,
                onUpdate = eventHandler,
                onSort = eventHandler,
                onRemove = eventHandler,
                onFilter = eventHandler,
                onMove = eventHandler,
                onClone = eventHandler,
                data = {}
            } = this.props
            const s = sort.create(el, {
                group,
                dragClass,
                ghostClass,
                chosenClass,
                scroll,
                filter,
                animation,
                scrollSensitivity,
                handle,
                forceFallback,
                delay,
                onStart: e => onStart(e),
                onEnd: e => onEnd(e),
                onAdd: e => onAdd(e),
                onUpdate: e => onUpdate(e),
                // onSort: e => console.log(`onSort->`) || console.log(e) || onSort(e),
                onRemove: e => onRemove(e),
                // onFilter: e => console.log(`onFilter->`) || console.log(e) || onFilter(e),
                onMove: e => onMove(e),
                // onClone: e => console.log(`onClone->`) || console.log(e) || onClone(e),
            })
            $(el).data(data)
            el.option = s.option.bind(s)
        }
    }

    render() {
        const {className, id} = this.props

        return <div {...{className}} ref={this.init.bind(this)} data-id={id}>
            {this.props.children}
        </div>
    }
}