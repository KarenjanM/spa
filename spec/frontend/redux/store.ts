import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cart.slice';
import authReducer from './auth.slice';

const reducer = {
  cart: cartReducer,
  auth: authReducer,
};

export const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch