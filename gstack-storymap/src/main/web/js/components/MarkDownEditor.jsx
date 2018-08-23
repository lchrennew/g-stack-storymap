import React from 'react'
import ReactMde from "react-mde";
import * as Showdown from "showdown";


class MarkDownEditor extends React.Component {
    converter: Showdown.Converter

    constructor(props) {
        super(props)
        this.state = {mdeState: {markdown: props.value || ''}}
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
        });

    }

    getValue() {
        return this.state.mdeState.markdown
    }

    handleValueChange(mdeState) {
        this.setState({mdeState});
    }

    render() {
        const {layout} = this.props
        return <ReactMde
            layout={layout}
            onChange={this.handleValueChange.bind(this)}
            editorState={this.state.mdeState}
            generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
        />
    }
}

export default MarkDownEditor