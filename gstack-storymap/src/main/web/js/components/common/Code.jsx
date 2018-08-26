import React from 'react'
import * as Showdown from "showdown";
import Placeholder from "./Placeholder";
import Prism from "prismjs";

class Code extends React.Component {
    converter: Showdown.Converter

    constructor(props) {
        super(props)
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true,
        })
    }

    highlight(el) {
        Prism.highlightElement(el)
    }

    render() {
        const {content = '', mode, className} = this.props
        switch (mode) {
            case 'code':
                return <code ref={this.highlight}>
                    {content}
                </code>
            case 'rendered':
                return <div
                    className={className}
                    dangerouslySetInnerHTML={{__html: this.converter.makeHtml(content)}}
                >
                </div>
            default:
                return <Placeholder>
                    {content.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </Placeholder>
        }
    }
}

export default Code