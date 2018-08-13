// 页尾

import React from 'react'
import Icon from "./Icon";

class Footer extends React.Component {
    render() {
        return <footer className="footer">
            <div className="container">
                <span className="text-muted"><Icon name="chrome"/> Support Chrome only!</span>
            </div>
        </footer>

    }
}

export default Footer