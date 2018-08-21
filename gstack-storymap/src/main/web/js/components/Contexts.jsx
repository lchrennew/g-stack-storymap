/*****
 * 后缀命名规范
 * Context -> 容器，封装了带有ref的容器Component
 * Component -> 渲染props.children的容器
 * Manager -> 管理器， 封装了带有ref非容器Component
 */

import React from 'react'
import NotificationSystem from "react-notification-system";
import Icon from "./Icon";
import {withRouter} from "react-router-dom";
import Placeholder from "./Placeholder";
import SidebarRouter from "./SidebarRouter";

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
export const openSidebar = (path) => sidebarRef.current && sidebarRef.current.open(path)
const toggleSidebarSize = () => sidebarRef.current && sidebarRef.current.toggleSize()

class SidebarComponent extends React.Component {
    constructor(props) {
        super(props)
        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this)
        this.domRef = React.createRef()
    }

    getMaximizedWithoutMatch() {
        const {location: {pathname}} = this.props
        const paths = pathname.split('/')
        if (paths.indexOf('!!') >= 0) return '!!'
        else if (paths.indexOf('!') >= 0) return '!'
        else return false
    }

    open(path) {
        const {history, location} = this.props
        const maximized = this.getMaximizedWithoutMatch() || '!'
        path = [
            this.visible()
                ? location.pathname.substr(0, location.pathname.indexOf(maximized) - 1)
                : location.pathname,
            maximized,
            path
        ].join('/')
        history.push(path)
    }

    toggleSize() {
        const {
            history,
            location: {pathname}
        } = this.props
        const maximized = this.getMaximizedWithoutMatch()

        let paths = pathname.split('/'),
            tokenIndex = paths.indexOf(maximized)
        if (tokenIndex >= 0) {
            paths.splice(tokenIndex, 1, maximized === '!!' ? '!' : '!!')
            history.push(
                paths.join('/')
            )
        }
    }

    visible() {
        const maximized = this.getMaximizedWithoutMatch()
        return !!maximized
    }

    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }

    onClickOutsideHandler(event) {
        if (this.visible()
            && !this.domRef.current.contains(event.target)
            && document.contains(event.target)) {
            const {history, location: {pathname}} = this.props
            const maximized = this.getMaximizedWithoutMatch()
            history.push(pathname.substr(0, pathname.indexOf(maximized) - 1))
        }
    }
    render() {
        const {
            className = '',
        } = this.props
        const maximized = this.getMaximizedWithoutMatch() === '!!'
        const visible = this.visible()

        return <div ref={this.domRef}
                    className={`ui sidebar container fluid vertical right${visible ? ' visible' : ''}${maximized ? ' maximized' : ' very wide'} ${className}`}>
            <SidebarRouter/>
        </div>
    }
}

class _SidebarMaximizeButton extends React.Component {

    onClick(e) {
        e.preventDefault()
        toggleSidebarSize()
    }

    render() {
        const {match: {params: {maximized}}} = this.props
        return <a href="#" onClick={this.onClick.bind(this)}>
            {
                maximized
                    ? <Icon name="minimize-2"/>
                    : <Icon name="maximize-2"/>
            }
        </a>
    }
}

export const SidebarMaximizeButton = withRouter(_SidebarMaximizeButton)

class _SidebarContext extends React.Component {
    render() {
        return <Placeholder>
            <div className="body">
                {this.props.children}
            </div>
            <SidebarComponent
                ref={sidebarRef}
                {...this.props}/>
        </Placeholder>
    }
}

export const SidebarContext = withRouter(_SidebarContext)