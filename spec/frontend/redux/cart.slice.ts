import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../generated/graphql";

interface cartInterface {
    items: [{
        product: Product,
        quantity: number
    }]
}

const initialState = {items: [] as unknown} as cartInterface

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            if(state.items.length > 0){
            const itemExists = state.items.find(({product}) => product?.id === action.payload.id)
            if (itemExists){
                itemExists.quantity++;
            } else{
                state.items.push({...action.payload, quantity: 1});
            }
        }
        else{
            state.items.push({...action.payload, quantity: 1});
        }
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            console.log(action.payload);
            const item = state.items.find(({product}) => product.id === action.payload);
            item.quantity++;
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find(({product}) => product.id === action.payload);
            item.quantity--;
            if (item.quantity === 0){
                const index = state.items.findIndex(({product}) => product.id === action.payload)
                state.items.splice(index, 1)
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {

            const index = state.items.findIndex(({product}) => product.id === action.payload);
            state.items.splice(index, 1);
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