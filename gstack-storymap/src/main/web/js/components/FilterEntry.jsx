import React from 'react'
import {withRouter} from "react-router-dom";
import {openSidebar} from "./Contexts";
import {Dropdown, Menu} from "semantic-ui-react";
import Icon from "./Icon";
import Placeholder from "./Placeholder";
import TagsFilter from "./TagsFilter";

class FilterMenu extends React.Component {
    render() {
        return <Menu fixed='top'>
            <Menu.Item header><Icon name="filter" size={28}/></Menu.Item>
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


class FilterSidebar extends React.Component {
    render() {
        return <Placeholder>
            <FilterMenu/>
            <TagsFilter/>
        </Placeholder>
    }
}

const openFilter = (suite) => openSidebar(
    <FilterSidebar suite={suite}/>
)
const FilterEntry = withRouter((props) => {
        const {match: {params: {suite}}, className} = props
        return <a className={className} onClick={() => openFilter(suite)}>
            {props.children}
        </a>
    }
)

export default FilterEntry