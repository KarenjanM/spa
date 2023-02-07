import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {

            const itemExists = state.find((item) => item.id === action.payload.id)
            if (itemExists){
                itemExists.quantity++;
            } else{
                state.push({...action.payload, quantity: 1});
            }
        },
        incrementQuantity: (state, action: PayloadAction) => {
            console.log(action.payload);
            const item = state.find((item) => item.id === action.payload);
            item.quantity++;
        },
        decrementQuantity: (state, action: PayloadAction) => {
            const item = state.find((item) => item.id === action.payload);
            item.quantity--;
            if (item.quantity === 0){
                const index = state.findIndex((item) => item.id === action.payload)
                state.splice(index, 1)
            }
        },
        removeFromCart: (state, action: PayloadAction) => {

            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1);
        }
    }
})

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;