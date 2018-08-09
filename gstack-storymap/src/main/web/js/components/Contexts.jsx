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

const sidebarRef = React.createRef()
export const openSidebar = sidebar => sidebarRef.current && sidebarRef.current.open(sidebar)

class SidebarComponent extends React.Component {
    constructor(props) {
        super(props)
        const {visible = false} = props
        this.state = {visible, component: null}
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
        const {
            className = '',
        } = this.props


        return <div
            className={`ui sidebar menu vertical very wide right${visible ? ' visible' : ''} ${className}`}>
            {this.state.component || this.props.children}
        </div>
    }
}

export class SidebarContext extends React.Component {
    render() {
        return <SidebarComponent ref={sidebarRef} {...this.props}>
            {this.props.children}
        </SidebarComponent>
    }
}

