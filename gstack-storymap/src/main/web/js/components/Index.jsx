import React from 'react'
import {Route, Switch} from "react-router-dom";
import Suite from "./Suite";
import Header from './Header'
import Footer from "./Footer";
import Suites from "./Suites";
import SuitesProvider from "./SuitesProvider";
import Main from "./Main";
import Placeholder from "./Placeholder";
import {SidebarContext} from "./Contexts";



class Index extends React.Component {
    componentWillMount() {
        //this.props.router.replace('/t')
    }

    /*
    * 路由：
    * 首页测试包列表    /
    * 测试包首页   /suite/:suite
    * 目录页       /suite/:suite/:dir
    * */
    render() {
        return <Placeholder>
            <Header/>
            <Main>
                <SidebarContext>
                    <SuitesProvider>
                        <Switch>
                            <Route path="/:suite" component={Suite}/>
                            <Route path="/" component={Suites}/>
                        </Switch>
                    </SuitesProvider>
                </SidebarContext>
            </Main>
            <Footer/>
        </Placeholder>
    }
}

export default Index