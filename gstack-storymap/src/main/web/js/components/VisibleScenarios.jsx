import {connect} from 'react-redux'
import ScenarioList from "./ScenarioList";
import {withSpec} from "./SpecProvider";
import {FilterString} from "../utils";


const mapStateToProps = (state, props) => {
    let {spec} = props
    if (spec) {
        let {filter} = new FilterString(state.filters.filter),
            items = spec.scenarios.filter(item => filter([...spec.tags, ...item.tags,]))
        return {
            items,
        }
    }
    else return {}

}

export default withSpec(connect(
    mapStateToProps)(ScenarioList))

