import {api, cors} from "../utils/fetch";
import Cookies from "js-cookie";

export const users = (state = {me: null, fetch: false}, action) => {
    switch (action.type) {
        case 'FETCH_ME':
            return {fetch: true, me: null}
        case 'RECEIVE_ME':
            return {fetch: false, me: action.me}
        case 'SHOW_LOGIN':
            return {fetch: false, me: null, login: true}
        default:
            return state
    }
}



/****
 用户
 *********/

const fetchingMe = () => ({
    type: 'FETCH_ME',
})

const fetchedMe = (me) => ({
    type: 'RECEIVE_ME',
    me,
})

const _fetchMe = () => async dispatch => {
    dispatch(fetchingMe())
    let response = await api(`users/me`, cors('GET'))(dispatch)
    if (response.ok) {
        let me = await response.json()
        Cookies.set('XSRF-TOKEN', me.token)
        return dispatch(fetchedMe(me))
    }
    return null
}

const meNotFetching = state => !state.users.fetch

export const fetchMe = () => (dispatch, getState) => {
    let state = getState()
    if (meNotFetching(state)) {
        return dispatch(_fetchMe())
    }
    else return Promise.resolve()
}

export const login = () => (dispatch) => {
    dispatch({type: 'SHOW_LOGIN'})
}