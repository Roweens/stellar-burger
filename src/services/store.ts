import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { SessionSchema } from './session/sessionSchema';
import { IngredientsSchema } from './ingredients/ingredientsSchema';
import { sessionReducer } from './session/sessionSlice';
import { ingredientsReducer } from './ingredients/ingredientsSlice';
import { burgerReducer } from './burger/burgerSlice';
import { BurgerSchema } from './burger/burgerSchema';
import { OrderSchema } from './order/orderSchema';
import { orderReducer } from './order/orderSlice';

export interface StateSchema {
  session: SessionSchema;
  ingredients: IngredientsSchema;
  burger: BurgerSchema;
  order: OrderSchema;
}

const rootReducer: ReducersMapObject<StateSchema> = {
  session: sessionReducer,
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<StateSchema> = selectorHook;

export default store;
