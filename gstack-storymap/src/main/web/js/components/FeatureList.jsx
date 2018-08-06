import React from 'react'
import Card from "./Card";
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
class FeatureList extends React.Component {
    render() {
        const {task, release, list, moveCard} = this.props

        const onMove = e => {
                console.log('[Feature]')
                console.log(getMoveOptions(e))
            }


        return <SortableCards className={`feature sortable list${release ? ' release' : ''}`}
                              ghostClass="ui-sortable-placeholder"
                              dragClass="drag-feature"
                              chosenClass="chosen-feature"
                              onMove={onMove.bind(this)}
                              data={{card: task, release}}
                              id={`${task ? task.id : ''}`}
        >
            {
                list ? list.map(feature => (
                    <Card key={feature.id} card={feature}/>
                )) : null
            }
        </SortableCards>

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureList)