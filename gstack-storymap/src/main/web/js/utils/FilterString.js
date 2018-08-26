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
