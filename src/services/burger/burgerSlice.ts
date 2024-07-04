import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';
import { BurgerSchema } from './burgerSchema';
import { TIngredient } from '@utils-types';

const initialState: BurgerSchema = {
  burgerConstructor: {
    bun: null,
    ingredients: []
  },
  isLoading: false
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,

  reducers: {
    addBurgerConstructorItem: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        const type = action.payload.type;

        if (type === 'bun') {
          state.burgerConstructor.bun = action.payload;
        } else {
          state.burgerConstructor.ingredients = [
            action.payload,
            ...state.burgerConstructor.ingredients
          ];
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, uniqueId: uuid4() }
      })
    },
    setConstructorIngredients: (
      state,
      action: PayloadAction<TIngredient[]>
    ) => {
      state.burgerConstructor.ingredients = action.payload;
    },
    removeIngridient: (state, action: PayloadAction<string>) => {
      state.burgerConstructor.ingredients =
        state.burgerConstructor.ingredients.filter(
          (ingridient) => ingridient._id !== action.payload
        );
    }
  }
});

export const { actions: burgerActions } = burgerSlice;
export const { reducer: burgerReducer } = burgerSlice;
