/* JSONPath 0.8.0 - XPath for JSON
 *
 * Copyright (c) 2007 Stefan Goessner (goessner.net)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */
export const jsonPath = (obj, expr, arg) => {
    if (expr === '$') {
        if (arg && arg.resultType === 'PATH') {
            return ['$']
        } else return [obj]
    }
    var P = {
        resultType: arg && arg.resultType || "VALUE",
        result: [],
        normalize: function (expr) {
            var subx = [];
            return expr.replace(/[\['](\??\(.*?\))[\]']/g, function ($0, $1) {
                return "[#" + (subx.push($1) - 1) + "]";
            })
                .replace(/'?\.'?|\['?/g, ";")
                .replace(/;;;|;;/g, ";..;")
                .replace(/;$|'?\]|'$/g, "")
                .replace(/#([0-9]+)/g, function ($0, $1) {
                    return subx[$1];
                });
        },
        asPath: function (path) {
            var x = path.split(";"), p = "$";
            for (var i = 1, n = x.length; i < n; i++)
                p += /^[0-9*]+$/.test(x[i]) ? ("[" + x[i] + "]") : ("['" + x[i] + "']");
            return p;
        },
        store: function (p, v) {
            if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
            return !!p;
        },
        trace: function (expr, val, path) {
            if (expr) {
                var x = expr.split(";"), loc = x.shift();
                x = x.join(";");
                if (val && val.hasOwnProperty(loc))
                    P.trace(x, val[loc], path + ";" + loc);
                else if (loc === "*")
                    P.walk(loc, x, val, path, function (m, l, x, v, p) {
                        P.trace(m + ";" + x, v, p);
                    });
                else if (loc === "..") {
                    P.trace(x, val, path);
                    P.walk(loc, x, val, path, function (m, l, x, v, p) {
                        typeof v[m] === "object" && P.trace("..;" + x, v[m], p + ";" + m);
                    });
                }
                else if (/,/.test(loc)) { // [name1,name2,...]
                    for (var s = loc.split(/'?,'?/), i = 0, n = s.length; i < n; i++)
                        P.trace(s[i] + ";" + x, val, path);
                }
                else if (/^\(.*?\)$/.test(loc)) // [(expr)]
                    P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";") + 1)) + ";" + x, val, path);
                else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
                    P.walk(loc, x, val, path, function (m, l, x, v, p) {
                        if (P.eval(l.replace(/^\?\((.*?)\)$/, "$1"), v[m], m)) P.trace(m + ";" + x, v, p);
                    });
                else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                    P.slice(loc, x, val, path);
            }
            else
                P.store(path, val);
        },
        walk: function (loc, expr, val, path, f) {
            if (val instanceof Array) {
                for (var i = 0, n = val.length; i < n; i++)
                    if (i in val)
                        f(i, loc, expr, val, path);
            }
            else if (typeof val === "object") {
                for (var m in val)
                    if (val.hasOwnProperty(m))
                        f(m, loc, expr, val, path);
            }
        },
        slice: function (loc, expr, val, path) {
            if (val instanceof Array) {
                var len = val.length, start = 0, end = len, step = 1;
                loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function ($0, $1, $2, $3) {
                    start = parseInt($1 || start);
                    end = parseInt($2 || end);
                    step = parseInt($3 || step);
                });
                start = (start < 0) ? Math.max(0, start + len) : Math.min(len, start);
                end = (end < 0) ? Math.max(0, end + len) : Math.min(len, end);
                for (var i = start; i < end; i += step)
                    P.trace(i + ";" + expr, val, path);
            }
        },
        eval: function (x, _v, _vname) {
            try {
                return new Function('$$', '$', `return $ && $$ && ${x}`)(_v, $);
            }
            catch (e) {
                throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a"));
            }
        }
    };

    var $ = obj;
    if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
        P.trace(P.normalize(expr).replace(/^\$;/, ""), obj, "$");
        return P.result.length ? P.result : false;
    }
}

export class FilterString {
    static parse(str) {
        let stack = []
        let atomPattern = /[^|&()!\s]+/g,
            match = atomPattern.exec(str),
            atoms = {}
        while (match != null) {
            atoms[match.index] = {i: match.index, value: match[0]}
            match = atomPattern.exec(str)
        }

        let tree = {}, node = tree

        let not = false

        for (let i = 0; i < str.length; i++) {
            if (atoms[i]) {
                node.type = not ? 'not:atom' : 'atom'
                node.value = atoms[i].value
                i += atoms[i].value.length - 1
                //stack.push(node)
                not = false
            }
            else {
                switch (str[i]) {
                    case ' ':
                        break;
                    case '(':
                        node.type = not ? 'not:group' : 'group'
                        node.left = {}
                        stack.push(node)
                        not = false
                        node = node.left
                        break;
                    case '!':
                        not = !not
                        break;
                    case '&':
                        node.left = Object.assign({}, node)
                        node.type = 'and'
                        delete node.value
                        node.right = {}
                        node = node.right
                        break;
                    case '|':
                        node.left = Object.assign({}, node)
                        node.type = 'or'
                        delete node.value
                        node.right = {}
                        node = node.right
                        break;
                    case ')':
                        node = stack.pop()
                        break;
                    default:
                        break;
                }
            }
        }

        return stack.length || not ? null : tree
    }

    static compile(tree) {
        if (!tree) return () => true
        let stack = [tree]
        let queue = [tree]
        while (queue.length) {
            let node = queue.shift()
            stack.push(node)
            if (node.left)
                queue.push(node.left)
            if (node.right)
                queue.push(node.right)
        }

        while (stack.length) {
            let node = stack.pop()
            switch (node.type) {
                case 'atom':
                    node.filter = (tags = []) => tags.indexOf(node.value) >= 0
                    break;
                case 'not:atom':
                    node.filter = (tags = []) => tags.indexOf(node.value) < 0
                    break;
                case 'and':
                    node.filter = (tags = []) => node.left.filter(tags) && node.right.filter(tags)
                    break;
                case 'or':
                    node.filter = (tags = []) => node.left.filter(tags) || node.right.filter(tags)
                    break;
                case 'group':
                    node.filter = node.left.filter
                    break
                case 'not:group':
                    node.filter = (tags = []) => !node.left.filter(tags)
                    break
                default:
                    node.filter = () => true
                    break
            }
        }

        return tree.filter
    }

    constructor(tagString) {
        this.filter = FilterString.compile(FilterString.parse('' + tagString))
    }
}

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