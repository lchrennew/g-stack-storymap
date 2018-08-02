import fetch from 'cross-fetch'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

const webApi = 'localhost:8085'
const api = (endpoint, ...args) => async (dispatch) => await fetch(`//${webApi}/${endpoint}`, ...args)

const json = (body, opt) => Object.assign({}, opt, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
})
/*************************
 项目
 ***************************/
const requestProjects = () => ({
    type: 'FETCH_PROJECTS'
})

const receiveProjects = list => ({
    type: 'RECEIVE_PROJECTS',
    list
})

const _fetchProjects = () => async dispatch => {
    dispatch(requestProjects())
    let response = await api(`projects`, {credentials: 'include'})(dispatch)
    if (response.ok) {
        let list = await  response.json()
        return dispatch(receiveProjects(list))
    }
    return null
}

const projectsNotFetching = state => !state.projects.fetch

export const fetchProjects = () => (dispatch, getState) => {
    let state = getState()
    if (projectsNotFetching(state)) {
        return dispatch(_fetchProjects())
    }
    else return Promise.resolve()
}

/*************************
 新建项目
 ***************************/
const creatingProject = project => ({type: 'CREATING_PROJECT', project})
const createdProject = project => ({type: 'CREATED_PROJECT', project})
const _createProject = (project) => async dispatch => {
    dispatch(creatingProject(project))
    let response = await api(`projects`, json(project, {credentials: 'include'}))(dispatch)
    if (response.ok) {
        let project = await  response.json()
        return dispatch(createdProject(project))
    }
    return null
}

export const createProject = project => (dispatch, getState) => {
    let state = getState()
    return dispatch(_createProject(project))
}

