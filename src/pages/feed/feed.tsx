import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { StateSchema, useDispatch } from '../../services/store';
import { fetchOrders } from '../../services/order/services';
import { useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/ingredients/fetchIngredients';
import { getOrders } from '../../services/order/selectors';

export const Feed: FC = () => {
  const orders = useSelector(getOrders);
  const isLoading = useSelector((state: StateSchema) => state.order.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetFeeds();
    dispatch(fetchIngredients());
  }, []);

  const handleGetFeeds = () => {
    dispatch(fetchOrders());
  };

  if (isLoading || !orders) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
