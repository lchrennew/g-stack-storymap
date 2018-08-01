import React from 'react'
import ResultsProvider from "./ResultsProvider";
import {withRouter} from 'react-router-dom'
import VisibleResults from "./VisibleResults";

class Logs extends React.Component {

    render() {
        return <ResultsProvider>
            <VisibleResults/>
        </ResultsProvider>
    }
}

export default withRouter(Logs)