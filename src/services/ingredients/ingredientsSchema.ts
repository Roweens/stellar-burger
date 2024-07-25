import { TIngredient, TIngredientType } from '@utils-types';

export type IngridientGroup = 'buns' | 'sauces' | 'mains';

export const mapIngridientTypeToGroup: Record<
  IngridientGroup,
  TIngredientType
> = {
  buns: 'bun',
  mains: 'main',
  sauces: 'sauce'
};

export type IngredientsSchema = {
  isLoading: boolean;
  ingredients: TIngredient[];
  error?: string;
  data: Record<keyof typeof mapIngridientTypeToGroup, TIngredient[]>;
};
