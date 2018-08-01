import React from 'react'
import {connect} from 'react-redux'
import {Input} from "semantic-ui-react";
import {jsonPath} from "../utils";
import Placeholder from "./Placeholder";
import {setFilter} from "../actions";
import TagsFilterIntro from "./TagsFilterIntro";


const getTags = (idx) => Object.keys(Object.assign({}, ...jsonPath(idx, '$..tags.*')
    .map(tag => {
        let o = {}
        o[tag] = 1
        return o
    })))

const mapStateToProps = (state, props) => {
    return {
        tags: getTags(state.index.idx),
        value: state.filters.filter,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setFilter: filter => dispatch(setFilter(filter))
    }
}

class TagsFilter extends React.Component {
    render() {
        let {setFilter, value, tags} = this.props
        return <Placeholder>
            <Input iconPosition='left'
                   icon="tags"
                   placeholder="tags filter"
                   fluid
                   value={value}
                   onChange={(e, data) => setFilter(data.value)}/>
            <TagsFilterIntro tags={tags}/>
        </Placeholder>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsFilter)