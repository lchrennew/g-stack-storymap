import {jsonPath} from "./jsonpath";

export class CommentHelper {
    static get(list = [], id) {
        const result = jsonPath(list, `$..[?(@.id==${id})]`)
        if (result && result.length)
            return result[0]
        else return null
    }

    static path(list = [], id) {
        const result = jsonPath(list, `$..[?(@.id==${id})]`, {resultType: 'PATH'})
        if (result && result.length)
            return result[0]
        else return null
    }

    static reply(list = [], id, comment) {
        const target = this.get(list, id)
        if (!target.comments) target.comments = [comment]
        else target.comments.push(comment)
    }
}