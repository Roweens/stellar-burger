import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IngredientsSchema,
  IngridientGroup,
  mapIngridientTypeToGroup
} from './ingredientsSchema';
import { fetchIngredients } from './fetchIngredients';
import { TIngredient } from '@utils-types';

const initialState: IngredientsSchema = {
  data: {
    buns: [],
    mains: [],
    sauces: []
  },
  isLoading: false,
  ingredients: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        state.data = {
          buns: [],
          mains: [],
          sauces: []
        };
        action.payload.forEach((ingridient) => {
          const type = ingridient.type;

          const ingridientGroup = Object.entries(mapIngridientTypeToGroup).find(
            ([key, value]) => value === type
          );

          if (ingridientGroup) {
            state.data[ingridientGroup[0] as IngridientGroup].push(ingridient);
          }
        });
      }
    );
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIngredients.rejected, (state) => {
      state.isLoading = false;
      state.error = 'fetchIngredients error';
    });
  }
});

export const { actions: ingredientsActions } = ingredientsSlice;
export const { reducer: ingredientsReducer } = ingredientsSlice;
