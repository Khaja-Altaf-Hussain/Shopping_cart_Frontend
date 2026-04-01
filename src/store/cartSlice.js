import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:JSON.parse(localStorage.getItem("cartItems"))||[]
}
const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem:(state,action)=>{
            const newItem=action.payload
            const existingItemIndex=state.items.findIndex(item=>item.product._id===newItem._id)
            if (existingItemIndex>-1){
                state.items[existingItemIndex].quantity+=1
            }else{
                state.items.push({product:newItem,quantity:1})
            }
            localStorage.setItem("cartItems",JSON.stringify(state.items))
        },
        removeItem:(state,action)=>{
            const productIdItemToRemove=action.payload
            state.items=state.items.filter(item=>item.product._id!==productIdItemToRemove)
            localStorage.setItem("cartItems",JSON.stringify(state.items))
        },
        updateItem:(state,action)=>{
            const {productId,quantity}=action.payload
            const itemIndex=state.items.findIndex(item=>item.product._id===productId)
            if (itemIndex>-1) {
                if (quantity<=0) {
                    state.items.splice(itemIndex,1)
                }else {
                    state.items[itemIndex].quantity=quantity
                }
            } 
            localStorage.setItem("cartItems",JSON.stringify(state.items))

        },
        clearCart:(state,action)=>{
            state.items=[]
        }
    }
})
export const {addItem,removeItem,updateItem,clearCart}=cartSlice.actions
export const selectCartItems=(state)=>state.cart.items
export const selectCartTotalItems=(state)=> state.cart.items.reduce((total,item)=>total+item.quantity,0)
export const selectCartTotalPrice=(state)=> state.cart.items.reduce((total,item)=> total+item.product.price*item.quantity,0)
export default cartSlice.reducer