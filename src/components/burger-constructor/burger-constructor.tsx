import { FC, useCallback, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { createOrder } from '../../services/order/services';
import { orderActions } from '../../services/order/orderSlice';
import { burgerActions } from '../../services/burger/burgerSlice';
import { useNavigate } from 'react-router-dom';
import {
  getOrderError,
  getOrderIsLoading,
  getOrderModalData
} from '../../services/order/selectors';
import { getConstructorItems } from '../../services/burger/selectors';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorItems);
  const orderError = useSelector(getOrderError);
  const orderIsLoading = useSelector(getOrderIsLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedItem = constructorItems.ingredients[dragIndex];

      const newArray = constructorItems.ingredients.filter(
        (item) => item._id !== draggedItem._id
      );

      newArray.splice(hoverIndex, 0, draggedItem);

      dispatch(burgerActions.setConstructorIngredients(newArray));
    },
    [dispatch, constructorItems]
  );

  const handleMove = (ingredientIndex: number, direction: 'up' | 'down') => {
    const movedItem = constructorItems.ingredients[ingredientIndex];

    const newArray = constructorItems.ingredients.filter(
      (item) => item._id !== movedItem._id
    );

    if (direction === 'up') {
      newArray.splice(ingredientIndex - 1, 0, movedItem);
    } else {
      newArray.splice(ingredientIndex + 1, 0, movedItem);
    }

    dispatch(burgerActions.setConstructorIngredients(newArray));
  };

  const orderRequest = false;

  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ingridientIds = constructorItems.ingredients.reduce<string[]>(
      (acc, item) => [...acc, item._id],
      []
    );
    const ids = [constructorItems.bun._id, ...ingridientIds];
    dispatch(createOrder(ids)).then(() => {
      if (orderError) navigate('/login');
    });
  };

  const closeOrderModal = () => {
    dispatch(orderActions.removeOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      moveRow={moveRow}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      isLoading={orderIsLoading}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      handleMove={handleMove}
    />
  );
};
