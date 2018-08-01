import {Header, Label, Table} from "semantic-ui-react";
import Icon from "./Icon";
import React from 'react'

class TagsFilterIntro extends React.Component {
    render() {
        let {tags} = this.props
        return <div className="ui popup visible bottom left fluid" style={{position: 'static'}}>
            <Header>Available tags</Header>
            <Label.Group>
                {
                    tags.map((tag, i) => <Label key={i} as='a' size='mini'>
                        <Icon name="tag" size={13}/> {tag}
                    </Label>)
                }
            </Label.Group>
            <Header>Tag expressions</Header>
            <Table celled compact size="small">
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>!TagA</Table.Cell>
                        <Table.Cell>do not have TagA</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>TagA & TagB</Table.Cell>
                        <Table.Cell>have both TagA and TagB</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>TagA & !TagB</Table.Cell>
                        <Table.Cell>have TagA and not TagB</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>(TagA & TagB) | TagC</Table.Cell>
                        <Table.Cell>have either TagC or both TagA and TagB</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>!(TagA & TagB) | TagC</Table.Cell>
                        <Table.Cell>have either TagC or do not have both TagA and TagB</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>(TagA | TagB) & TagC</Table.Cell>
                        <Table.Cell>have either [TagA and TagC] or [TagB and TagC]</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    }
}

export default TagsFilterIntro