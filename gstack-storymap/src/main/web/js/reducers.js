import {combineReducers} from 'redux'

import {projects} from './redux/projects'
import {cards} from './redux/cards'
import {releases} from './redux/releases'
import {dragging} from './redux/dragging'
import {card} from './redux/card'
import {release} from   './redux/release'
import {users} from './redux/users'
import {comments} from './redux/comments'
import {criteria} from "./redux/criteria";

export default combineReducers({
    projects,
    cards,
    releases,
    dragging,
    card,
    release,
    users,
    comments,
    criteria,
})