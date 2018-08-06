import React from 'react'
import Card from "./Card";
import {Sortable, getMoveOptions, getUpdateOptions} from './Sortable'
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
class FeatureList extends React.Component {
    render() {
        const {task, release, list, moveCard} = this.props

        const onMove = e => {
                console.log('[Feature]')
                console.log(getMoveOptions(e))
            },
            onUpdate = e => {
                moveCard(getUpdateOptions(e))
            },
            onAdd = e => {
                let opt = getUpdateOptions(e)
                e.from.appendChild(e.item)
                moveCard(opt)
            }


        return <Sortable className={`feature sortable list${release ? ' release' : ''}`}
                         ghostClass="ui-sortable-placeholder"
                         dragClass="drag-feature"
                         chosenClass="chosen-feature"
                         onMove={onMove.bind(this)}
                         onUpdate={onUpdate.bind(this)}
                         onAdd={onAdd.bind(this)}
                         scrollSensitivity={240}
                         data={{card: task, release}}
                         id={`${task ? task.id : ''}`}
        >
            {
                list ? list.map(feature => (
                    <Card key={feature.id} card={feature}/>
                )) : null
            }
        </Sortable>

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureList)