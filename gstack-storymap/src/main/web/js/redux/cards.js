import $ from "jquery";
import {api, cors, json} from "../utils/fetch";
import {CardHelper} from "../utils/CardHelper";

export const cards = (state = {list: null}, action) => {
    let list = $.extend(true, [], state.list)

    switch (action.type) {
        case 'FETCH_CARDS':
            return {fetch: true, project: action.project}
        case 'RECEIVE_CARDS':
            return {fetch: false, list: action.list, project: action.project}
        case 'RECEIVE_DETAIL':
            CardHelper.detail(list, CardHelper.path(list, action.id), action.detail)
            return {fetch: false, list, project: state.project}
        case 'RECEIVE_PLAN':
            CardHelper.plan(list, CardHelper.path(list, action.id), action.release, action.plan)
            return {fetch: false, list, project: state.project}
        case 'REQUEST_NEXT':
            return state
        case 'RECEIVE_NEXT':
            CardHelper.after(list, CardHelper.path(list, action.id), action.next)
            return {fetch: false, list, project: state.project}
        case 'RECEIVE_ROOT':
            CardHelper.root(list, action.root)
            return {fetch: false, list, project: state.project}
        case 'MOVE_CARD':
            let {option: {card, direction, target, release}} = action
            if (card && target) {
                //let list = [...state.list]
                // detach card
                card = CardHelper.detach(list, CardHelper.path(list, card.id))
                switch (direction) {
                    case 'Next':
                        CardHelper.after(list, CardHelper.path(list, target.id), card)
                        break
                    case 'Root':
                        CardHelper.root(list, card)
                        break
                    case 'Detail':
                        CardHelper.detail(list, CardHelper.path(list, target.id), card)
                        break
                    case 'Plan':
                        CardHelper.plan(list, CardHelper.path(list, target.id), release, card)
                        break;
                    default:
                        return state
                }
                return {fetch: false, list, project: state.project}
            } else return state
        case 'REQUEST_UPDATE_CARD_TITLE':
            CardHelper.get(list, action.id).title = action.title
            return {fetch: false, list, project: state.project}

        case 'REQUEST_DEL_CARD':
            CardHelper.detach(list,  CardHelper.path(list,  action.id))
            return {fetch: false, list, project: state.project}

        case 'UPDATED_CARD':
            Object.assign(CardHelper.get(list, action.id), action.card)
            return {fetch: false, list, project: state.project}
        default:
            return state
    }
}


/*************************
 获取卡片
 *************************/

const fetchingCards = (project) => ({
    type: 'FETCH_CARDS',
    project,
})

const fetchedCards = (project, list) => ({
    type: 'RECEIVE_CARDS',
    project,
    list,
})

const _fetchCards = (project) => async dispatch => {
    dispatch(fetchingCards(project))
    let response = await api(`projects/${project}/cards`, cors('GET'))(dispatch)
    if (response.ok) {
        let list = await  response.json()
        return dispatch(fetchedCards(project, list))
    }
    return null
}

const cardsNotFetching = state => !state.cards.fetch

export const fetchCards = (project) => (dispatch, getState) => {
    let state = getState()
    if (cardsNotFetching(state)) {
        return dispatch(_fetchCards(project))
    }
    else return Promise.resolve()
}



/****
 卡片移动
 */
const moveCard = (option) => {
    return {
        type: 'MOVE_CARD',
        option
    }
}

const _startDragCard = card => {
    return {
        type: 'START_DRAG_CARD',
        card,
    }
}

const _endDragCard = () => {
    return {
        type: 'END_DRAG_CARD'
    }
}

export const moveUpdateCard = (option) => (dispatch, getState) => {
    return dispatch(moveCard(option))
}


export const saveCardMovement = option => async dispatch => {
    const {direction, card, target, release} = option
    api(`cards/${card.id}/move`,
        json({id: target.id, direction, release}, cors('POST'))
    )(dispatch)
    return dispatch(moveCard(option))
}

export const startDragCard = (card) => (dispatch, getState) => {
    return dispatch(_startDragCard(card))
}


export const endDragCard = (card) => (dispatch, getState) => {
    return dispatch(_endDragCard())
}

/************DETAIL*************/
const detailing = (id, detail) => {
    return {
        type: 'REQUEST_DETAIL',
        id, detail
    }
}

const detailed = (id, detail) => {
    return {
        type: 'RECEIVE_DETAIL',
        id, detail
    }
}

const _setDetail = (id, detail) => async dispatch => {
    dispatch(detailing(id, detail))
    let response = await api(`cards/${id}/detail`, json(detail, cors('POST')))(dispatch)
    if (response.ok) {
        detail = await response.json()
        return dispatch(detailed(id, detail))
    }
    return null
}

export const setDetail = (id, detail) => (dispatch, getState) => {
    let state = getState()
    return dispatch(_setDetail(id, detail))
}

/**************RELEASE***************/

const planning = (id, release, plan) => {
    return {
        type: 'REQUEST_PLAN',
        id, release, plan
    }
}

const planned = (id, release, plan) => {
    return {
        type: 'RECEIVE_PLAN',
        id, release, plan
    }
}

const _setPlan = (id, release, plan) => async dispatch => {
    dispatch(planning(id, release, plan))
    let response = await api(`cards/${id}/plan/${release}`, json(plan, cors('POST')))(dispatch)
    if (response.ok) {
        plan = await response.json()
        return dispatch(planned(id, release, plan))
    }
    return null
}

export const setPlan = (id, release, detail) => (dispatch, getState) => {
    let state = getState()
    return dispatch(_setPlan(id, release, detail))
}


/*************NEXT**********/

const nexting = (id, next) => {
    return {
        type: 'REQUEST_NEXT',
        id, next
    }
}

const nexted = (id, next) => {
    return {
        type: 'RECEIVE_NEXT',
        id, next
    }
}

const _setNext = (id, next) => async dispatch => {
    dispatch(nexting(id, next))
    let response = await api(`cards/${id}/next`, json(next, cors('POST')))(dispatch)
    if (response.ok) {
        next = await response.json()
        return dispatch(nexted(id, next))
    }
    return null
}

export const setNext = (id, next) => (dispatch, getState) => {
    let state = getState()
    return dispatch(_setNext(id, next))
}

/**********ROOT************/
const rooting = (id, root) => {
    return {
        type: 'REQUEST_ROOT',
        id, root
    }
}

const rooted = (id, root) => {
    return {
        type: 'RECEIVE_ROOT',
        id, root
    }
}

const _setRoot = (id, root) => async dispatch => {
    dispatch(rooting(id, root))
    let response = await api(`cards/root/${id}`, json(root, cors('POST')))(dispatch)
    if (response.ok) {
        root = await response.json()
        return dispatch(rooted(id, root))
    }
    return null
}


export const setRoot = (id, root) => (dispatch, getState) => {
    let state = getState()
    if (state.cards.list && state.cards.list.length)
        return Promise.resolve()
    else
        return dispatch(_setRoot(id, root))
}

/**************DELETE CARD*************/
const deletingCard = id => {
    return {
        type: 'REQUEST_DEL_CARD',
        id
    }
}

const deletedCard = id => {
    return {
        type: 'RECEIVE_DEL_CARD',
        id
    }
}

const _delCard = id => async dispatch => {
    dispatch(deletingCard(id))
    let response = await api(`cards/${id}`, cors('DELETE'))(dispatch)
    if (response.ok) {
        //await response.json()
        return dispatch(deletedCard(id))
    }
    return null
}


export const delCard = id => (dispatch, getState) => {
    let state = getState()
    return dispatch(_delCard(id))
}


/***********CARD TITLE*********/
const updatingCardTitle = (id, title) => {
    return {
        type: "REQUEST_UPDATE_CARD_TITLE",
        id, title
    }
}

const updatedCardTitle = (id, title) => {
    return {
        type: "RECEIVE_UPDATE_CARD_TITLE",
        id, title
    }
}

const _updateCardTitle = (id, title) => async dispatch => {
    dispatch(updatingCardTitle(id, title))
    let response = await api(
        `cards/${id}/title`,
        json(
            {id, title},
            cors('PUT')
        ))(dispatch)
    if (response.ok)
        return dispatch(updatedCardTitle(id, title))
    else
        return null
}

export const updateCardTitle = (id, title) => (dispatch, getState) => {
    const {cards: {list}} = getState()
    if (CardHelper.get(list, id).title != title) {
        return dispatch(_updateCardTitle(id, title))
    }
    else return Promise.resolve()
}


/***保存卡片详情***/


const updatingCard = (id, card) => ({
    type: 'UPDATING_CARD',
    id, card
})

const updatedCard = (id, card) => ({
    type: 'UPDATED_CARD',
    id, card
})

const _updateCard = (id, card) => async dispatch => {
    dispatch(updatingCard(id, card))
    let response = await api(`cards/${id}`, json(card, cors('PUT')))(dispatch)
    if (response.ok) {
        card = await response.json()
        return dispatch(updatedCard(id, card))
    }
    return null
}

export const updateCard = (id, card) => (dispatch, getState) => {
    let state = getState()
    return dispatch(_updateCard(id, card))
}
