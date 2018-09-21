import React from 'react'
import {Button, Divider, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react'
import {login} from "../../actions";
import {connect} from 'react-redux'
import Icon from "../common/Icon";

const mapStateToProps = (state, props) => {
    return {
        login: state.users.login,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        show: () => dispatch(login())
    }
}

const ref = React.createRef()


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {url: ''}
    }


    show(url) {
        const {show} = this.props
        show()
        this.setState({url})
    }

    goto(login) {
        const {url} = this.state
        location.href = `${url}${login}?return_uri=${encodeURIComponent(location.href)}`
    }

    render() {
        const {login, children} = this.props
        return login ? <div className='login-form' ref={ref}>
            <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
        margin:0;
      }
      body{
      margin: 60px 0 0 0;
      }
    `}</style>
            <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/img/logo.png'/> Log-in to your account
                    </Header>
                    <Segment stacked>
                        <Button size="massive" fluid primary onClick={() => this.goto('github')}>
                            <Icon name="github" size={32}/> Login from GitHub
                        </Button>
                        <Divider horizontal>OR</Divider>
                        <Button size="massive" fluid secondary onClick={() => this.goto('cas')}>
                            <Icon name="globe" size={32}/> Login from CAS SSO
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div> : children
    }
}


class _LoginContext extends React.Component {
    render() {
        const {show, login} = this.props

        return <LoginForm ref={ref} {...{show, login}}>
            {this.props.children}
        </LoginForm>
    }
}

export const LoginContext = connect(mapStateToProps, mapDispatchToProps)(_LoginContext)


export const showLogin = url => ref.current && ref.current.show(url)