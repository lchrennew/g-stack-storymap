import React from 'react'
import Placeholder from "./Placeholder";
import {Dimmer, Loader, Menu} from "semantic-ui-react";
import {connect} from 'react-redux'
import {SidebarMaximizeButton} from "./Contexts";
import CardEdit from "./CardEdit";
import Icon from "./Icon";
import CardSummary from "./CardSummary";
import {Route, Switch, withRouter} from "react-router-dom";
import {fetchCard} from "../actions";
import CardDetailsHeader from "./CardDetailsHeader";

const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id),
        card: state.card.card,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: id => dispatch(fetchCard(id))
    }
}

class CardDetailsSidebar extends React.Component {

    componentDidMount() {
        const {id, load} = this.props
        load(id)
    }

    componentDidUpdate() {
        const {id, card, load} = this.props
        if (!card || card.id !== id) {
            load(id)
        }
    }

    render() {
        const {card} = this.props

        return <Placeholder>
            <Switch>
                <Route path='/:project/!/card/:id/:mode' component={CardDetailsHeader} />
                <Route path='/:project/!/card/:id' component={CardDetailsHeader} />
            </Switch>
            <div className="content container">
                {
                    card
                        ? <Switch>
                            <Route path='/:project/!/card/:id/edit' component={CardEdit}/>
                            <Route component={CardSummary}/>
                        </Switch>
                        : <Dimmer active inverted>
                            <Loader size='huge'>Loading</Loader>
                        </Dimmer>
                }

            </div>
        </Placeholder>

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardDetailsSidebar))