import { TIngredient } from '@utils-types';

type BurgerConstructor = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

export type BurgerSchema = {
  isLoading: boolean;
  burgerConstructor: BurgerConstructor;
};
