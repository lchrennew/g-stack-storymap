import {connect} from 'react-redux'
import Dir from "./Dir";
import {FilterString, jsonPath} from "../utils";

class IndexNode {
    constructor(name, specTags = [], scenarioTags = [], subs = []) {
        this.name = name
        this.subs = subs
        this.specTags = specTags
        this.scenarioTags = scenarioTags
    }

    static create(segs = [], specTags = [], scenarioTags = []) {
        let r = new IndexNode(segs.shift(), specTags, scenarioTags)
        let node = r
        while (segs.length) {
            node = node.add(new IndexNode(segs.shift(), specTags, scenarioTags))
        }
        return r
    }

    clone() {
        return new IndexNode(this.name, this.specTags, this.scenarioTags, this.subs.map(sub => sub.clone()))
    }

    // add sub
    add(node) {
        let n = this.get(node.name) // get sub
        if (n) {
            n.addScenarioTags(node.scenarioTags).addSpecTags(node.specTags)
            node.subs.map(sub => n.add(sub))
        }
        else
            this.subs.push(node)
        return node
    }

    addSpecTags(tags) {
        this.specTags = [...new Set([...this.specTags, ...tags])]
        return this
    }

    addScenarioTags(tags) {
        this.scenarioTags = [...new Set([...this.scenarioTags, ...tags])]
        return this
    }

    // get sub
    get(name) {
        return jsonPath(this.subs, `$[?(@.name=='${name}')]`)[0]
    }

    remove(name) {
        this.subs = [...this.subs.filter(sub => sub.name !== name)]
    }

    getKeys() {
        return jsonPath(this.subs, '$[*].name')
    }
}

const buildDirIndex = idx => {
    let dirIdx = new IndexNode('.')
    idx.map(f => {
        let segs = f.file.split(/[\\\/]/i).filter(seg => seg !== '' && seg !== '.')
        let node = IndexNode.create(segs, f.spec.tags, jsonPath(f.spec, '$.scenarios..tags.*'))
        dirIdx.add(node)
    })
    return dirIdx
}

const compress = (idxNode) => {
    let idx = idxNode.clone()
    // todo: compress idx
    let queue = idx.subs.map(n => ({key: n.name, node: idx}))
    while (queue.length > 0) {
        let item = queue.shift(),
            child = item.node.get(item.key)
        if (child) {
            let keys = child.getKeys()
            if (keys.length === 1) {
                let key = [item.key, keys[0]].join('/')
                queue.push({key, node: item.node})
                let x = child.get(keys[0])
                x.name = key
                item.node.add(x)
                item.node.remove(item.key)
            }
            else if (keys.length > 1) {
                queue.push(...keys.map(key => ({key, node: child})))
            }
        }
    }
    return idx
}

const seekIndex = (idx, dir) => {
    let dirIdx = buildDirIndex(idx)
    let segs = dir.split(/[\\\/]/i)
    let idxNode = dirIdx
    segs.map(seg => {
        if (seg) {
            idxNode = idxNode.get(seg)
            if (typeof idxNode === "undefined")
                throw `dir not exists ${dir}`
            else if (idxNode == null)
                throw `dir is actually a file ${dir}`
        }
    })
    return compress(idxNode);
}
const order0 = {folder: 0, file: 1}
const convertToItems = (dirObj) => {
    return dirObj.subs
        .map(sub => ({
            name: sub.name,
            specTags: sub.specTags.sort((a, b) => a > b ? 1 : -1),
            scenarioTags: sub.scenarioTags.sort((a, b) => a > b ? 1 : -1),
            tags: [...new Set([...sub.specTags, ...sub.scenarioTags])],
            itemtype: sub.subs.length ? 'folder' : 'file'
        }))
        .sort((a, b) => {
            if (order0[a.itemtype] != order0[b.itemtype])
                return order0[a.itemtype] - order0[b.itemtype]
            else
                return a.name > b.name ? 1 : -1
        })
}

// index <= state.index
// dir <= props.dir
const getVisibleItems = (index, dir) => {
    let idx = index.idx || []
    // idx: see json/idx.json
    let dirObj = seekIndex(idx, dir)
    return convertToItems(dirObj, idx, dir)
}

const mapStateToProps = (state, props) => {
    let {filter} = new FilterString(state.filters.filter),
        items = getVisibleItems(state.index, props.dir).filter(item => filter(item.tags))
    return {
        items,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dir)
