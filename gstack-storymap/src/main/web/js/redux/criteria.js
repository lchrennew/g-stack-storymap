import $ from "jquery";
import {api, cors, json} from "../utils/fetch";

export const criteria = (state = {list: null, fetch: false}, action) => {
    let list = $.extend(true, [], state.list)
    switch (action.type) {
        case 'FETCH_CRITERIA':
            return {fetch: true, list: null, id: action.id}
        case 'RECEIVE_CRITERIA':
            return {fetch: false, list: action.list, id: action.id}
        case 'ADDING_CRITERION':
            return state
        case 'ADDED_CRITERION':
            return {fetch: false, list: [...list, action.criterion], id: action.id}
        case 'UPDATING_CRITERION':
            return state
        case 'UPDATED_CRITERION':
            list.splice(list.findIndex(x => x.id === action.id), 1, action.criterion)
            return {fetch: false, list, id: state.id}
        default:
            return state
    }
}

//--------------CRITERIA
const fetchingCriteria = (id) => ({
    type: 'FETCH_CRITERIA',
    id,
})

const fetchedCriteria = (id, list) => ({
    type: 'RECEIVE_CRITERIA',
    id, list
})

const _fetchCriteria = (id) => async dispatch => {
    dispatch(fetchingCriteria(id))
    let response = await api(`criteria/of/card/${id}`, cors('GET'))(dispatch)
    if (response.ok) {
        let list = await response.json()
        return dispatch(fetchedCriteria(id, list))
    }
    return null
}

const criteriaNotFetching = state => !state.criteria.fetch

export const fetchCriteria = (id) => (dispatch, getState) => {
    let state = getState()
    if (criteriaNotFetching(state)) {
        return dispatch(_fetchCriteria(id))
    }
    else return Promise.resolve()
}

const addingCriterion = (id, criterion) => ({
    type: 'ADDING_CRITERION',
    id,
    criterion
})

const addedCriterion = (id, criterion) => ({
    type: 'ADDED_CRITERION',
    id,
    criterion
})

const _addCriterion = (id, criterion) => async dispatch => {
    dispatch(addingCriterion(id, criterion))
    let response = await api(`criteria/of/card/${id}`, json(criterion, cors('POST')))(dispatch)
    if (response.ok) {
        criterion = await response.json()
        return dispatch(addedCriterion(id, criterion))
    }
    return null
}

export const addCriterion = (id, criterion) => (dispatch, getState) => {
    let state = getState()
    return dispatch(_addCriterion(id, criterion))
}


const updatingCriterion = (id, criterion) => ({
    type: 'UPDATING_CRITERION',
    id,
    criterion
})

const updatedCriterion = (id, criterion) => ({
    type: 'UPDATED_CRITERION',
    id,
    criterion
})

const _updateCriterion = (id, criterion) => async dispatch => {
    dispatch(updatingCriterion(id, criterion))
    let response = await api(`criteria/${id}`, json(criterion, cors('PUT')))(dispatch)
    if (response.ok) {
        criterion = await response.json()
        return dispatch(updatedCriterion(id, criterion))
    }
    return null
}

export const updateCriterion = (id, criterion) => (dispatch, getState) => {
    let state = getState()
    return dispatch(_updateCriterion(id, criterion))
}
