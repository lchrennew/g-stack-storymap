import {api, cors} from "../utils/fetch";

export const card = (state = {fetch: false, id: -1, card: null}, action) => {
    switch (action.type) {
        case 'FETCH_CARD':
            return {fetch: true, id: action.id, card: null}
        case 'RECEIVE_CARD':
            return {fetch: false, id: action.id, card: action.card}
        case 'UPDATED_CARD':
            return {fetch: false, id: action.id, card: action.card}
        case 'REQUEST_UPDATE_CARD_TITLE':
            if (action.id === state.id) {
                state.card.title = action.title
                return {fetch: false, id: action.id, card: Object.assign({}, state.card, action)}
            }
            else return state
        default:
            return state
    }
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
