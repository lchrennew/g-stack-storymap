import React from 'react'
import Placeholder from "./Placeholder";
import {Dimmer, Loader, Menu} from "semantic-ui-react";
import {connect} from 'react-redux'
import {SidebarMaximizeButton} from "./Contexts";
import CardEdit from "./CardEdit";
import Icon from "./Icon";
import CardSummary from "./CardSummary";

const mapStateToProps = (state, props) => {
    return {
        card: state.card.card
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

class CardDetailsSidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {mode: 'normal'}
    }

    mode(view) {
        return (e => {
            e.preventDefault()
            this.setState({mode: view})
        }).bind(this)
    }

    render() {
        const {id, card} = this.props
        const {mode} = this.state

        let component;
        if (card)
            switch (mode) {
                case 'normal':
                    component = <CardSummary card={card}/>
                    break
                case 'edit':
                    component = <CardEdit card={card}/>
                    break
                default:
                    break
            }
        else component = <Dimmer active inverted>
            <Loader size='huge'>Loading</Loader>
        </Dimmer>

        return <Placeholder>
            <Menu fixed='top' borderless className="title" pointing>
                <Menu.Item active={mode === 'normal'}>
                    <a href="#" onClick={this.mode('normal')}>Card: #{id}</a>
                </Menu.Item>
                {
                    card
                        ? <Placeholder>
                            <Menu.Item active={mode === 'edit'}><a href="#" onClick={this.mode('edit')}><Icon name="edit"/></a></Menu.Item>
                        </Placeholder>
                        : null
                }
                <Menu.Menu position="right">
                    <Menu.Item><SidebarMaximizeButton/></Menu.Item>
                </Menu.Menu>
            </Menu>
            <div className="content container">
                {component}
            </div>
        </Placeholder>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailsSidebar)