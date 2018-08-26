import React from 'react'
import {Accordion, Label, Message} from "semantic-ui-react";
import Placeholder from "../../common/Placeholder";
import Icon from "../../common/Icon";
import Code from "../../common/Code";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'


const mapStateToProps = (state, props) => {
    return {
        id: parseInt(props.match.params.id),
        list: state.criteria.list,
    }
}

class CriteriaList extends React.Component{
    constructor(props) {
        super(props)
        this.state = {activeIndex: 0}
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
        return <Accordion fluid>
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
    }
}

export default connect(mapStateToProps)(CriteriaList)