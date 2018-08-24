import React from 'react'
import {Accordion, Dimmer, Label, Loader, Message} from "semantic-ui-react";
import {fetchCriteria} from "../actions";
import {connect} from 'react-redux'
import Placeholder from "./Placeholder";
import * as Showdown from "showdown";
import Prism from 'prismjs';
import Icon from "./Icon";
import {Link} from "react-router-dom";
import Code from "./Code";

const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id),
        list: state.criteria.list,
        card: state.criteria.card,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: id => dispatch(fetchCriteria(id))
    }
}

class CardCriteria extends React.Component {
    converter: Showdown.Converter

    constructor(props) {
        super(props)
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
        })
        this.state = {activeIndex: 0}
    }

    componentDidMount() {
        const {id, load} = this.props
        load(id)
    }

    highlight(el) {
        el && Prism.highlightElement(el)
    }

    handleClick(e, props) {
        const {index} = props
        const {activeIndex} = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({activeIndex: newIndex})
    }

    render() {
        const {list, id, match: {params: {project, maximized}}} = this.props
        const {activeIndex} = this.state
        return list
            ? (
                <Accordion fluid>
                    {
                        list.map((criterion, i) =>
                            <Placeholder key={i}>
                                <Accordion.Title active={activeIndex === i}
                                                 index={i}
                                                 onClick={this.handleClick.bind(this)}>
                                    <Icon name={activeIndex === i ? 'chevron-up' : 'chevron-down'}/>
                                    <Label basic horizontal size='mini'>#{criterion.id}</Label> {criterion.title}
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === i}>
                                    <Message>
                                        <Message.Header>{criterion.title}</Message.Header>
                                        <Code mode='text' content={criterion.description}/>
                                        <Link to={`/${project}/${maximized}/card/${id}/criteria/${criterion.id}/edit`}
                                              className='ui top right attached label'
                                        >
                                            Edit
                                        </Link>
                                    </Message>
                                </Accordion.Content>
                            </Placeholder>)
                    }
                    <Accordion.Title>
                        <Link to={`/${project}/${maximized}/card/${id}/criteria/new`} className={'ui button mini'}><Icon
                            name='plus'/>
                            Add new</Link>
                    </Accordion.Title>
                </Accordion>
            )
            : <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardCriteria)