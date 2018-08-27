import $ from "jquery";
import {api, cors, json} from "../utils/fetch";

export const releases = (state = {list: null}, action) => {
    let list = $.extend(true, [], state.list)
    switch (action.type) {
        case 'FETCH_RELEASES':
            return {fetch: true}
        case 'RECEIVE_RELEASES':
            return {fetch: false, list: action.list,}
        case 'UPDATED_RELEASE':
            Object.assign(list.find(r=>r.id===action.id), action.release)
            return {fetch: false, list}
        case 'CREATED_RELEASE':
            list.push(action.release)
            return {fetch: false, list}
        case 'DELETED_RELEASE':
            list.splice(list.findIndex(r => r.id === action.id), 1)
            return {fetch: false, list}
        case 'MOVING_RELEASE':
            let i = list.findIndex(r => r.id === action.id), r = list[i]
            switch (action.direction) {
                case 'Previous':
                    if (i > 0) {
                        list.splice(i, 1)
                        list.splice(i - 1, 0, r)
                        break
                    }
                    else return state
                case 'Next':
                    if (i < list.length) {
                        list.splice(i, 1)
                        list.splice(i + 1, 0, r)
                        break
                    }
                    else return state
                default:
                    return state
            }
            return {fetch: false, list}
        default:
            return state
    }
}



/****
 版本
 *********/

const fetchingReleases = (project) => ({
    type: 'FETCH_RELEASES',
    project,
})

const fetchedReleases = (project, list) => ({
    type: 'RECEIVE_RELEASES',
    project,
    list,
})

const _fetchReleases = (project) => async dispatch => {
    dispatch(fetchingReleases(project))
    let response = await api(`projects/${project}/releases`, cors('GET'))(dispatch)
    if (response.ok) {
        let list = await  response.json()
        return dispatch(fetchedReleases(project, list))
    }
    return null
}

const releasesNotFetching = state => !state.releases.fetch

export const fetchReleases = (project) => (dispatch, getState) => {
    let state = getState()
    if (releasesNotFetching(state)) {
        return dispatch(_fetchReleases(project))
    }
    else return Promise.resolve()
}


/***保存版本详情***/


const updatingRelease = (id, release) => ({
    type: 'UPDATING_RELEASE',
    id, release
})

const updatedRelease = (id, release) => ({
    type: 'UPDATED_RELEASE',
    id, release
})

const _updateRelease = (id, release) => async dispatch => {
    dispatch(updatingRelease(id, release))
    let response = await api(`releases/${id}`, json(release, cors('PUT')))(dispatch)
    if (response.ok) {
        release = await response.json()
        return dispatch(updatedRelease(id, release))
    }
    return null
}
export const updateRelease = (id, release) => (dispatch, getState) => {
    let state = getState()
    return dispatch(_updateRelease(id, release))
}

/**************DELETE RELEASE*************/
const deletingRelease = id => {
    return {
        type: 'DELETING_RELEASE',
        id
    }
}

const deletedRelease = (id) => {
    return {
        type: 'DELETED_RELEASE',
        id,
    }
}

const _delRelease = id => async dispatch => {
    dispatch(deletingRelease(id))
    let response = await api(`releases/${id}`, cors('DELETE'))(dispatch)
    if (response.ok) {
        let result = await response.json()
        if (result)
            dispatch(deletedRelease(id))
        return result
    }
    return null
}


export const delRelease = id => (dispatch, getState) => {
    let state = getState()
    return dispatch(_delRelease(id))
}


/**************CREATE RELEASE*************/
const creatingRelease = () => {
    return {
        type: 'CREATING_RELEASE'
    }
}

const createdRelease = release => {
    return {
        type: 'CREATED_RELEASE',
        release,
    }
}

const _createRelease = (project, release) => async dispatch => {
    dispatch(creatingRelease())
    let response = await api(`releases/project/${project}`, json(release, cors('POST')))(dispatch)
    if (response.ok) {
        release = await response.json()
        dispatch(createdRelease(release))
        return release
    }
    return null
}


export const createRelease = release => (dispatch, getState) => {
    let state = getState()
    let project = state.cards.project
    return dispatch(_createRelease(project, release))
}

/**************MOVE RELEASE*************/
const movingRelease = (id, direction) => {
    return {
        type: 'MOVING_RELEASE',
        id, direction,
    }
}

const movedRelease = (id, direction) => {
    return {
        type: 'MOVED_RELEASE',
        id, direction
    }
}

const _moveRelease = (id, direction) => async dispatch => {
    dispatch(movingRelease(id, direction))
    let response = await api(`releases/${id}/move`, json({direction}, cors('POST')))(dispatch)
    if (response.ok) {
        return dispatch(movedRelease(id, direction))
    }
    return null
}


export const moveRelease = (id, direction) => (dispatch, getState) => {
    let state = getState()
    return dispatch(_moveRelease(id, direction))
}
