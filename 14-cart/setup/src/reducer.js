const reducer = (state,action)=>{
    if(action.type === 'CLEAR_CART'){
        return {...state,cart: []}
    }
    if(action.type === 'REMOVE'){
        const newCart = state.cart.filter((item)=> item.id !== action.payload)
        return{...state, cart:newCart}
    }
    if(action.type === 'INCREASE'){
        let newCart = state.cart.map((item) =>{
            if(item.id === action.payload){
                const newAmount = item.amount +1;
                return {...item, amount: newAmount}
            }
            return item
        })
        return{...state, cart:newCart}
    }
    if(action.type === 'DECREASE'){
        let newCart = state.cart.map((item) =>{
            if(item.id === action.payload){
                const newAmount = item.amount - 1;
                return {...item, amount: newAmount}
            }
            return item
        }).filter((item)=> item.amount !==0)
        return{...state, cart:newCart}
    }
    if(action.type === 'GET_TOTALS'){
        let {total,amount} = state.cart.reduce((cartTotal, cartItem)=>{
            const {price, amount} = cartItem
            cartTotal.amount += amount
            cartTotal.total += price*amount;
            return cartTotal
        },{
            total: 0, amount: 0
        })
        total = parseFloat(total.toFixed(2))
        return{...state, total,amount}
    }
    if(action.type ==='LOADING'){
        return {...state, loading:true}
    }
    if(action.type ==='DISPLAY_ITEMS'){
        return {...state, cart: action.payload, loading: false }
    }
    return state
}

export default reducer