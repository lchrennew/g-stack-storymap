import {combineReducers} from 'redux'
import $ from 'jquery'
import {jsonPath} from "./utils";

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

class CardHelper {
    static path(list = [], id) {
        const result = jsonPath(list, `$..[?(@.id==${id})]`, {resultType: 'PATH'})
        if (result && result.length)
            return result[0]
        else return null
    }

    static detach(list = [], path = '') {
        const parent = jsonPath(list, path.substr(0, path.lastIndexOf('[')))[0],
            card = jsonPath(list, path)[0]
        parent.splice(parent.indexOf(card), 1)
        return card
    }

    static after(list = [], path, card) {
        const parent = jsonPath(list, path.substr(0, path.lastIndexOf('[')))[0],
            before = jsonPath(list, path)[0]
        parent.splice(parent.indexOf(before) + 1, 0, card)
    }

    static root(list = [], card) {
        list.splice(0, 0, card)
    }

    static detail(list = [], path, card) {
        const general = jsonPath(list, path)[0]
        if (general.details) {
            general.details.splice(0, 0, card)
        }
        else general.details = [card]
    }

    static plan(list = [], path, release, card) {
        const general = jsonPath(list, path)[0]
        general.plans = general.plans || {}
        general.plans[release] = general.plans[release] || []
        general.plans[release].splice(0, 0, card)
    }
}

const cards = (state = {list: null}, action) => {
    switch (action.type) {
        case 'FETCH_CARDS':
            return {fetch: true, project: action.project}
        case 'RECEIVE_CARDS':
            return {fetch: false, list: action.list, project: action.project}
        case 'MOVE_CARD':
            let {option: {card, direction, target, after, release}} = action
            if (card && target) {
                let list = $.extend(true, [], state.list)
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
                    case 'Release':
                        CardHelper.plan(list, CardHelper.path(list, target.id), release, card)
                        break;
                    default:
                        return state
                }
                return {fetch: false, list, project: state.project}
            }
        default:
            return state
    }
}

const releases = (state = {list: null}, action) => {
    switch (action.type) {
        case 'FETCH_RELEASES':
            return {fetch: true}
        case 'RECEIVE_RELEASES':
            return {fetch: false, list: action.list,}
        default:
            return state
    }
}

export default combineReducers({projects, cards, releases})