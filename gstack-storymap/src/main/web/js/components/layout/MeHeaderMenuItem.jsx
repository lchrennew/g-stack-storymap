import React from 'react'
import {Image, Menu} from "semantic-ui-react";
import {connect} from 'react-redux'

const mapStateToProps = (state, props) => {
    return {
        me: state.users.me
    }
}

class MeHeaderMenuItem extends React.Component {
    render() {
        const {me} = this.props
        return <Menu.Item>
            <Image avatar src={me.userAuthentication.details.avatar_url}/> <span>{me.name}</span>
        </Menu.Item>
    }
}

export default connect(mapStateToProps)(MeHeaderMenuItem)