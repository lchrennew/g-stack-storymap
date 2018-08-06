import React from 'react'
import TaskList from "./TaskList";
import Card from "./Card";
import {jsonPath} from "../utils";
import {moveUpdateCard} from "../actions";
import {connect} from 'react-redux'
import {getMoveOptions, SortableCards} from "./SortableCards";

const mapStateToProps = (state, props) => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        moveCard: (option) => dispatch(moveUpdateCard(option))
    }
}

class ActivityList extends React.Component {
    render() {
        const {activities, moveCard} = this.props,
            onStart = e => {
                const opt = getMoveOptions(e)
                $(`.activity.item[data-id="${opt.card.id}"]`).addClass('dragging')

                // 如果activity有detail，不能成为feature
                if (jsonPath(opt.card, '$.details..id')) {
                    $(`.feature.list`).addClass('dragging')
                }
                // 如果activity有detail..details或plans，不能成为task
                if (jsonPath(opt.card, '$.details..details..id')
                    || jsonPath(opt.card, '$..plans..id')) {
                    $(`.task.list`).addClass('dragging')
                }
            },
            onMove = e => {
                // console.log('[Activity]')
                // const opt = getMoveOptions(e),
                //     schedules = $('.schedules > .content')
                // if (opt.level === 'activity') { // same level
                //     schedules.each((i, el) => {
                //         el = $(el)
                //         let rel = el.find(`[data-id="${opt.card.id}"]`).removeClass('hide')
                //         if (opt.direction === 'Root') {
                //             el.prepend(rel)
                //         }
                //         else if (opt.after) {
                //             el.find(`[data-id="${opt.target.id}"]`)
                //                 .after(rel)
                //         } else {
                //             el.find(`[data-id="${opt.target.id}"]`)
                //                 .before(rel)
                //         }
                //     })
                // }
            },
            onEnd = e => {
                //const opt = getMoveOptions(e)
                $(`.dragging`).removeClass('dragging')
        }

        return <SortableCards className="activity sortable list stretched"
                              ghostClass="ui-sortable-placeholder"
                              chosenClass="chosen-activity"
                              dragClass="drag-activity"
                              onMove={onMove.bind(this)}
                              onStart={onStart.bind(this)}
                              onEnd={onEnd.bind(this)}
                              data={{card: activities[0]}}
                              id="_"
        >
            {
                activities.map((activity) => (
                    <Card nested={<TaskList activity={activity}/>}
                          key={activity.id}
                          card={activity}
                    />
                ))
            }
        </SortableCards>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList)