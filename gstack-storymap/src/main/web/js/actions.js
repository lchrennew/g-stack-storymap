import fetch from 'cross-fetch'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'
import {CardHelper} from "./utils";

const webApi = 'localhost:8085'
const api = (endpoint, ...args) => async (dispatch) => await fetch(`//${webApi}/${endpoint}`, ...args)

const json = (body, opt) => Object.assign({}, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
}, opt)

const text = (body, opt) => Object.assign({}, {
    method: 'POST',
    headers: {"Content-Type": "html/text"},
    body,
}, opt)
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
    let response = await api(`projects`, {credentials: 'include'})(dispatch)
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
    let response = await api(`projects`, json(project, {credentials: 'include'}))(dispatch)
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
    let response = await api(`projects/${project}/cards`, {credentials: 'include'})(dispatch)
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
    let response = await api(`projects/${project}/releases`, {credentials: 'include'})(dispatch)
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
        json({id:target.id, direction, release}, {credentials: 'include'})
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
    let response = await api(`cards/${id}/detail`, json(detail, {credentials: 'include'}))(dispatch)
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
    let response = await api(`cards/${id}/plan/${release}`, json(plan, {credentials: 'include'}))(dispatch)
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
    let response = await api(`cards/${id}/next`, json(next, {credentials: 'include'}))(dispatch)
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
    let response = await api(`cards/root/${id}`, json(root, {credentials: 'include'}))(dispatch)
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
    let response = await api(`cards/${id}`, {credentials: 'include', method: 'DELETE'})(dispatch)
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
            {
                method: 'PUT',
                credentials: 'include'
            }
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