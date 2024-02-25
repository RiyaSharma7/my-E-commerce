
import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice({
name:"cart",
initialState:{
    cartItems:[],
    cartTotalQuantity:0,
    cartTotalAmount:0,
    name:"",
   quantity:1,
   cartTotalAmount:0
},
reducers:{
    addToCart:(state,action)=>{
    console.log("Action",action)
        const itemIndex=state.cartItems.findIndex((item)=>item._id===action.payload.res._id)
        if(itemIndex<0){
            const tempproduct={...action.payload.res,cartQuantity:state.quantity,amount:action.payload.res.price}
        state.cartItems.push(tempproduct);
        
        }else{
         state.cartItems[itemIndex].cartQuantity+=1;
         
        }
      state.cartTotalQuantity+=1;
},
updateCart:(state,action)=>{
  
    const itemIndex=state.cartItems.findIndex((item)=>item._id===action.payload._id)
    state.cartItems[itemIndex].cartQuantity+=1;
    
},
removeCart:(state,action)=>{
    const itemIndex=state.cartItems.findIndex((item)=>item._id===action.payload._id)
    if( state.cartItems[itemIndex].cartQuantity){
    state.cartItems[itemIndex].cartQuantity-=1;   
}
},
Nquantity:(state,action)=>{
if(action.payload==="remove" && state.quantity){
    state.quantity-=1;
}else if(action.payload==="add"){
    state.quantity+=1;
}
},
removeFromCart:(state,action)=>{
    const itemIndex=state.cartItems.findIndex((item)=>item._id===action.payload._id)
    state.cartItems.splice(itemIndex,1)

},
getTotal:(state,action)=>{
 let {total}=state.cartItems.reduce(
    (cartTotal,cartItem)=>{
        const{ amount,cartQuantity}=cartItem
        const itemTotal=amount * cartQuantity;
        
        cartTotal.total+=itemTotal;
        
        return cartTotal
    },{
        total:0,
    }
 )
 state.cartTotalAmount=total;
}
}
})

export const {
  addToCart,
  updateCart,
  removeCart,
  Nquantity,
  removeFromCart,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;