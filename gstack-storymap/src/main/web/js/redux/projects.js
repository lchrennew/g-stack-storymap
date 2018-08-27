import {api, cors, json} from "../utils/fetch";

export const projects = (state = {list: null}, action) => {
    switch (action.type) {
        case 'FETCH_PROJECTS':
            return {fetch: true}
        case 'RECEIVE_PROJECTS':
            return {fetch: false, list: action.list}
        case 'CREATING_PROJECT':
            return state
        case 'CREATED_PROJECT':
            return {fetch:false, list:[...state.list, action.project]}
        default:
            return state
    }
}


/*************************
 项目
 ***************************/
const fetchingProjects = () => ({
    type: 'FETCH_PROJECTS'
})

const fetchedProjects = list => ({
    type: 'RECEIVE_PROJECTS',
    list
})

const _fetchProjects = () => async dispatch => {
    dispatch(fetchingProjects())
    let response = await api(`projects`, cors('GET'))(dispatch)
    if (response.ok) {
        let list = await  response.json()
        return dispatch(fetchedProjects(list))
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
    let response = await api(`projects`, json(project, cors('POST')))(dispatch)
    if (response.ok) {
        const project = await response.json()
        return dispatch(createdProject(project))
    }
    return null
}

export const createProject = project => (dispatch, getState) => {
    let state = getState()
    return dispatch(_createProject(project))
}