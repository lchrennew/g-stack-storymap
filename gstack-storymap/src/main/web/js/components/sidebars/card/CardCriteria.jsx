import React from 'react'
import {Route, Switch} from "react-router-dom";
import CriteriaList from "./CriteriaList";
import CriteriaProvider from "../../providers/CriteriaProvider";
import CriterionForm from "./CriterionForm";


class CardCriteria extends React.Component {
    render() {
        const id = parseInt(this.props.match.params.id)
        return <CriteriaProvider id={id}>
            <Switch>
                <Route path='/:project/:maximized(!{1,2})/card/:id/criteria/new' component={CriterionForm}/>
                <Route path='/:project/:maximized(!{1,2})/card/:id/criteria/:criterion/edit' component={CriterionForm}/>
                <Route component={CriteriaList}/>
            </Switch>
        </CriteriaProvider>
    }
}

export default CardCriteria