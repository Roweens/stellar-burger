import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  isLoading: boolean;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  handleMove: (ingredientIndex: number, direction: 'up' | 'down') => void;
};
