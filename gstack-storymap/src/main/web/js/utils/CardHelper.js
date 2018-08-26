import {jsonPath} from "./jsonpath";

export class CardHelper {

    static dragging(list = [], dragging) {
        const
            p_id = this.path(list, dragging.id),
            _id = this.depth(p_id),
            _ = dragging
        return {p_id, _id, _}
    }

    static accept(list = [], dragging, to) {
        const {p_id, _id, _} = dragging

        const
            p_to = to < 0 ? '$' : this.path(list, to),
            _to = to < 0 ? 0 : this.depth(p_to) + 1

        if (p_to.startsWith(p_id)) return false
        else if (_id === _to) return true
        else if (_id === 0) {
            if (_to === 1)
                return !(
                    _.details && _.details.length
                    && _.details.find(
                        x =>
                            (x.details && x.details.length)
                            || (x.plans && Object.values(x.plans).find(p => p && p.length))
                    )
                )
            // return !jsonPath(list, `$..[?(@.id==${id})].details..details..id`)
            //     && !jsonPath(list, `$..[?(@.id==${id})]..plans..id`)
            else if (_to === 2) {
                return !(_.details && _.details.length)
            }
            // return !jsonPath(list, `$..[?(@.id==${id})].details..id`)
            else return false
        }
        else if (_id === 1) {
            if (_to === 0)
                return !(_.plans && Object.values(_.plans).find(p => p && p.length))
            // return !jsonPath(list, `$..[?(@.id==${id})]..plans..id`)
            else if (_to === 2)
                return !(_.details && _.details.length)
            // return !jsonPath(list, `$..[?(@.id==${id})].details..id`)
            else
                return false
        } else if (_id === 2) {
            return _to <= 2
        }
        else return false
    }

    static depth(path) {
        const tokens = path.match(/'(?:details|plans)'/g)
        return tokens ? tokens.length : 0
    }

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

    static get(list = [], id) {
        const result = jsonPath(list, `$..[?(@.id==${id})]`)
        if (result && result.length)
            return result[0]
        else return null
    }
}