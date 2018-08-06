import React from 'react'
import Sortable from "sortablejs"
import $ from 'jquery'
import {moveUpdateCard} from "../actions";
import {connect} from 'react-redux'

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

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        moveCard: (option) => dispatch(moveUpdateCard(option))
    }
}
const eventHandler = e => {
}

class _SortableCards extends React.Component {

    init(el) {
        if (el) {

            const {
                group = 'cards',
                dragClass = '',
                ghostClass = 'ui-sortable-placeholder',
                chosenClass = 'ui-sortable-placeholder',
                filter = '.placeholder',
                animation = 0,
                scroll = $('#gstack-console > .container')[0],
                scrollSensitivity = 120,
                scrollSpeed = 10,
                handle = '.card',
                forceFallback = false,
                delay = 0,
                onStart = eventHandler,
                onEnd = eventHandler,
                onSort = eventHandler,
                onRemove = eventHandler,
                onFilter = eventHandler,
                onMove = eventHandler,
                onClone = eventHandler,
                onChoose = eventHandler,
                data = {},
                moveCard,
            } = this.props

            const s = Sortable.create(el, {
                group,
                dragClass,
                ghostClass,
                chosenClass,
                scroll,
                filter,
                animation,
                scrollSensitivity,
                scrollSpeed,
                handle,
                forceFallback,
                delay,
                onStart,
                onEnd,
                onAdd: e => {
                    const opt = getUpdateOptions(e)
                    //e.from.append(e.item)
                    if (e.from.contains(e.item) || e.to.contains(e.from) || e.to != e.from)
                        e.from.append(e.item)
                    moveCard(opt)
                },
                onUpdate: e => {
                    const opt = getUpdateOptions(e)
                    moveCard(opt)
                },
                onChoose,
                // onSort: e => console.log(`onSort->`) || console.log(e) || onSort(e),
                onRemove,
                // onFilter: e => console.log(`onFilter->`) || console.log(e) || onFilter(e),
                onMove,
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

export const SortableCards = connect(mapStateToProps, mapDispatchToProps)(_SortableCards)