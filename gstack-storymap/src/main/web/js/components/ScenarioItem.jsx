import React from 'react'
import Icon from "./Icon";
import {withRouter} from "react-router-dom";
// import {execute} from "../actions";
import ExecuteButton from "./ExecuteButton";
import Tags from "./Tags";
import {Table} from 'semantic-ui-react'
import AddToCart from "./AddToCart";
//
// const mapDispatchToProps = dispatch => {
//     return {
//         execute: (suite, path) => dispatch(execute(suite, path)),
//     }
// }
//
// const mapStateToProps = (state, props) => ({})

class ScenarioItem extends React.Component {

    async execute(e) {
        e.preventDefault();
        let path = this.buildLink(['.']),
            {match: {params: {suite}}, executeScenario} = this.props
        await executeScenario(suite, path)
    }

    buildLink(prefix = []) {
        let {match: {isExact, params: {dir}, url}, location: {pathname}, lineNumber} = this.props

        let body = dir ?
            isExact ?
                [dir] :
                [dir, pathname.substr(url.length).replace('/', '')] :
            []
        prefix.push(...body)
        return [prefix.join('/'), lineNumber].join(':')
    }
    render() {
        let {title, tags, match: {params: {suite}}} = this.props
        let path = this.buildLink()
        const item = {
            title,
            href: this.props.location.pathname,
            option: {
                suite,
                path,
            },
            type: 'scenario',
            labels: path.lastIndexOf('/') < 0 ?
                [
                    {title: suite, href: `/${suite}`, type: 'suite'},
                    {
                        title: path.substr(0, path.lastIndexOf(':')),
                        href: this.props.location.pathname,
                        type: 'file'
                    }
                ] :
                [
                    {title: suite, href: `/${suite}`, type: 'suite'},
                    {
                        title: path.substr(0, path.lastIndexOf('/')),
                        href: `/${suite}/tree/${path.substr(0, path.lastIndexOf('/'))}`,
                        type: 'folder'
                    },
                    {
                        title: path.substr(0, path.lastIndexOf(':')).substr(path.lastIndexOf('/') + 1),
                        href: this.props.location.pathname,
                        type: 'file'
                    }
                ]
        }
        return <Table.Row>
            <Table.Cell scope="row" className="icon"><Icon name="activity"/></Table.Cell>
            <Table.Cell className="content">{title}</Table.Cell>
            <Table.Cell className="message"><Tags tags={tags}/></Table.Cell>
            <Table.Cell className="actions">
                <ExecuteButton suite={suite} path={path} title={`场景:${title}`}/>
                <AddToCart className="link"
                           item={item}
                >
                    <Icon name="shopping-cart"/>
                </AddToCart>
            </Table.Cell>
        </Table.Row>
    }
}

export default withRouter(ScenarioItem)