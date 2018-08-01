import React from 'react'
import {Breadcrumb} from "semantic-ui-react";
import Icon from "./Icon";
import {Link} from "react-router-dom";
import Placeholder from "./Placeholder";

class SuiteBreadcrumb extends React.Component {
    render() {
        const {dir} = this.props
        let segs = dir ? dir.split('/').filter(s => !!s) : []
        let suite = segs.shift()
        let type = segs.length > 0 ? segs.shift() : ''

        return <Breadcrumb size="huge">
            <Icon name="box" size={24}/> <Link to={`/${suite}`} className="section"><b>{suite}</b></Link>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            {
                segs.map((path, k) => k + 1 < segs.length || type === 'tree' ?
                    <Placeholder key={k}>
                        <Link
                            to={`/${suite}/tree/${segs.slice(0, k + 1).join('/')}`}
                            className="section">{path}</Link>
                        <Breadcrumb.Divider>/</Breadcrumb.Divider>
                    </Placeholder> :
                    <Breadcrumb.Section key={k}>{path}</Breadcrumb.Section>
                )
            }
            {
                type !== 'tree' && type !== 'clob' ? <Breadcrumb.Section>{type}</Breadcrumb.Section> : null
            }
        </Breadcrumb>

    }
}

export default SuiteBreadcrumb