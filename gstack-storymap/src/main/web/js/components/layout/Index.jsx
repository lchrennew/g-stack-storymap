import React from 'react'
import {Route, Switch} from "react-router-dom";
import Project from "../projects/Project";
import Header from './Header'
import Footer from "./Footer";
import ProjectsProvider from "../providers/ProjectsProvider";
import Main from "./Main";
import Placeholder from "../common/Placeholder";
import {SidebarContext} from "../sidebars/Sidebar";
import Projects from "../projects/Projects";
import AuthProvider from "../providers/AuthProvider";
import {LoginContext} from "./Login";



class Index extends React.Component {
    componentWillMount() {
        //this.props.router.replace('/t')
    }

    /*
    * 路由：
    * 首页测试包列表    /
    * 测试包首页   /project/:project
    * 目录页       /project/:project/:dir
    * */
    render() {
        return <Placeholder>
            <LoginContext>
                <AuthProvider>
                    <Header/>
                    <Main>
                        <SidebarContext>
                            <ProjectsProvider>
                                <Switch>
                                    <Route path="/:project" component={Project}/>
                                    <Route path="/" component={Projects}/>
                                </Switch>
                            </ProjectsProvider>
                        </SidebarContext>
                    </Main>
                    <Footer/>
                </AuthProvider>
            </LoginContext>
        </Placeholder>
    }
}

export default Index