import {api, cors} from "../utils/fetch";

export const release = (state = {fetch: false, id: -1, release: null}, action) => {
    switch (action.type) {
        case 'FETCH_RELEASE':
            return {fetch: true, id: action.id, release: null}
        case 'RECEIVE_RELEASE':
            return {fetch: false, id: action.id, release: action.release}
        case 'UPDATED_RELEASE':
            return {fetch: false, id: action.id, release: action.release}
        case 'CREATED_RELEASE':
            return {fetch: false, id: action.release.id, release: action.release}
        case 'DELETED_RELEASE':
            return {fetch: false, id: -1, release: null}
        default:
            return state
    }
}
/***版本详情***/

const fetchingRelease = (id) => ({
    type: 'FETCH_RELEASE',
    id,
})

const fetchedRelease = (release) => ({
    type: 'RECEIVE_RELEASE',
    release
})

const _fetchRelease = (id) => async dispatch => {
    dispatch(fetchingRelease(id))
    let response = await api(`releases/${id}`, cors('GET'))(dispatch)
    if (response.ok) {
        let release = await  response.json()
        return dispatch(fetchedRelease(release))
    }
    return null
}

const releaseNotFetching = state => !state.release.fetch
const releaseIsNotTheSame = (id, state) => state.release.id !== id
export const fetchRelease = (id) => (dispatch, getState) => {
    let state = getState()
    if (releaseNotFetching(state) || releaseIsNotTheSame(id, state)) {
        return dispatch(_fetchRelease(id))
    }
    else return Promise.resolve()
}
