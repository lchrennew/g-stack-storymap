import React from 'react'
import Card from "./Card";
import Sortable from './Sortable'

class FeatureList extends React.Component {

    render() {
        const {taskid, releaseid = '_', list} = this.props
        const group = {
            name: '.list.ui-sortable',
            pull: (to, from) => $(from).data('activity') !== $(to).data('activity')
        }

        return <Sortable className="feature sortable list"
                         ghostClass="ui-sortable-placeholder"
                         dragClass="drag-feature"
        >
            {
                list ? list.map(feature => (
                    <Card key={feature.id} card={feature}/>
                )) : null
            }
        </Sortable>

    }

}

export default FeatureList