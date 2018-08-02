import {combineReducers} from 'redux'

const projects = (state = {list: null}, action) => {
    switch (action.type) {
        case 'FETCH_PROJECTS':
            return {fetch: true}
        case 'RECEIVE_PROJECTS':
            return {fetch: false, list: action.list}
        case 'CREATING_PROJECT':
            return {fetch:false, list:[...state.list, action.suite]}
        case 'CREATED_PROJECT':
            return state
        default:
            return state
    }
}

export default combineReducers({projects})