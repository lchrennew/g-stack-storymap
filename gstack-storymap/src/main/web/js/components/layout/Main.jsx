// 主要内容容器

import React from 'react'
import {Container,} from 'semantic-ui-react'

class Main extends React.Component {
    render() {
        return <Container role="main" as="main" fluid>
            {this.props.children}
        </Container>
    }
}

export default Main