import React from 'react'
import Card from "./Card";
import {jsonPath} from "../utils";
import {moveUpdateCard} from "../actions";
import {connect} from "react-redux";
import {getMoveOptions, SortableCards} from "./SortableCards";

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
        const onChoose = e => {
                const opt = getMoveOptions(e)
                $(`.feature.list[data-id="${opt.card.id}"]`).addClass('dragging')

                // 如果task有detail，不能成为feature
                if (jsonPath(opt.card, '$.details..id')) {
                    $(`.feature.list`).addClass('dragging')
                }
                // 如果task有plans，不能成为activity
                if (jsonPath(opt.card, '$..plans..id')) {
                    // $('.activity.list')[0].option("disabled", true)
                    $('.activity.list')[0].option('group', {put: false})
                    console.log('disabled')
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
            onEnd = e => {
                const opt = getMoveOptions(e)
                $(`.dragging`).removeClass('dragging')
                $('.activity.list')[0].option('group', {put: true})
            }
        return <SortableCards className="task sortable list"
                              ghostClass="ui-sortable-placeholder"
                              dragClass="drag-task"
                              chosenClass="chosen-task"
                              onMove={onMove.bind(this)}
                              onChoose={onChoose.bind(this)}
                              onEnd={onEnd.bind(this)}
                              data={{card: activity}}
                              id={`${activity.id}`}
        >
            {
                details ? details.map(task => (
                    <Card key={task.id} card={task}/>
                )) : null
            }
        </SortableCards>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)