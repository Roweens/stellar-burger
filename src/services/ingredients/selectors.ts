import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../store';

export const getIngridients = (state: StateSchema) => state.ingredients.data;
export const getAllIngridients = (state: StateSchema) =>
  state.ingredients.ingredients;

export const getIngridientById = createSelector(
  getIngridients,
  (state: StateSchema, _id?: string) => _id,
  (ingredients, _id) =>
    Object.values(ingredients)
      .flat()
      .find((ingridient) => ingridient._id === _id)
);
