// 文件夹项
import React from 'react'
import {Link, withRouter} from "react-router-dom";
import Icon from "./Icon";
import ExecuteButton from "./ExecuteButton";
import Tags from "./Tags";
import DirLink from "./DirLink";
import { Table } from 'semantic-ui-react'
import AddToCart from "./AddToCart";

class DirItem extends React.Component {
    buildLink(prefix) {
        let {match: {isExact, params: {dir}, url}, location: {pathname}, name} = this.props

        let body = dir ?
            isExact ?
                [dir, name] :
                [dir, pathname.substr(url.length).replace('/', ''), name] :
            [name]
        prefix.push(...body)
        return prefix.join('/')
    }

    getLink() {
        let {match: {params: {suite}}, itemtype} = this.props
        let branch = itemtype === 'file' ? 'clob' : 'tree'
        return this.buildLink(['', suite, branch])
    }

    render() {
        // itemtype: folder => /tree/**
        // itemtype: file => /clob/**
        let {name, itemtype, specTags = [], scenarioTags, match: {params: {suite}}} = this.props
        let link = this.getLink(), path = this.buildLink([])
        const item = {
            title: name,
            href: link,
            option: {
                suite,
                path: this.buildLink([]),
            },
            type: itemtype,
            labels: itemtype === 'folder' || path.lastIndexOf('/') < 0 ? [
                    {type: 'suite', title: suite, href: `/${suite}`},
                ] :
                [
                    {type: 'suite', title: suite, href: `/${suite}`},
                    {
                        type: 'folder',
                        title: path.substr(0, path.lastIndexOf('/')),
                        href: `/${suite}/tree/${path.substr(0, path.lastIndexOf('/'))}`,
                    },
                ]
        }
        return <Table.Row>
            <Table.Cell scope="row" className="icon"><Icon name={itemtype}/></Table.Cell>
            <Table.Cell className="content"><DirLink to={link} dir={name}/></Table.Cell>
            <Table.Cell className="message">
                {itemtype === 'file' ? <Tags tags={specTags}/> : null}
            </Table.Cell>
            <Table.Cell className="actions">
                <ExecuteButton suite={suite} path={path} title={`${itemtype}:${name}`}/>
                <AddToCart className="link"
                           item={item}
                >
                    <Icon name="shopping-cart"/>
                </AddToCart>
            </Table.Cell>
        </Table.Row>
    }
}

export default withRouter(DirItem)