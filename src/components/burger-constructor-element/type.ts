import { TConstructorIngredient } from '@utils-types';

export type BurgerConstructorElementProps = {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  handleMove: (ingredientIndex: number, direction: 'up' | 'down') => void;
};
