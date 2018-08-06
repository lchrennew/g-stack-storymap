import React from 'react'
import {Sortable, getMoveOptions, getUpdateOptions} from './Sortable'
import Card from "./Card";
import {jsonPath} from "../utils";
import {moveUpdateCard} from "../actions";
import {connect} from "react-redux";

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        moveCard: (option) => dispatch(moveUpdateCard(option))
    }
}

class TaskList extends React.Component {

    render() {
        const {activity: {details}, activity, moveCard} = this.props
        const onStart = e => {
                const opt = getMoveOptions(e)
                $(`.feature.list[data-id="${opt.card.id}"]`).addClass('dragging')

                // 如果task有detail，不能成为feature
                if (jsonPath(opt.card, '$.details..id')) {
                    $(`.feature.list`).addClass('dragging')
                }
                // 如果task有plans，不能成为activity
                if (jsonPath(opt.card, '$..plans..id')) {
                    $('.activity.list')[0].option("disabled", true)
                }
            },
            onMove = e => {
                // console.log('[Task]')
                // const opt = getMoveOptions(e),
                //     schedules = $('.schedules > .content')
                // console.log(opt)
                // if (opt.level === 'task') { // same level
                //     schedules.each((i, el) => {
                //         el = $(el)
                //         let rel = el.find(`[data-id="${opt.card.id}"]`)
                //         if (opt.direction === 'Detail') {
                //             el.find(`[data-id="${opt.target.id}"] .task.list`).prepend(rel)
                //         }
                //         else if (opt.after) {
                //             el.find(`[data-id="${opt.target.id}"]`).after(rel)
                //         } else {
                //             el.find(`[data-id="${opt.target.id}"]`).before(rel)
                //         }
                //     })
                // }
            },
            onUpdate = e => {
                moveCard(getUpdateOptions(e))
            },
            onAdd = e => {
                let opt = getUpdateOptions(e)
                e.from.appendChild(e.item)
                moveCard(opt)
            },
            onRemove = e => {
                e.preventDefault()
            },
            onEnd = e => {
                const opt = getMoveOptions(e)
                $(`.dragging`).removeClass('dragging')
                $('.activity.list')[0].option("disabled", false)
            }
        return <Sortable className="task sortable list"
                         ghostClass="ui-sortable-placeholder"
                         dragClass="drag-task"
                         chosenClass="chosen-task"
                         onMove={onMove.bind(this)}
                         onStart={onStart.bind(this)}
                         onUpdate={onUpdate.bind(this)}
                         onAdd={onAdd.bind(this)}
                         onRemove={onRemove.bind(this)}
                         onEnd={onEnd.bind(this)}
                         data={{card: activity}}
                         id={`${activity.id}`}
        >
            {
                details ? details.map(task => (
                    <Card key={task.id} card={task}/>
                )) : null
            }
        </Sortable>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)