import {combineReducers} from 'redux'
import $ from 'jquery'
import {CardHelper} from "./utils";


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



const cards = (state = {list: null}, action) => {
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
            return {fetch: false, list, projects: state.project}
        case 'REQUEST_NEXT':
            return state
        case 'RECEIVE_NEXT':
            CardHelper.after(list, CardHelper.path(list, action.id), action.next)
            return {fetch: false, list, projects: state.project}
        case 'RECEIVE_ROOT':
            CardHelper.root(list, action.root)
            return {fetch: false, list, projects: state.project}
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

const dragging = (state = {dragging: false}, action) => {
    switch (action.type) {
        case 'START_DRAG_CARD':
            return {card: action.card}
        case 'END_DRAG_CARD':
            return {card: false}
        default:
            return state
    }
}

export default combineReducers({projects, cards, releases, dragging})