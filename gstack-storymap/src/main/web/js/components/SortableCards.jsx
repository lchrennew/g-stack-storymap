import React from 'react'
import Sortable from "sortablejs"
import $ from 'jquery'
import {endDragCard, moveUpdateCard, startDragCard, saveCardMovement} from "../actions";
import {connect} from 'react-redux'
import {CardHelper} from "../utils";
import Card from "./Card";

export const getUpdateOptions = e => {
    const card = $(e.item).data('card'),
        index = $(e.item).parent().children(':visible').index(e.item),
        direction = index === 0
            ? $(e.to).hasClass('activity')
                ? 'Root'
                : $(e.to).data('release')
                    ? 'Plan'
                    : 'Detail'
            : 'Next',
        target = direction === 'Root'
            ? $(e.item).next(':visible').data('project')
            : direction === 'Next'
                ? $(e.item).prev(':visible').data('card')
                : direction === 'Detail'
                    ? $(e.to).data('card')
                    : direction === 'Plan'
                        ? $(e.to).data('card')
                        : null,
        release = direction === 'Plan'
            ? `${$(e.to).data('release').id}`
            : null
    return {direction, card, target, release, index}
}

const mapStateToProps = (state, props) => {
    return {
        dragging: state.dragging.card,
        storedCards: state.cards.list,
        project: state.cards.project,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        moveCard: (option, save = false) => dispatch((save ? saveCardMovement : moveUpdateCard)(option)),
        startDrag: card => dispatch(startDragCard(card)),
        endDrag: card => dispatch(endDragCard(card)),
    }
}
const eventHandler = e => {
}

class _SortableCards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {dragging: false}
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.state.dragging
    }

    putCheck(to, from) {
        const {dragging, id, storedCards} = this.props
        if (!dragging) return true
        else{
            return SortableCards.buffer(
                id,
                () => {
                    console.log(`check ${id}`)
                    return CardHelper.accept(
                        storedCards,
                        SortableCards.dragging(storedCards, dragging),
                        id)
                })
        }
        //return !$(to.el).hasClass('dragging')
    }

    init(el) {
        if (el) {

            const {startDrag, endDrag, project} = this.props

            const {
                dragClass = '',
                ghostClass = 'ui-sortable-placeholder',
                chosenClass = 'ui-sortable-placeholder',
                data = {},
                moveCard,
            } = this.props

            const s = Sortable.create(el, {
                group: {name: 'cards', pull: true, put: this.putCheck.bind(this)},
                dragClass,
                ghostClass,
                chosenClass,
                scroll: $('#gstack-console > .container')[0],
                animation: 0,
                scrollSensitivity: 120,
                scrollSpeed: 10,
                handle: '.card',
                forceFallback: false,
                delay: 0,
                onStart: e => {
                },
                onEnd: e => {
                },
                onAdd: e => {
                    const opt = getUpdateOptions(e)
                    if (e.from.childElementCount <= e.oldIndex) e.from.appendChild(e.item)
                    else $(e.item).insertBefore($(e.from).children(':visible').get(e.oldIndex))
                    moveCard(opt, true)
                },
                onUpdate: e => {
                    const opt = getUpdateOptions(e)
                    moveCard(opt, true)
                },
                onChoose: e => {
                    this.setState({dragging: true})
                    const opt = getUpdateOptions(e)
                    startDrag(opt.card)
                },
                onUnchoose: e => {
                    SortableCards.dragged()
                    endDrag()
                    this.setState({dragging: false})
                },
                // onUnchoose: e => $('.dragging').removeClass('dragging'),
                // onSort: e => console.log(`onSort->`) || console.log(e) || onSort(e),
                onMoved: e => {
                    const opt = getUpdateOptions(e)
                    // moveCard(opt)
                },
            })
            data.project = {id: project}
            $(el).data(data)
            el.option = s.option.bind(s)
        }
    }

    static dragging(cards, dragging) {
        this.draggingOption = this.draggingOption || CardHelper.dragging(cards, dragging)
        return this.draggingOption
    }

    static buffer(id, getResult) {
        this.results = this.results || {}
        if (this.results[id] === undefined)
            this.results[id] = getResult()
        return this.results[id]
    }

    static dragged() {
        this.results = {}
        this.draggingOption = null
    }

    render() {
        const {className, id, cards = [], nested, dragging, stretched = false, horizontal = false} = this.props

        return <div className={`${className} sortable list`}>
            <div className="head">{this.props.children}</div>
            <div className={`body${stretched ? ' stretched' : ''}`}
                 ref={this.init.bind(this)}
                 data-id={id}>
                {
                    cards && cards.map(card => !dragging || dragging.id !== card.id ?
                        <Card nested={nested ? nested(card) : null}
                              horizontal={horizontal}
                              key={card.id}
                              card={card}
                        /> : null)
                }
            </div>
        </div>
    }
}

export const SortableCards = connect(mapStateToProps, mapDispatchToProps)(_SortableCards)