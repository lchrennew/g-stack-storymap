import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";
import Placeholder from "./Placeholder";
import {Label} from "semantic-ui-react";
import Tags from "./Tags";


const getDir = props => {
    let {match: {isExact, params: {dir}, url}, location: {pathname}} = props
    return isExact ?
        ['.', dir].join('/') :
        ['.', dir, pathname.substr(url.length).replace('/', '')].join('/')
}

const getSpec = (index, dir) => {
    let file = index.idx.find(x => x.file.replace(/\\/g, '/') === dir)
    if (file) return file.spec
    else return null
}

const mapStateToProps = (state, props) => ({
    spec: getSpec(state.index, getDir(props))
})

export const withSpec = component => withRouter(connect(mapStateToProps)(component))

class specTitle extends React.Component {
    render() {
        let {spec: {title, tags}} = this.props
        return <Placeholder>
            {title}
            <Placeholder>              </Placeholder>
            {
                tags.length ? <Tags tags={tags}/> : null
            }
        </Placeholder>
    }
}

export const SpecTitle = withSpec(specTitle)


