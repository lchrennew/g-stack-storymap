import fetch from 'cross-fetch'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'
import {CardHelper} from "./utils";
import Cookies from 'js-cookie'
import $ from 'jquery'

const webApi = `${location.hostname}:8085`
const api = (endpoint, ...args) => async (dispatch) => {
    let response = await fetch(`//${webApi}/${endpoint}`, ...args)
    if (response.status === 403) {
        location.href = `//${webApi}/login/github?return_uri=${encodeURIComponent(location.href)}`
        return response
    }
    return response
}

const cors = (method = 'GET') => ({
    headers: {"X-XSRF-TOKEN": Cookies.get('XSRF-TOKEN')},
    credentials: 'include',
    method
})

const json = (body, opt) => $.extend(true, {}, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(body),
}, opt)

const text = (body, opt) => $.extend(true, {}, {
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

/***卡片详情***/

const fetchingCard = (id) => ({
    type: 'FETCH_CARD',
    id,
})

const fetchedCard = (card) => ({
    type: 'RECEIVE_CARD',
    card
})

const _fetchCard = (id) => async dispatch => {
    dispatch(fetchingCard(id))
    let response = await api(`cards/${id}`, cors('GET'))(dispatch)
    if (response.ok) {
        let card = await  response.json()
        return dispatch(fetchedCard(card))
    }
    return null
}

const cardNotFetching = state => !state.card.fetch
const cardIsNotTheSame = (id, state) => state.card.id !== id
export const fetchCard = (id) => (dispatch, getState) => {
    let state = getState()
    if (cardNotFetching(state) || cardIsNotTheSame(id, state)) {
        return dispatch(_fetchCard(id))
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

/*************************
 评论
 ***************************/
const fetchingComments = (id) => ({
    type: 'FETCH_COMMENTS',
    id,
})

const fetchedComments = (id, list) => ({
    type: 'RECEIVE_COMMENTS',
    id, list
})

const _fetchComments = (id) => async dispatch => {
    dispatch(fetchingComments(id))
    let response = await api(`comments/target/${id}`, cors('GET'))(dispatch)
    if (response.ok) {
        let list = await response.json()
        return dispatch(fetchedComments(id, list))
    }
    return null
}

const commentsNotFetching = state => !state.comments.fetch

export const fetchComments = (id) => (dispatch, getState) => {
    let state = getState()
    if (commentsNotFetching(state)) {
        return dispatch(_fetchComments(id))
    }
    else return Promise.resolve()
}

//----------添加评论-----------
const addingComment = (id, comment) => ({
    type: 'ADDING_COMMENT',
    id,
    comment
})

const addedComment = (id, comment) => ({
    type: 'ADDED_COMMENT',
    id,
    comment
})

const _addComment = (id, comment) => async dispatch => {
    dispatch(addingComment(id, comment))
    let response = await api(`comments/target/${id}`, json(comment, cors('POST')))(dispatch)
    if (response.ok) {
        comment = await response.json()
        return dispatch(addedComment(id, comment))
    }
    return null
}

export const addComment = (id, comment) => (dispatch, getState) => {
    let state = getState()
    return dispatch(_addComment(id, comment))
}

//----------添加评论回复-----------
const addingReply = (id, reply) => ({
    type: 'ADDING_REPLY',
    id,
    reply
})

const addedReply = (id, reply) => ({
    type: 'ADDED_REPLY',
    id,
    reply
})

const _addReply = (id, reply) => async dispatch => {
    dispatch(addingReply(id, reply))
    let response = await api(`comments/target/${id}`, json(reply, cors('POST')))(dispatch)
    if (response.ok) {
        reply = await response.json()
        return dispatch(addedReply(id, reply))
    }
    return null
}

export const addReply = (id, reply) => (dispatch, getState) => {
    let state = getState()
    return dispatch(_addReply(id, reply))
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
