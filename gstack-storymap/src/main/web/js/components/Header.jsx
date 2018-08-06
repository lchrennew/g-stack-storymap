// 页头

import React from 'react'
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {
    Container,
    Image,
    Menu,
} from 'semantic-ui-react'
import Placeholder from "./Placeholder";

const ProjectMenuItems = withRouter(props => {
    const {match: {params: {project}}} = props
    return <Placeholder>
    </Placeholder>
})

class Header extends React.Component {
    render() {
        return <Menu fixed='top' inverted as="header">
            <Container fluid>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/img/logo.png' style={{marginRight: '1.5em'}}/>
                    Project Name
                </Menu.Item>
                <Link className="item" to="/">Home</Link>
            </Container>
        </Menu>
    }
}

export default Header