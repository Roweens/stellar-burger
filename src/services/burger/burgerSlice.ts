import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    addBurgerConstructorItem: (state, action: PayloadAction<TIngredient>) => {
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
