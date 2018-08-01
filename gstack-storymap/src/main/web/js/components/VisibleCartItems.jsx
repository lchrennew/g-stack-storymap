import {connect} from 'react-redux'
import CartItemList from "./CartItemList";

const mapStateToProps = (state, props) => {
    const {suite} = props
    return {
        items: state.cart[suite] ? state.cart[suite].list : []
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItemList)