import { TIngredient } from '@utils-types';

export interface TIngredientWithUniqueId extends TIngredient {
  uniqueId: string;
}

type BurgerConstructor = {
  bun: TIngredient | null;
  ingredients: TIngredientWithUniqueId[];
};

export type BurgerSchema = {
  isLoading: boolean;
  burgerConstructor: BurgerConstructor;
};
