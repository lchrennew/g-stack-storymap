import React from "react";
import Placeholder from "./Placeholder";
import VisibleCartItems from "./VisibleCartItems";
import {Divider, Dropdown, Menu, Item} from "semantic-ui-react";
import CartExecuteButton from "./CartExecuteButton";
import Icon from "./Icon";
import VisibleResults from "./VisibleResults";
import ResultsProvider from "./ResultsProvider";

class LogsMenu extends React.Component {
    render() {
        return <Menu fixed='top'>
            <Menu.Item header><Icon name="clock" size={28}/></Menu.Item>
            <Menu.Menu position='right'>
                <Dropdown icon={<Icon name="more-vertical"/>} item>
                    <Dropdown.Menu>
                        <Dropdown.Header>Favorates</Dropdown.Header>
                        <Dropdown.Item>
                            <Icon name="star"/> Add to favorates
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    }
}


class LogsSidebar extends React.Component {
    render() {
        const {suite} = this.props
        return <Placeholder>
            <LogsMenu/>
            <Item.Group divided>
                <ResultsProvider suite={suite}>
                    <VisibleResults/>
                </ResultsProvider>
            </Item.Group>
        </Placeholder>
    }
}

export default LogsSidebar