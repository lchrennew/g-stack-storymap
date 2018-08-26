import $ from "jquery";
import {api, cors, json} from "../utils/fetch";
import {CommentHelper} from "../utils/CommentHelper";

export const comments = (state = {list: null, fetch: false}, action) => {
    let list = $.extend(true, [], state.list)
    switch (action.type) {
        case 'FETCH_COMMENTS':
            return {fetch: true, list: null, target: action.id}
        case 'RECEIVE_COMMENTS':
            return {fetch: false, list: action.list, target: action.id}
        case 'ADDING_COMMENT':
            return state
        case 'ADDED_COMMENT':
            return {fetch: false, list: [...list, action.comment], target: action.id}
        case 'ADDING_REPLY':
            return state
        case 'ADDED_REPLY':
            CommentHelper.reply(list, action.id, action.reply)
            return {fetch: false, list, target: action.id}
        default:
            return state
    }
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