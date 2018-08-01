/*****
 * 后缀命名规范
 * Context -> 容器，封装了带有ref的容器Component
 * Component -> 渲染props.children的容器
 * Manager -> 管理器， 封装了带有ref非容器Component
 */

import React from 'react'
import NotificationSystem from "react-notification-system";
import {
    Modal,
    Segment,
    Sidebar,
    Menu,
    Item,
    Container,
    Header,
    Divider,
    Table,
    Label,
    Button,
    Sticky, Dropdown
} from 'semantic-ui-react'
import Icon from "./Icon";
import Main from "./Main";
import {Link, withRouter} from "react-router-dom";
import CartItem from "./CartItem";
import CartItemList from "./CartItemList";
import VisibleCartItems from "./VisibleCartItems";
import ExecuteButton from "./ExecuteButton";
import CartExecuteButton from "./CartExecuteButton";
import Placeholder from "./Placeholder";

const notifyRef = React.createRef()

// 向全局组件中添加此组件
export class NotificationManager extends React.Component {
    render() {
        return <NotificationSystem ref={notifyRef}/>
    }
}

// 其他js可以调用notify(notification)
export const notify = opt => notifyRef.current && notifyRef.current.addNotification(opt)

const shellRef = React.createRef()

export const openShell = () => shellRef.current && shellRef.current.start()
export const closeShell = () => shellRef.current && shellRef.current.close()
export const printShell = (line) => shellRef.current && shellRef.current.print(line)

class ShellOutput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {open: false, lines: []}
        this.messagesEnd = React.createRef()

    }

    start() {
        this.setState({open: true, lines: []})
    }

    close() {
        this.setState({open: false, lines: []})
    }

    print(line) {
        this.setState({open: true, lines: [...this.state.lines, line]})
    }

    componentDidUpdate() {
        if (this.state.open)
            this.messagesEnd.current.scrollIntoView({behavior: "smooth"})
    }

    render() {
        return <Modal open={this.state.open}
                      size="fullscreen"
                      closeOnEscape={true}
                      closeOnDimmerClick={true}
                      onClose={this.close.bind(this)}>
            <Modal.Header>执行输出</Modal.Header>
            <Modal.Content scrolling className="shell">
                {this.state.lines.map((line, i) => <p key={i}>{line}</p>)}
                <div
                    ref={this.messagesEnd}>
                </div>
            </Modal.Content>
        </Modal>
    }

}
//    "Content-Type": "text/plain; charset\u003dutf-8"
export class ShellManager extends React.Component {
    render() {
        return <ShellOutput ref={shellRef}/>
    }
}





const sidebarRef = React.createRef()
export const openSidebar = sidebar => sidebarRef.current && sidebarRef.current.open(sidebar)

class SidebarComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {visible: false, component: null}
    }

    open(component) {
        this.setState({visible: true, component})
    }

    close() {
        this.setState({visible: false})
    }

    toggle() {
        this.setState({visible: !this.state.visible})
    }
    render() {
        const {visible} = this.state
        return <Sidebar.Pushable as={Main}>
            <Sidebar
                as={Segment}
                animation='overlay'
                direction='right'
                onHide={this.close.bind(this)}
                visible={visible}
                width='very wide'
                duration={1000}
                className="side-bar"
            >
                {this.state.component}
            </Sidebar>

            <Sidebar.Pusher>
                {this.props.children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    }
}

export class SidebarContext extends React.Component {
    render() {
        return <SidebarComponent ref={sidebarRef}>
            {this.props.children}
        </SidebarComponent>
    }
}

