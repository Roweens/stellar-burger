import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { StateSchema, useDispatch } from '../../services/store';
import { getOrderByNumber } from '../../services/order/selectors';
import { useParams } from 'react-router-dom';
import { fetchIngredients } from '../../services/ingredients/fetchIngredients';
import { fetchOrders } from '../../services/order/services';
import { getAllIngridients } from '../../services/ingredients/selectors';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = useSelector((state: StateSchema) =>
    getOrderByNumber(state, Number(number))
  );

  const ingredients: TIngredient[] = useSelector(getAllIngridients);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
    if (!orderData) {
      dispatch(fetchOrders());
    }
  }, [ingredients]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
